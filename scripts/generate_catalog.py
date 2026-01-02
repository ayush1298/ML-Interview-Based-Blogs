#!/usr/bin/env python3
"""
ML Interview Hub - Catalog Generator

This script automatically scans the repository for markdown files
and generates a catalog.json file that the website uses to display articles.

Features:
- Auto-discovers all category directories (no hardcoding needed)
- Extracts titles from markdown files
- Handles nested subcategories
- Supports images referenced in markdown files

Usage:
    python scripts/generate_catalog.py

The script should be run from the repository root directory.
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime

# Directories to ignore (not content categories)
IGNORE_DIRS = {
    '.git', '.github', '.specstory', '.cursor', 
    'node_modules', '_includes', '_layouts', '_saas', '_site',
    'assets', 'scripts', 'terminals', '__pycache__', '.vscode'
}

# Files to ignore
IGNORE_FILES = {
    'index.md', 'README.md', 'repo_structure.md'
}


def extract_title_from_md(file_path: str) -> str:
    """
    Extract title from a markdown file.
    
    Priority:
    1. First H1 heading (# Title)
    2. First H2 heading (## Title)
    3. Filename cleaned up
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read(2000)  # Read first 2KB for title search
            
            # Look for H1 heading
            h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            if h1_match:
                title = h1_match.group(1).strip()
                # Clean up common artifacts
                title = re.sub(r'^\*+\s*', '', title)  # Remove leading asterisks
                title = re.sub(r'\*+$', '', title)     # Remove trailing asterisks
                title = title.strip('*').strip()
                if title and len(title) > 2:
                    return title
            
            # Look for H2 heading if no H1
            h2_match = re.search(r'^##\s+(.+)$', content, re.MULTILINE)
            if h2_match:
                title = h2_match.group(1).strip()
                title = re.sub(r'^\*+\s*', '', title)
                title = title.strip('*').strip()
                if title and len(title) > 2:
                    return title
                    
    except Exception as e:
        print(f"  Warning: Could not read {file_path}: {e}")
    
    # Fallback: clean up filename
    filename = Path(file_path).stem
    return filename.replace('_', ' ').replace('-', ' ').strip()


def get_file_modified_time(file_path: str) -> str:
    """Get file modification time as ISO string."""
    try:
        mtime = os.path.getmtime(file_path)
        return datetime.fromtimestamp(mtime).isoformat()
    except:
        return datetime.now().isoformat()


def is_category_dir(dir_path: str) -> bool:
    """Check if a directory is a valid category (contains .md files)."""
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.md') and file.lower() not in [f.lower() for f in IGNORE_FILES]:
                return True
    return False


def discover_categories(base_path: str = '.') -> list:
    """
    Auto-discover all category directories.
    A category is a top-level directory that contains .md files.
    """
    categories = []
    
    for item in os.listdir(base_path):
        item_path = os.path.join(base_path, item)
        
        # Skip if not a directory
        if not os.path.isdir(item_path):
            continue
            
        # Skip ignored directories
        if item in IGNORE_DIRS or item.startswith('.') or item.startswith('_'):
            continue
            
        # Check if this directory contains markdown files
        if is_category_dir(item_path):
            categories.append(item)
    
    return sorted(categories)


def scan_category(category: str, base_path: str = '.') -> dict:
    """
    Scan a category directory and collect all articles.
    """
    category_path = os.path.join(base_path, category)
    articles = []
    
    for root, dirs, files in os.walk(category_path):
        # Skip hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            # Only process markdown files
            if not file.endswith('.md'):
                continue
                
            # Skip ignored files
            if file.lower() in [f.lower() for f in IGNORE_FILES]:
                continue
            
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, base_path)
            
            # Determine subcategory (if nested)
            rel_dir = os.path.relpath(root, category_path)
            subcategory = None if rel_dir == '.' else rel_dir.replace(os.sep, ' / ')
            
            article = {
                'title': extract_title_from_md(file_path),
                'path': rel_path.replace(os.sep, '/'),  # Normalize path separators
                'filename': file,
                'subcategory': subcategory,
                'modified': get_file_modified_time(file_path)
            }
            
            articles.append(article)
    
    # Sort by modified date (newest first)
    articles.sort(key=lambda x: x['modified'], reverse=True)
    
    return {
        'name': category,
        'articles': articles
    }


def generate_catalog(base_path: str = '.') -> dict:
    """
    Generate the complete catalog from all categories.
    """
    print("🔍 Discovering categories...")
    categories = discover_categories(base_path)
    
    if not categories:
        print("⚠️  No categories found. Make sure you have directories with .md files.")
        return {'generated_at': datetime.now().isoformat(), 'categories': {}}
    
    print(f"📁 Found {len(categories)} categories: {', '.join(categories)}")
    
    catalog = {
        'generated_at': datetime.now().isoformat(),
        'categories': {}
    }
    
    total_articles = 0
    
    for category in categories:
        print(f"  📂 Scanning {category}...")
        cat_data = scan_category(category, base_path)
        article_count = len(cat_data['articles'])
        total_articles += article_count
        print(f"     → Found {article_count} articles")
        catalog['categories'][category] = cat_data
    
    return catalog, total_articles


def main():
    """Main entry point."""
    print("\n" + "="*50)
    print("   ML Interview Hub - Catalog Generator")
    print("="*50 + "\n")
    
    # Change to repo root if running from scripts directory
    if os.path.basename(os.getcwd()) == 'scripts':
        os.chdir('..')
    
    catalog, total_articles = generate_catalog('.')
    
    # Write catalog to JSON file
    output_file = 'catalog.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Generated {output_file}")
    print(f"   → {len(catalog['categories'])} categories")
    print(f"   → {total_articles} total articles")
    print(f"   → Generated at: {catalog['generated_at']}")
    print("\n" + "="*50 + "\n")


if __name__ == '__main__':
    main()
