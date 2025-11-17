**linear vs. sparse attention** — what they are, why they are used, and how they differ.

---

# 🔵 **1. Standard / Quadratic Attention (Baseline)**

In normal Transformers:

<img width="362" height="78" alt="image" src="https://github.com/user-attachments/assets/18a1d39e-cd32-436b-bbf2-4f7a129838b0" />

* Q is L×d
* K is L×d
* So (QK^\top) is **L × L** → compares every token to every other token.

### ❗ Complexity:

[
O(L^2)
]

This becomes expensive when L (sequence length) is large.

---

# 🔵 **2. Sparse Attention (Reduce number of connections)**

Sparse attention reduces cost by computing attention **only on selected positions**, not all L tokens.

### How it works:

Instead of attending to all tokens, a token attends only to:

* Local window (neighboring tokens)
* Strided tokens (every kth token)
* Global tokens (special tokens like CLS)
* Random subsets

This reduces number of Q–K interactions.

### Example (BigBird):

* Local  (w neighbors)
* Global (g tokens)
* Random (r tokens)

Total cost:

[
O(L(w + r + g))
]

This is **sub-quadratic** → often **O(L)** or **O(L√L)** depending on implementation.

### Intuition:

Sparse attention = **skip most connections**.

### Benefits:

✔ Works for long sequences
✔ Keeps important global structure
✔ Lower memory and compute than dense attention

---

# 🔵 **3. Linear Attention (Kernelization trick)**

Linear attention makes the whole attention computation **mathematically linear** in L.

<img width="530" height="532" alt="image" src="https://github.com/user-attachments/assets/98a585e5-1776-4186-bbac-a9492423ff7c" />


### Intuition:

Linear attention = **reorder softmax + use kernel trick**
It avoids computing the big L×L matrix entirely.

### Benefits:

✔ True **O(L)** scaling
✔ Much faster for long sequences
✔ Lower memory usage

---

# 🔵 **Sparse Attention vs Linear Attention — Comparison**

| Feature            | Sparse Attention                           | Linear Attention                        |
| ------------------ | ------------------------------------------ | --------------------------------------- |
| **Idea**           | Attend to fewer tokens                     | Reparameterize attention so it’s linear |
| **Scaling**        | Sub-quadratic, often O(L)                  | Strict O(L)                             |
| **Accuracy**       | Usually high (keeps global/local patterns) | Sometimes lower (approximation error)   |
| **Memory**         | Lower than dense                           | Very low                                |
| **Used in**        | Longformer, BigBird                        | Performer, Linear Transformer           |
| **Works well for** | NLP, structured long text                  | Very long sequences, streaming          |

---

# 🧠 **Simple Analogy**

### **Sparse attention**

“You don’t talk to everyone in the room, only a few selected people.”

### **Linear attention**

“You compress conversations into one summary, then talk using that summary.”

---

# 🔥 Final Summary **

* **Standard attention = O(L²)** because every token attends to every other.
* **Sparse attention** reduces this by restricting which tokens attend to which → sub-quadratic, often nearly O(L).
* **Linear attention** rewrites attention using kernel tricks so it becomes mathematically O(L) without forming the full attention matrix.

---

A good blog on Sparse attention in detail: https://medium.com/@vishal09vns/sparse-attention-dad17691478c
