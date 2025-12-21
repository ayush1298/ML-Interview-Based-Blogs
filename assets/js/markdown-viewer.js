(() => {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  const contentEl = document.getElementById("content");
  if (!file) {
    contentEl.innerHTML = "<h2>No file specified</h2>";
    return;
  }

  // Base path = site root + repo path (works on GitHub Pages project sites)
  const viewerPath = window.location.pathname.replace(/\/view\.html.*/, "");
  const basePath = `${window.location.origin}${viewerPath}`;
  const mdUrl = `${basePath}/${decodeURIComponent(file)}`;

  fetch(mdUrl)
    .then(res => {
      if (!res.ok) throw new Error(`Markdown fetch failed: ${res.status}`);
      return res.text();
    })
    .then(md => {
      const mdDir = mdUrl.substring(0, mdUrl.lastIndexOf("/"));
      const fixedMd = md.replace(
        /!\[(.*?)\]\((?!https?:\/\/|\/\/)(.*?)\)/g,
        (_, alt, src) => `![${alt}](${mdDir}/${src})`
      );
      contentEl.innerHTML = marked.parse(fixedMd);
    })
    .catch(err => {
      contentEl.innerHTML = `<h2>Error loading document</h2><pre>${err}</pre>`;
    });
})();