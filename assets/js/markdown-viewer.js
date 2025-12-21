(() => {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");
  const content = document.getElementById("content");

  if (!file) {
    content.innerHTML = "<h2>No file specified</h2>";
    return;
  }

  // ✅ Correct base URL for GitHub Pages project sites
  const baseUrl =
    window.location.origin +
    window.location.pathname.replace(/\/view\.html$/, "");

  const mdUrl = `${baseUrl}/${decodeURIComponent(file)}`;

  fetch(mdUrl)
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load markdown: ${r.status}`);
      return r.text();
    })
    .then(md => {
      const mdDir = mdUrl.substring(0, mdUrl.lastIndexOf("/"));

      // Fix relative image paths
      const fixed = md.replace(
        /!\[(.*?)\]\((?!https?:\/\/|\/\/)(.*?)\)/g,
        (_, alt, src) => `![${alt}](${mdDir}/${src})`
      );

      content.innerHTML = marked.parse(fixed);
    })
    .catch(err => {
      content.innerHTML = `<h2>Error loading document</h2><pre>${err}</pre>`;
    });
})();
