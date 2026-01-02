# ML Interview Hub

A curated collection of **127+ real-world AI/ML interview questions** with detailed answers, covering LLMs, Neural Networks, Computer Vision, RAG, and more.

🔗 **[View Live Site →](https://ayush1298.github.io/ML-Interview-Based-Blogs/)**

---

## 📚 Topics Covered

| Category | Articles | Topics |
|----------|----------|--------|
| **LLM** | 78 | Training, Inference, Quantization, Attention, Finetuning, LORA, MOE |
| **Neural Network** | 7 | Optimizers, Dropout, Softmax, Weight Initialization |
| **Computer Vision** | 8 | CNNs, Object Detection, Segmentation, NMS |
| **RAG** | 3 | Retrieval, Vector DBs, Hallucination Debugging |
| **Agents** | 6 | Memory, Tool Use, Termination |
| **Traditional ML** | 13 | Feature Engineering, Class Imbalance, Loss Functions |
| **System Design** | 3 | Scaling, Retraining, Recommendation Systems |
| **VLMs** | 4 | CLIP, Vision Tokens, Multimodal Training |

---

## 🚀 Features

- 📖 Clean reading experience with optimized typography
- 🔍 Search & filter by category
- 📑 Auto-generated table of contents
- ⏱️ Reading time estimates
- 🔗 Share/copy link functionality
- 📱 Mobile responsive design
- 💻 Syntax highlighted code blocks

---

## 📁 Repository Structure

```
ML-Interview-Based-Blogs/
│
├── 📂 Articles (Content)
│   ├── LLM/                    # 78 articles on Large Language Models
│   ├── Neural Network/         # Deep learning fundamentals
│   ├── Computer Vision/        # CV interview questions
│   ├── RAG/                    # Retrieval-Augmented Generation
│   ├── Agents/                 # AI Agents & tool use
│   ├── Traditional ML/         # Classical ML algorithms
│   ├── System Design/          # ML system design
│   └── ...                     # More categories
│
├── 📂 website/                 # Frontend files (Jekyll site)
│   ├── _config.yml             # Jekyll configuration
│   ├── _layouts/               # HTML layouts
│   ├── assets/                 # CSS & JavaScript
│   ├── index.md                # Homepage
│   └── view.html               # Article viewer
│
├── 📂 scripts/                 # Utilities
│   └── generate_catalog.py     # Auto-generates article index
│
└── 📄 README.md                # This file
```

---

## ✍️ Adding New Articles

1. Create a `.md` file in the appropriate category folder:
   ```bash
   echo "# Your Question Title\n\nYour answer..." > "LLM/Training/Your-Topic.md"
   ```

2. Push to GitHub — the catalog updates automatically!

3. For new categories, just create a new folder with `.md` files.

---

## 🛠️ Local Development

```bash
cd website
bundle install
python ../scripts/generate_catalog.py
bundle exec jekyll serve
```

---

## 📝 Article Format

```markdown
# Question Title

Brief introduction or context.

## Key Concept

Explanation with examples...

### Code Example
\`\`\`python
def example():
    return "Hello ML!"
\`\`\`
```

---

Feel free to use for learning and interview prep!

<p align="center">
  <b>⭐ Star this repo if it helps with your ML interviews!</b>
</p>
