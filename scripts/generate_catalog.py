import os
import json
from pathlib import Path
from datetime import datetime

def extract_title_from_md(file_path):
    """Extract title from markdown file (first H1 or filename)"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('# '):
                    return line.strip('# \n')
    except:
        pass
    return Path(file_path).stem.replace('_', ' ').replace('-', ' ')

def generate_catalog():
    """Generate article catalog from directory structure"""
    catalog = {
        'generated_at': datetime.now().isoformat(),
        'categories': {}
    }
    
    # Directories to scan
    categories = [
        'LLM', 'Neural Network', 'Agents', 'RAG', 
        'Computer Vision', 'Traditional ML', 'Statistics', 'System Design'
    ]
    
    for category in categories:
        if not os.path.exists(category):
            continue
            
        catalog['categories'][category] = {
            'name': category,
            'articles': []
        }
        
        # Walk through category directory
        for root, dirs, files in os.walk(category):
            # Skip hidden directories
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            
            for file in files:
                if file.endswith('.md') and file.lower() != 'index.md':
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, '.')
                    
                    article = {
                        'title': extract_title_from_md(file_path),
                        'path': rel_path,
                        'filename': file,
                        'subcategory': os.path.basename(root) if root != category else None,
                        'modified': datetime.fromtimestamp(
                            os.path.getmtime(file_path)
                        ).isoformat()
                    }
                    
                    catalog['categories'][category]['articles'].append(article)
        
        # Sort by modified date (newest first)
        catalog['categories'][category]['articles'].sort(
            key=lambda x: x['modified'], 
            reverse=True
        )
    
    # Write catalog
    with open('catalog.json', 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Generated catalog with {sum(len(cat['articles']) for cat in catalog['categories'].values())} articles")
    return catalog

if __name__ == '__main__':
    generate_catalog()