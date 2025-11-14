# ✅ **Why do we divide by √dₖ instead of √d?**

The attention score is:

[
\text{Attention}(Q,K,V) = \mathrm{softmax}\left(\frac{QK^{T}}{\sqrt{d_k}}\right)V
]

This scaling is needed for **numerical stability**.

---

# 🔥 **Intuition: Dot products grow with dimension**

<img width="426" height="537" alt="image" src="https://github.com/user-attachments/assets/56ec43fb-9012-43c0-a88f-98249fc8c4f2" />


---

# 🚨 What goes wrong without scaling?

The softmax will see very large positive and negative logits:

exp(big number)→overflow

This results in:

* **softmax becoming extremely peaky**
* almost **one token gets all the attention**
* **gradients explode**
* training becomes unstable

---

# ⭐ Solution: Normalize the dot product

We divide the dot product by:
 √dₖ

Why?

Because:

StdDev(Q⋅K)=  √dₖ
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
