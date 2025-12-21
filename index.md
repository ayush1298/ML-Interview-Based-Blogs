---
layout: default
title: AI / ML Interview Questions
---

<div class="hero">
  <div class="hero__content">
    <span class="eyebrow">Knowledge Base</span>
    <h1>AI / ML Interview Questions</h1>
    <p class="subtitle">Comprehensive collection of real-world interview questions covering LLMs, Neural Networks, Agents, RAG, Computer Vision, and more.</p>
    
    <div class="search-bar">
      <input type="text" id="searchInput" placeholder="Search articles...">
      <button onclick="handleSearch()">Search</button>
    </div>
  </div>
  
  <div class="hero__stats">
    <div class="stat">
      <span id="statArticles">—</span>
      <small>Articles</small>
    </div>
    <div class="stat">
      <span id="statCategories">—</span>
      <small>Categories</small>
    </div>
  </div>
</div>

<div class="section">
  <div class="section__head">
    <h2>Filter by Category</h2>
    <p>Browse articles by topic</p>
  </div>
  
  <div class="filter-chips" id="filterChips">
    <button class="chip active" data-category="all">All</button>
  </div>
</div>

<div class="section">
  <div class="section__head">
    <h2>Browse Articles</h2>
    <p id="resultCount">Loading articles...</p>
  </div>
  
  <div class="category-grid" id="categoryGrid">
    <div class="loading">Loading...</div>
  </div>
</div>

<script src="{{ '/assets/js/main.js' | relative_url }}"></script>