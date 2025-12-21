document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('categoryGrid');
  const latest = document.getElementById('latestList');
  const statArticles = document.getElementById('statArticles');
  const statCategories = document.getElementById('statCategories');

  try {
    const res = await fetch('{{ "/catalog.json" | relative_url }}', { cache: 'no-cache' });
    const catalog = await res.json();

    const categories = Object.values(catalog.categories || {});
    statCategories.textContent = categories.length || '0';

    const allArticles = categories.flatMap(c => c.articles || []);
    statArticles.textContent = allArticles.length || '0';

    grid.innerHTML = categories.map(cat => {
      const count = (cat.articles || []).length;
      return `
        <div class="category-card">
          <h3><a href="{{ site.baseurl }}/${encodeURIComponent(cat.name)}/">${cat.name}</a></h3>
          <p>${count} article${count === 1 ? '' : 's'}</p>
          <div class="category-meta">Updated: ${cat.articles?.[0]?.modified?.slice(0,10) || '—'}</div>
        </div>
      `;
    }).join('');

    const latestArticles = [...allArticles].sort((a,b) => b.modified.localeCompare(a.modified)).slice(0, 8);
    latest.innerHTML = latestArticles.map(a => `
      <li>
        <a href="{{ site.baseurl }}/view.html?path=${encodeURIComponent(a.path)}">${a.title}</a>
        <small>${a.modified.slice(0,10)} · ${a.path}</small>
      </li>
    `).join('');

  } catch (err) {
    console.error('Catalog load failed', err);
    grid.innerHTML = '<p>Could not load catalog.</p>';
  }
});