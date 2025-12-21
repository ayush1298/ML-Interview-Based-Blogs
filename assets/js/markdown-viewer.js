(function () {
  const titleEl = document.getElementById("articleTitle");
  const pathEl = document.getElementById("articlePath");
  const contentEl = document.getElementById("articleContent");

  const params = new URLSearchParams(window.location.search);
  const mdPath = params.get("path");

  function fail(msg) {
    titleEl.textContent = "Not found";
    contentEl.innerHTML = `<p>${msg}</p>`;
  }

  if (!mdPath || mdPath.includes("..") || !mdPath.toLowerCase().endsWith(".md")) {
    return fail("Invalid article path.");
  }

  const baseurl = (window.SITE_BASEURL || "").replace(/\/$/, "");
  const mdUrl = `${baseurl}/${mdPath}`.replace(/\/\/+/g, "/");

  const dir = mdPath.split("/").slice(0, -1).join("/");
  const dirBase = `${window.location.origin}${baseurl}/${dir}/`.replace(/\/\/+/g, "/");

  pathEl.textContent = mdPath;

  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: true,
    mangle: false,
  });

  fetch(mdUrl, { cache: "no-cache" })
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.text();
    })
    .then((md) => {
      const html = marked.parse(md);

      const clean = DOMPurify.sanitize(html, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["src", "height", "width", "frameborder", "allowfullscreen", "title"],
      });

      contentEl.innerHTML = clean;

      const h1 = contentEl.querySelector("h1");
      titleEl.textContent = h1
        ? h1.textContent.trim()
        : (mdPath.split("/").pop() || "Article").replace(/\.md$/i, "");

      // Fix relative links/images inside markdown so they work from /view.html
      for (const a of contentEl.querySelectorAll("a[href]")) {
        const href = a.getAttribute("href");
        if (!href) continue;
        if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) continue;
        a.setAttribute("href", new URL(href, dirBase).toString());
      }

      for (const img of contentEl.querySelectorAll("img[src]")) {
        const src = img.getAttribute("src");
        if (!src) continue;
        if (/^(https?:|data:|\/)/i.test(src)) continue;
        img.setAttribute("src", new URL(src, dirBase).toString());
      }
    })
    .catch(() => fail("Could not load this Markdown file."));
})();