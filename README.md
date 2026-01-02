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

- 📖 **Clean reading experience** with optimized typography
- 🔍 **Search & filter** by category
- 📑 **Auto-generated table of contents** for long articles
- ⏱️ **Reading time estimates**
- 🔗 **Share/copy link** functionality
- 📱 **Mobile responsive** design
- 🖼️ **Image support** with click-to-zoom
- 💻 **Syntax highlighted** code blocks with copy button
- ➕ **LaTeX/Math** rendering support

---

## 📁 Repository Structure

```
├── 📂 LLM/                    # LLM interview questions
├── 📂 Neural Network/         # NN fundamentals
├── 📂 Computer Vision/        # CV topics
├── 📂 RAG/                    # Retrieval-Augmented Generation
├── 📂 Agents/                 # AI Agents
├── 📂 Traditional ML/         # Classical ML
├── 📂 System Design/          # ML System Design
├── 📂 [Other Categories]/     # More topics...
│
├── 📄 index.md                # Homepage
├── 📄 view.html               # Article viewer
├── 📂 assets/                 # CSS & JavaScript
├── 📂 _layouts/               # Jekyll layouts
├── 📂 scripts/                # Catalog generator
└── 📄 catalog.json            # Auto-generated article index
```

---

## ✍️ Adding New Articles

1. Create a `.md` file in the appropriate category folder:
   ```bash
   echo "# Your Question Title\n\nYour content here..." > "LLM/Training/Your-Topic.md"
   ```

2. Push to GitHub — the catalog updates automatically!

3. For **new categories**, just create a new folder with `.md` files.

---

## 🛠️ Local Development

```bash
# Install dependencies
bundle install

# Generate catalog
python scripts/generate_catalog.py

# Run locally
bundle exec jekyll serve
```

Open `http://localhost:4000/ML-Interview-Based-Blogs/`

---

## 📝 Article Format

Articles are plain Markdown files:

```markdown
# Question Title

Brief introduction or context.

## Key Concept 1

Explanation with examples...

## Key Concept 2

More details...

### Code Example

\`\`\`python
def example():
    return "Hello ML!"
\`\`\`
```

**Supported features:**
- Headers (H1-H4)
- Code blocks with syntax highlighting
- Images (relative paths supported)
- Tables, lists, blockquotes
- LaTeX math: `$inline$` and `$$block$$`

---

## 🤝 Contributing

Contributions welcome! Add new questions, fix errors, or improve explanations.

1. Fork the repository
2. Add/edit `.md` files
3. Submit a pull request

---

feel free to use for learning and interview prep!

---

<p align="center">
  <b>⭐ Star this repo if it helps with your ML interviews!</b>
</p>

