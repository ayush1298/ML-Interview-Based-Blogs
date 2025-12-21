---
layout: default
title: AI / ML Interview Questions
---

<ul id="list"></ul>

<script>
fetch("{{ '/catalog.json' | relative_url }}")
  .then(r => {
    if (!r.ok) throw new Error("Failed to load catalog.json");
    return r.json();
  })
  .then(data => {
    const ul = document.getElementById("list");

    if (!data.length) {
      ul.innerHTML = "<li>No articles found</li>";
      return;
    }

    data.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML =
        `<a href="view.html?file=${encodeURIComponent(item.path)}">${item.title}</a>`;
      ul.appendChild(li);
    });
  })
  .catch(err => {
    document.getElementById("list").innerHTML =
      `<li style="color:red">Error: ${err}</li>`;
  });
</script>
