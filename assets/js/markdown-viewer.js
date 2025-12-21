(() => {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");
  const content = document.getElementById("content");

  if (!file) {
    content.innerHTML = "<h2>No file specified</h2>";
    return;
  }

  const baseUrl =
    window.location.origin +
    document.querySelector("script[src*='markdown-viewer']").src
      .split("/assets/")[0];

  const mdUrl = `${baseUrl}/${decodeURIComponent(file)}`;

  fetch(mdUrl)
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load markdown`);
      return r.text();
    })
    .then(md => {
      const mdDir = mdUrl.substring(0, mdUrl.lastIndexOf("/"));

      const fixed = md.replace(
        /!\[(.*?)\]\((?!https?:\/\/|\/\/)(.*?)\)/g,
        (_, alt, src) => `![${alt}](${mdDir}/${src})`
      );

      content.innerHTML = marked.parse(fixed);
    })
    .catch(err => {
      content.innerHTML = `<h2>Error</h2><pre>${err}</pre>`;
    });
})();
