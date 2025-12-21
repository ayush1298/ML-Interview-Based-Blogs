---
layout: default
title: AI / ML Interview Questions
---

<div id="list"></div>

<script>
fetch("{{ '/catalog.json' | relative_url }}")
  .then(r => {
    if (!r.ok) throw new Error("Failed to load catalog.json");
    return r.json();
  })
  .then(catalog => {
    const ul = document.getElementById("list");

    if (!catalog.categories) {
      ul.innerHTML = "<li>No articles found</li>";
      return;
    }

    // Iterate categories → articles
    Object.values(catalog.categories).forEach(category => {
      // Category heading
      const h2 = document.createElement("h2");
      h2.textContent = category.name;
      ul.appendChild(h2);

      const subUl = document.createElement("ul");

      category.articles.forEach(article => {
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="view.html?file=${encodeURIComponent(article.path)}">
            ${article.title}
          </a>
        `;
        subUl.appendChild(li);
      });

      ul.appendChild(subUl);
    });
  })
  .catch(err => {
    document.getElementById("list").innerHTML =
      `<li style="color:red">Error loading catalog: ${err}</li>`;
  });
</script>
