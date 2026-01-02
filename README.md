# ML Interview Hub

A curated collection of ** real-world AI/ML interview questions** with detailed answers, covering LLMs, Neural Networks, Computer Vision, RAG, and more.

🔗 **[View Live Site →](https://ayush1298.github.io/ML-Interview-Based-Blogs/)**

---

## 📚 Topics Covered

| Category | Topics |
|----------|--------|
| **LLM** | Training, Inference, Quantization, Attention, Finetuning, LORA, MOE |
| **Neural Network** | Optimizers, Dropout, Softmax, Weight Initialization |
| **Computer Vision** | CNNs, Object Detection, Segmentation, NMS |
| **RAG** | Retrieval, Vector DBs, Hallucination Debugging |
| **Agents** | Memory, Tool Use, Termination |
| **Traditional ML** | Feature Engineering, Class Imbalance, Loss Functions |
| **System Design** | Scaling, Retraining, Recommendation Systems |
| **VLMs** | CLIP, Vision Tokens, Multimodal Training |

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
