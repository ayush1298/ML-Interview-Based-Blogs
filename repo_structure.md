ML-Interview-Based-Blogs/
│
├── .github/
│   └── workflows/
│       └── generate-catalog.yml          # Auto-generate article catalog
│
├── _layouts/                              # Jekyll layouts
│   ├── default.html                      # Base layout
│   ├── article.html                      # Article page layout
│   └── category.html                     # Category listing layout
│
├── _includes/                             # Reusable components
│   ├── header.html
│   ├── footer.html
│   ├── navigation.html
│   └── article-card.html
│
├── assets/                                # Static assets
│   ├── css/
│   │   └── style.css                     # Custom styles
│   ├── js/
│   │   ├── search.js                     # Search functionality
│   │   └── main.js                       # Main JS
│   └── images/
│       ├── logo.png
│       └── categories/                   # Category icons
│
├── scripts/                               # Automation scripts
│   ├── generate_catalog.py               # Auto-generate catalog
│   └── validate_links.py                 # Check for broken links
│
├── LLM/                                   # Your existing content
│   ├── Training/
│   │   ├── Training_Instability_Exploding_Gradients_Deeper_LLM.md
│   │   └── index.md                      # Category overview
│   ├── Inference/
│   │   └── Speculative Decoding/
│   ├── Finetuning/
│   │   └── LORA.md
│   └── Quantization/
│
├── Neural Network/                        # Your existing content
│   ├── How to use Droput layer during inference?.md
│   └── index.md
│
├── Agents/                                # Your existing content
│   ├── How Agnets are different from chatbot?.md
│   └── index.md
│
├── RAG/                                   # Your existing content
│   └── index.md
│
├── Computer Vision/                       # Your existing content
│   └── index.md
│
├── Traditional ML/                        # Your existing content
│   └── index.md
│
├── Statistics/                            # Your existing content
│   └── index.md
│
├── System Design/                         # Your existing content
│   └── index.md
│
├── _config.yml                            # Jekyll config (you have this)
├── index.html                             # Homepage (main landing page)
├── catalog.json                           # Auto-generated article index
├── search.html                            # Search page
├── about.md                               # About the project
├── contributing.md                        # Contribution guidelines
├── .gitignore                            # Git ignore rules
├── Gemfile                               # Ruby dependencies for Jekyll
└── README.md                             # Repository README