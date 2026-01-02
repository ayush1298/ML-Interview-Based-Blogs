---
layout: default
title: AI / ML Interview Questions
---

<header class="site-header">
  <div class="container">
    <nav class="nav">
      <a href="{{ '/' | relative_url }}" class="nav-logo">
        <div class="nav-logo__icon">ML</div>
        <span class="nav-logo__text">ML Interview Hub</span>
      </a>
      <ul class="nav-links">
        <li><a href="#categories">Categories</a></li>
        <li><a href="#articles">Articles</a></li>
        <li>
          <a href="https://github.com/ayush1298/ML-Interview-Based-Blogs" target="_blank" class="nav-github">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<section class="hero">
  <div class="container">
    <div class="hero__inner">
      <div class="hero__content">
        <div class="hero__eyebrow">Knowledge Base</div>
        <h1 class="hero__title">Master <span>AI/ML Interviews</span> with Real Questions</h1>
        <p class="hero__subtitle">
          A comprehensive collection of interview questions covering LLMs, Neural Networks, 
          Agents, RAG, Computer Vision, and more — curated from real industry interviews.
        </p>
        
        <div class="search-wrapper">
          <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Search for topics, concepts, or questions...">
            <button onclick="handleSearch()">Search</button>
          </div>
        </div>
      </div>
      
      <div class="hero__stats">
        <div class="stat-card">
          <span class="stat-card__value" id="statArticles">—</span>
          <span class="stat-card__label">Articles</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__value" id="statCategories">—</span>
          <span class="stat-card__label">Categories</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="filter-section" id="categories">
  <div class="container">
    <div class="section-header">
      <div>
        <h2>Filter by Category</h2>
        <p>Browse articles by topic · Hold <kbd>Ctrl</kbd>/<kbd>⌘</kbd> to select multiple</p>
      </div>
    </div>
    
    <div class="filter-chips" id="filterChips">
      <button class="chip active" data-category="all">All Topics</button>
    </div>
  </div>
</section>

<section class="articles-section" id="articles">
  <div class="container">
    <div class="articles-header">
      <h2>Browse Articles</h2>
      <p id="resultCount">Loading articles...</p>
    </div>
    
    <div class="category-grid" id="categoryGrid">
      <div class="loading">Loading content</div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="container">
    <div class="footer__content">
      <div class="footer__logo">ML Interview Hub</div>
      <div class="footer__links">
        <a href="https://github.com/ayush1298/ML-Interview-Based-Blogs" target="_blank">GitHub</a>
        <a href="#categories">Categories</a>
        <a href="#articles">Articles</a>
      </div>
      <p class="footer__copyright">© 2026 ML Interview Hub. Open source and community-driven.</p>
    </div>
  </div>
</footer>

<script>
  window.SITE_BASEURL = "{{ site.baseurl }}";
</script>
<script src="{{ '/assets/js/main.js' | relative_url }}"></script>
