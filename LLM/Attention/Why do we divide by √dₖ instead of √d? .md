# ✅ **Why do we divide by √dₖ instead of √d?**

The attention score is:

<img width="352" height="73" alt="image" src="https://github.com/user-attachments/assets/276d5d87-9b15-4259-82fd-fc8b1c711b76" />

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


Detail answer: 

Why does attention divide by √dₖ and why does training fall apart without it

This small scaling factor is one of the most important stability choices in the transformer architecture.

In self-attention, the model computes a dot product between query and key vectors to measure relevance.

The dot product looks like this:
q · k = q₁k₁ + q₂k₂ + … + q_dₖk_dₖ

Each attention head operates in a space of dimension dₖ, which is the embedding dimension divided by the number of heads.

As dₖ increases, the dot product becomes a sum of more terms.

Summing more terms naturally increases the magnitude of the result.

Adding 64 numbers produces smaller values than adding 512 numbers, even if each individual number follows the same distribution.

This means that larger dₖ leads to larger attention scores.
These scores are then passed into the softmax function:
softmax(xᵢ) = eˣᵢ / Σ eˣⱼ

When one attention score becomes much larger than the others, the softmax output collapses toward a one-hot distribution.

One token receives almost all the probability mass, while the rest receive almost none.

At this point, gradients begin to vanish.
The gradient of softmax is proportional to p(1 − p).
When p approaches 1 or 0, the gradient approaches zero.

This causes attention to behave like a hard selector instead of a smooth weighting mechanism, which severely limits learning and harms stability in deeper models.

Dividing the dot product by √dₖ corrects this behavior.
The variance of the dot product grows with the dimension, and scaling by √dₖ normalizes that growth.

 As a result, attention scores remain within a stable range.
This keeps the softmax distribution smooth, preserves useful gradients, and allows attention to remain expressive across many layers.

It is a small mathematical adjustment, but it plays a foundational role in making transformers trainable at scale.
