# ✅ **Why do we divide by √dₖ instead of √d?**

The attention score is:

[
\text{Attention}(Q,K,V) = \mathrm{softmax}\left(\frac{QK^{T}}{\sqrt{d_k}}\right)V
]

This scaling is needed for **numerical stability**.

---

# 🔥 **Intuition: Dot products grow with dimension**

Let:

[
Q, K \in \mathbb{R}^{d_k}
]

Assume each component is drawn from a normal distribution:

[
Q_i, K_i \sim \mathcal{N}(0,1)
]

Then the dot product:

[
Q \cdot K = \sum_{i=1}^{d_k} Q_i K_i
]

Each product (Q_i K_i) has:

* mean = 0
* variance = 1

When you sum **dₖ** such terms, the variance becomes:

[
\mathrm{Var}(Q\cdot K) = d_k
]

Meaning:

👉 **The dot product grows in magnitude proportional to dₖ**

So if:

* (dₖ = 64), scores are moderate
* (dₖ = 512), scores explode (8× larger variance)

---

# 🚨 What goes wrong without scaling?

The softmax will see very large positive and negative logits:

[
\exp(\text{big number}) \rightarrow \text{overflow}
]

This results in:

* **softmax becoming extremely peaky**
* almost **one token gets all the attention**
* **gradients explode**
* training becomes unstable

---

# ⭐ Solution: Normalize the dot product

We divide the dot product by:

[
\sqrt{d_k}
]

Why?

Because:

[
\mathrm{StdDev}(Q\cdot K) = \sqrt{d_k}
]

So dividing by √dₖ **normalizes the variance back to 1**.

Then the softmax receives logits with controlled scale.

---

# 🧠 But why not √d?

Because attention is computed **per head**, and each head works on vectors of size **dₖ**, NOT the model dimension d.

Even if the model hidden dimension is large, like:

* GPT-3 (d = 12,288)
* But with 96 heads → dₖ = 128

The dot-product dimension is **128**, so scaling must match **that**.

---

# 🔍 Summary Table

| Symbol | Meaning                      | Used For                         |
| ------ | ---------------------------- | -------------------------------- |
| **d**  | Full model dimension         | Embeddings, positional encodings |
| **dₖ** | Per-head query/key dimension | Attention score scaling          |

We scale by √dₖ because:

* The dot product is computed over dₖ dimensions
* The variance grows as dₖ
* We must normalize using √dₖ
* Scaling by √d would under/over-correct depending on #heads

---

# 🎯 **Interview-ready one-liner**

> We divide by √dₖ because the dot product Q·K has variance dₖ, not d. Scaling by √dₖ normalizes the distribution so softmax doesn’t blow up. Attention is computed per-head, so the dimension that matters is the head dimension dₖ.
