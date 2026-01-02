/**
 * ML Interview Hub - Main JavaScript
 * Handles catalog loading, filtering, and search
 */

let allArticles = [];
let allCategories = [];
let selectedFilters = new Set(); // Track multiple selected categories

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('categoryGrid');
  const filterChips = document.getElementById('filterChips');
  const statArticles = document.getElementById('statArticles');
  const statCategories = document.getElementById('statCategories');
  const resultCount = document.getElementById('resultCount');
  const searchInput = document.getElementById('searchInput');

  const baseurl = window.SITE_BASEURL || '';
  
  // Try multiple possible paths for catalog
  const possiblePaths = [
    `${baseurl}/catalog.json`,
    '/ML-Interview-Based-Blogs/catalog.json',
    'catalog.json'
  ];

  let catalog = null;

  for (const catalogUrl of possiblePaths) {
    try {
      const res = await fetch(catalogUrl, { 
        cache: 'no-cache',
        headers: { 'Accept': 'application/json' }
      });
      
      if (res.ok) {
        catalog = await res.json();
        break;
      }
    } catch (err) {
      console.warn(`Could not load from ${catalogUrl}`);
    }
  }

  if (!catalog) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Catalog not found</h3>
        <p>The catalog.json file hasn't been generated yet.</p>
        <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">
          Run <code>python scripts/generate_catalog.py</code> to generate the catalog.
        </p>
      </div>
    `;
    return;
  }

  try {
    allCategories = Object.values(catalog.categories || {});
    
    if (allCategories.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>No categories found</h3>
          <p>Add markdown files to category folders to get started.</p>
        </div>
      `;
      return;
    }

    // Update stats
    statCategories.textContent = allCategories.length;

    // Flatten all articles with category info
    allArticles = allCategories.flatMap(cat => 
      (cat.articles || []).map(article => ({
        ...article,
        category: cat.name
      }))
    );
    
    statArticles.textContent = allArticles.length;

    // Setup "All Topics" chip click handler
    const allChip = filterChips.querySelector('[data-category="all"]');
    if (allChip) {
      allChip.onclick = () => toggleAllTopics();
    }

    // Create filter chips for each category
    allCategories.forEach(cat => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.dataset.category = cat.name;
      chip.textContent = `${cat.name} (${cat.articles?.length || 0})`;
      chip.onclick = (e) => toggleCategory(cat.name, e);
      filterChips.appendChild(chip);
    });

    // Render initial view
    renderCategories(allCategories);

    // Search functionality with debounce
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          const query = e.target.value.toLowerCase().trim();
          if (query.length === 0) {
            applyFilters();
          } else {
            searchArticles(query);
          }
        }, 200);
      });

      // Enter key triggers search
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSearch();
        }
      });
    }

  } catch (err) {
    console.error('Error processing catalog:', err);
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Error loading catalog</h3>
        <p>There was an error parsing the catalog data.</p>
        <p style="margin-top: 1rem; color: var(--text-muted);">${err.message}</p>
      </div>
    `;
  }
});

/**
 * Toggle "All Topics" - clears all filters and shows everything
 */
function toggleAllTopics() {
  // Clear all selected filters
  selectedFilters.clear();
  
  // Update chip states
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.remove('active');
  });
  
  // Mark "All Topics" as active
  const allChip = document.querySelector('.chip[data-category="all"]');
  if (allChip) {
    allChip.classList.add('active');
  }
  
  // Clear search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  
  // Show all categories
  renderCategories(allCategories);
}

/**
 * Toggle a category filter (multi-select enabled)
 */
function toggleCategory(category, event) {
  // Check if Ctrl/Cmd key is held for multi-select, or just toggle
  const isMultiSelect = event && (event.ctrlKey || event.metaKey || event.shiftKey);
  
  if (!isMultiSelect) {
    // Single select mode - clear others and select this one
    if (selectedFilters.size === 1 && selectedFilters.has(category)) {
      // If clicking the only selected category, show all
      toggleAllTopics();
      return;
    }
    selectedFilters.clear();
    selectedFilters.add(category);
  } else {
    // Multi-select mode - toggle this category
    if (selectedFilters.has(category)) {
      selectedFilters.delete(category);
    } else {
      selectedFilters.add(category);
    }
  }
  
  // If no filters selected, show all
  if (selectedFilters.size === 0) {
    toggleAllTopics();
    return;
  }
  
  // Update chip states
  updateChipStates();
  
  // Clear search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  
  // Apply filters
  applyFilters();
}

/**
 * Update visual state of filter chips
 */
function updateChipStates() {
  document.querySelectorAll('.chip').forEach(chip => {
    const category = chip.dataset.category;
    
    if (category === 'all') {
      // "All Topics" is active only when no specific filters are selected
      chip.classList.toggle('active', selectedFilters.size === 0);
    } else {
      chip.classList.toggle('active', selectedFilters.has(category));
    }
  });
}

/**
 * Apply current filters and render
 */
function applyFilters() {
  if (selectedFilters.size === 0) {
    renderCategories(allCategories);
  } else {
    const filtered = allCategories.filter(cat => selectedFilters.has(cat.name));
    renderCategories(filtered);
  }
}

/**
 * Legacy function for backward compatibility
 */
function filterByCategory(category) {
  if (category === 'all') {
    toggleAllTopics();
  } else {
    selectedFilters.clear();
    selectedFilters.add(category);
    updateChipStates();
    applyFilters();
  }
}

/**
 * Render category blocks
 */
function renderCategories(categories) {
  const grid = document.getElementById('categoryGrid');
  const resultCount = document.getElementById('resultCount');
  const baseurl = window.SITE_BASEURL || '';
  
  if (!categories || categories.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No articles found</h3>
        <p>Try adjusting your search or filter.</p>
      </div>
    `;
    resultCount.textContent = '0 articles';
    return;
  }

  const totalArticles = categories.reduce((sum, cat) => sum + (cat.articles?.length || 0), 0);
  resultCount.textContent = `${totalArticles} article${totalArticles === 1 ? '' : 's'}`;

  grid.innerHTML = categories.map(cat => {
    const articles = cat.articles || [];
    const articleCount = articles.length;
    const maxDisplay = 6;

    const articlesList = articles.slice(0, maxDisplay).map(article => {
      const encodedPath = encodeURIComponent(article.path);
      const displayTitle = cleanTitle(article.title);
      
      return `
        <div class="article-item">
          <a href="${baseurl}/view.html?file=${encodedPath}">
            ${displayTitle}
          </a>
          <div class="article-item__meta">
            ${article.subcategory ? `<span class="subcategory">${article.subcategory}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    const showMoreLink = articleCount > maxDisplay ? `
      <div class="show-more-link">
        <a href="#" onclick="expandCategory('${cat.name}'); return false;">
          + Show ${articleCount - maxDisplay} more
        </a>
      </div>
    ` : '';

    return `
      <div class="category-block" data-category="${cat.name}">
        <div class="category-block__header">
          <h3>${cat.name}</h3>
          <span class="category-block__count">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0 3a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0 3a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0 3a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11z"/>
            </svg>
            ${articleCount}
          </span>
        </div>
        <div class="category-block__articles">
          ${articlesList}
          ${showMoreLink}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Clean title - remove markdown artifacts
 */
function cleanTitle(title) {
  if (!title) return 'Untitled';
  return title
    .replace(/^#+\s*/, '')  // Remove leading #
    .replace(/^\*+\s*/, '') // Remove leading *
    .replace(/^✅\s*/, '')  // Remove checkmarks
    .replace(/^\d+\.\s*/, '') // Remove numbering
    .replace(/\*\*/g, '')   // Remove bold markers
    .trim();
}

/**
 * Search articles across all categories (respects current filters)
 */
function searchArticles(query) {
  // Start with either filtered categories or all categories
  const baseCategories = selectedFilters.size > 0 
    ? allCategories.filter(cat => selectedFilters.has(cat.name))
    : allCategories;
  
  const filtered = baseCategories.map(cat => ({
    ...cat,
    articles: (cat.articles || []).filter(article => {
      const titleMatch = article.title?.toLowerCase().includes(query);
      const pathMatch = article.path?.toLowerCase().includes(query);
      const subcatMatch = article.subcategory?.toLowerCase().includes(query);
      return titleMatch || pathMatch || subcatMatch;
    })
  })).filter(cat => cat.articles.length > 0);

  renderCategories(filtered);
}

/**
 * Expand category to show all articles
 */
function expandCategory(categoryName) {
  const baseurl = window.SITE_BASEURL || '';
  const category = allCategories.find(cat => cat.name === categoryName);
  
  if (!category) return;

  const block = document.querySelector(`.category-block[data-category="${categoryName}"]`);
  if (!block) return;

  const articlesContainer = block.querySelector('.category-block__articles');
  const articles = category.articles || [];

  articlesContainer.innerHTML = articles.map(article => {
    const encodedPath = encodeURIComponent(article.path);
    const displayTitle = cleanTitle(article.title);
    
    return `
      <div class="article-item">
        <a href="${baseurl}/view.html?file=${encodedPath}">
          ${displayTitle}
        </a>
        <div class="article-item__meta">
          ${article.subcategory ? `<span class="subcategory">${article.subcategory}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Handle search button click
 */
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value.trim()) {
    searchArticles(searchInput.value.toLowerCase().trim());
  }
}

// Make functions globally available
window.filterByCategory = filterByCategory;
window.toggleCategory = toggleCategory;
window.toggleAllTopics = toggleAllTopics;
window.expandCategory = expandCategory;
window.handleSearch = handleSearch;
