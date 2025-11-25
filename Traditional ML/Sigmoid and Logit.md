Logit() and Sigmoid()
The logit function maps probabilities to the full range of real numbers required prior to modeling.

The inverse of the logit function is the sigmoid function. That is, if you have a probability p, sigmoid(logit(p)) = p. The sigmoid function maps arbitrary real values back to the range [0, 1]. We can also say sigmoid function as the generalized form of logit function.

---

### 🔹 Step 1: The two functions

We have two mathematical functions:

1️⃣ **Sigmoid (or logistic) function:**
[
\sigma(x) = \frac{1}{1 + e^{-x}}
]
It takes **any real number** and **squashes it** into a range between **0 and 1**, so it looks like a smooth “S” curve.

👉 Input: real numbers (-∞ to ∞)
👉 Output: probabilities (0 to 1)

---

2️⃣ **Logit function (inverse of sigmoid):**
[
\text{logit}(p) = \ln\left(\frac{p}{1 - p}\right)
]
It takes **a probability** (something between 0 and 1) and **expands** it back into **the whole real line (-∞ to ∞)**.

👉 Input: probability (0 to 1)
👉 Output: real numbers (-∞ to ∞)

---

### 🔹 Step 2: How they are inverses

Think of this like **a reversible transformation** between real numbers and probabilities:

| Real value (x) | Sigmoid(x) = probability (p) | Logit(p) = x |
| -------------- | ---------------------------- | ------------ |
| -∞             | 0                            | -∞           |
| 0              | 0.5                          | 0            |
| +∞             | 1                            | +∞           |

If you take a probability ( p ), apply **logit(p)**, and then apply **sigmoid()**, you get back the same ( p ):
[
\sigma(\text{logit}(p)) = p
]
and if you take a real value ( x ), apply **sigmoid(x)**, and then **logit()**, you get back ( x ):
[
\text{logit}(\sigma(x)) = x
]

---

### 🔹 Step 3: Why this matters in modeling

In **logistic regression**, we need to model probabilities, but we can’t directly fit a regression line to numbers between 0 and 1 — it could predict values outside that range.

So, we:

1. Use **logit(p)** to transform probabilities into **real numbers** (the “log-odds”).
2. Fit a **linear model** on these real numbers (since linear models work well on unrestricted values).
3. Then, to interpret predictions as probabilities again, we apply the **sigmoid** to the model output.

---

### 🔹 Step 4: Simple analogy

Think of it like:

* **Sigmoid:** squeezes any real number into a “probability box” (0–1).
* **Logit:** unwraps a probability out of that box, stretching it back to the whole real line.

---
