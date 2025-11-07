## 🔹 What is a Convex vs Non-Convex Loss Function?

* A **convex** loss function means the optimization surface has **a single global minimum** — gradient descent is guaranteed (in theory) to find it.
  ➤ Mathematically:
  ( f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda)f(y) )

* A **non-convex** loss function has **multiple local minima** — optimization can get stuck in suboptimal points.

---

## 🔹 Common **Convex** Loss Functions

Convex losses typically arise in **linear models** (no hidden layers).

| Model Type              | Loss Function                                                               | Convexity | Notes                                       |   |   |   |      |          |                                    |
| ----------------------- | --------------------------------------------------------------------------- | --------- | ------------------------------------------- | - | - | - | ---- | -------- | ---------------------------------- |
| **Linear Regression**   | **Mean Squared Error (MSE)** ( = \frac{1}{n}\sum (y_i - \hat{y}_i)^2 )      | ✅ Convex  | Paraboloid shape, global min                |   |   |   |      |          |                                    |
| **Lasso Regression**    | **L1 loss + penalty** (                                                     | y - Xw    | + \lambda                                   |   | w |   | _1 ) | ✅ Convex | Not differentiable at 0 but convex |
| **Ridge Regression**    | **L2 regularized loss**                                                     | ✅ Convex  | Smooth and strictly convex                  |   |   |   |      |          |                                    |
| **Logistic Regression** | **Log Loss / Cross Entropy** ( = -[y\log(\hat{y}) + (1-y)\log(1-\hat{y})] ) | ✅ Convex  | Only for *linear* models (no hidden layers) |   |   |   |      |          |                                    |
| **SVM (Hinge Loss)**    | ( \max(0, 1 - y w^T x) )                                                    | ✅ Convex  | Piecewise linear but convex                 |   |   |   |      |          |                                    |
| **Huber Loss**          | Quadratic near 0, linear otherwise                                          | ✅ Convex  | Robust to outliers                          |   |   |   |      |          |                                    |

---

## 🔹 Common **Non-Convex** Loss Functions

Non-convex losses arise in **nonlinear models** (like neural networks).

| Model Type                                         | Loss Function                                        | Convexity    | Why Non-Convex                         |
| -------------------------------------------------- | ---------------------------------------------------- | ------------ | -------------------------------------- |
| **Neural Networks (any deep model)**               | **Cross-Entropy / MSE (with nonlinear activations)** | ❌ Non-convex | Due to nonlinear composition of layers |
| **Autoencoders / VAEs**                            | Reconstruction + Regularization losses               | ❌ Non-convex | Network weights + nonlinearities       |
| **GANs**                                           | Generator–Discriminator loss                         | ❌ Non-convex | Min–max game between two networks      |
| **Matrix Factorization / Collaborative Filtering** | Squared loss on latent embeddings                    | ❌ Non-convex | Product of unknown matrices            |
| **K-Means Clustering**                             | Sum of squared distances to centroids                | ❌ Non-convex | Centroid assignments are discrete      |

---

## 🔹 Intuition

* Convex losses → **easy to optimize**, no local minima traps.
* Non-convex losses → **harder**, but neural networks often work well due to good local minima and stochastic optimization (SGD noise helps escape bad ones).

---

### ✅ Summary Table

| Loss Function                       | Convexity    | Typical Use                    |
| ----------------------------------- | ------------ | ------------------------------ |
| Mean Squared Error                  | ✅ Convex     | Linear regression              |
| Cross Entropy (Logistic Regression) | ✅ Convex     | Binary classification (linear) |
| Hinge Loss                          | ✅ Convex     | SVM                            |
| Huber Loss                          | ✅ Convex     | Robust regression              |
| Cross Entropy (Deep NN)             | ❌ Non-convex | Classification (deep models)   |
| MSE (Deep NN)                       | ❌ Non-convex | Regression (deep models)       |
| GAN Loss                            | ❌ Non-convex | Generative modeling            |
| K-Means Objective                   | ❌ Non-convex | Clustering                     |

---
