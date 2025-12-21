let allArticles = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('categoryGrid');
  const filterChips = document.getElementById('filterChips');
  const statArticles = document.getElementById('statArticles');
  const statCategories = document.getElementById('statCategories');
  const resultCount = document.getElementById('resultCount');
  const searchInput = document.getElementById('searchInput');

  // Use the injected baseurl
  const baseurl = window.SITE_BASEURL || '';
  
  // Try multiple possible paths
  const possiblePaths = [
    `${baseurl}/catalog.json`,
    '/ML-Interview-Based-Blogs/catalog.json',
    'catalog.json'
  ];

  let catalog = null;
  let lastError = null;

  for (const catalogUrl of possiblePaths) {
    try {
      console.log('Trying to fetch catalog from:', catalogUrl);
      const res = await fetch(catalogUrl, { 
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (res.ok) {
        catalog = await res.json();
        console.log('Successfully loaded catalog from:', catalogUrl);
        break;
      } else {
        console.warn(`Failed to load from ${catalogUrl}: ${res.status}`);
        lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (err) {
      console.warn(`Error loading from ${catalogUrl}:`, err);
      lastError = err;
    }
  }

  if (!catalog) {
    console.error('Failed to load catalog from all paths. Last error:', lastError);
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Could not load catalog</h3>
        <p>The catalog.json file hasn't been generated yet.</p>
        <p style="color: var(--muted); font-size: 0.9rem; margin-top: 1rem;">
          Error: ${lastError?.message || 'Unknown error'}<br><br>
          This happens when:<br>
          • The GitHub Actions workflow hasn't run yet<br>
          • You're viewing the site locally without running the catalog generation script<br><br>
          <strong>To fix:</strong> Run <code>python scripts/generate_catalog.py</code> locally,<br>
          or push to GitHub to trigger the workflow.
        </p>
      </div>
    `;
    return;
  }

  try {
    const categories = Object.values(catalog.categories || {});
    
    if (categories.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>No categories found</h3>
          <p>The catalog is empty. Please check your content structure.</p>
        </div>
      `;
      return;
    }

    statCategories.textContent = categories.length || '0';

    // Flatten all articles with category info
    allArticles = categories.flatMap(cat => 
      (cat.articles || []).map(article => ({
        ...article,
        category: cat.name
      }))
    );
    
    statArticles.textContent = allArticles.length || '0';

    // Create filter chips
    const allChip = filterChips.querySelector('[data-category="all"]');
    categories.forEach(cat => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.dataset.category = cat.name;
      chip.textContent = `${cat.name} (${cat.articles?.length || 0})`;
      chip.onclick = () => filterByCategory(cat.name);
      filterChips.appendChild(chip);
    });

    // Render initial view
    renderCategories(categories);

    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length === 0) {
          renderCategories(categories);
        } else {
          searchArticles(query, categories);
        }
      });
    }

  } catch (err) {
    console.error('Error processing catalog:', err);
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Error processing catalog</h3>
        <p>There was an error parsing the catalog data.</p>
        <p style="color: var(--muted); font-size: 0.9rem; margin-top: 1rem;">Error: ${err.message}</p>
      </div>
    `;
  }
});

// Rest of the functions remain the same...
function filterByCategory(category) {
  currentFilter = category;
  
  const baseurl = window.SITE_BASEURL || '';
  
  // Update active chip
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.remove('active');
    if (chip.dataset.category === category) {
      chip.classList.add('active');
    }
  });

  // Re-render based on filter
  fetch(`${baseurl}/catalog.json`)
    .then(r => r.json())
    .then(catalog => {
      const categories = Object.values(catalog.categories || {});
      
      if (category === 'all') {
        renderCategories(categories);
      } else {
        const filtered = categories.filter(cat => cat.name === category);
        renderCategories(filtered);
      }
    });
}

function renderCategories(categories) {
  const grid = document.getElementById('categoryGrid');
  const resultCount = document.getElementById('resultCount');
  const baseurl = window.SITE_BASEURL || '';
  
  if (!categories || categories.length === 0) {
    grid.innerHTML = '<div class="empty-state"><h3>No articles found</h3><p>Try adjusting your filter.</p></div>';
    resultCount.textContent = '0 articles found';
    return;
  }

  const totalArticles = categories.reduce((sum, cat) => sum + (cat.articles?.length || 0), 0);
  resultCount.textContent = `${totalArticles} article${totalArticles === 1 ? '' : 's'} found`;

  grid.innerHTML = categories.map(cat => {
    const articles = cat.articles || [];
    const articleCount = articles.length;

    const articlesList = articles.slice(0, 5).map(article => `
      <div class="article-item">
        <a href="${baseurl}/view.html?file=${encodeURIComponent(article.path)}">
          ${article.title}
        </a>
        <div class="article-item__meta">
          <span class="date">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            ${article.modified?.slice(0, 10) || '—'}
          </span>
          ${article.subcategory ? `<span class="subcategory">${article.subcategory}</span>` : ''}
        </div>
      </div>
    `).join('');

    const showMoreLink = articleCount > 5 ? 
      `<div class="article-item" style="text-align: center; border: none; padding-top: 1rem;">
        <a href="#" onclick="expandCategory('${cat.name}'); return false;" style="color: var(--primary); font-weight: 600;">
          + Show ${articleCount - 5} more articles
        </a>
      </div>` : '';

    return `
      <div class="category-block" data-category="${cat.name}">
        <div class="category-block__header">
          <h3>${cat.name}</h3>
          <div class="category-block__count">
            <svg class="icon" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0 3a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0 3a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0 3a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11z"/>
            </svg>
            ${articleCount} article${articleCount === 1 ? '' : 's'}
          </div>
        </div>
        <div class="category-block__articles">
          ${articlesList}
          ${showMoreLink}
        </div>
      </div>
    `;
  }).join('');
}

function searchArticles(query, categories) {
  const filtered = categories.map(cat => ({
    ...cat,
    articles: (cat.articles || []).filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.path.toLowerCase().includes(query) ||
      (article.subcategory && article.subcategory.toLowerCase().includes(query))
    )
  })).filter(cat => cat.articles.length > 0);

  renderCategories(filtered);
}

function expandCategory(categoryName) {
  alert(`Feature coming soon: View all articles in ${categoryName}`);
}

function handleSearch() {
  const query = document.getElementById('searchInput').value;
  if (query) {
    document.getElementById('searchInput').dispatchEvent(new Event('input'));
  }
}