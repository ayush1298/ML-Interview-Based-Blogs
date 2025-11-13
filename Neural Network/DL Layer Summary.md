### 🧠 **Deep Learning Layer Summary Table**

| **Layer Type**                       | **Input Shape**            | **Output Shape**                   | **Trainable Parameters**                                                                            | **Non-Trainable Parameters**        | **Notes / Explanation**                                                                  |
| ------------------------------------ | -------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| **Fully Connected (Dense)**          | `(N_in,)`                  | `(N_out,)`                         | `N_in × N_out + N_out` (weights + biases)                                                           | –                                   | Every input neuron connects to every output neuron. Common in MLPs and classifier heads. |
| **Convolution (Conv2D)**             | `(H_in, W_in, C_in)`       | `(H_out, W_out, K)`                | `F × F × C_in × K + K` (weights + biases)                                                           | –                                   | Each of the `K` filters learns `F×F×C_in` weights. Output has `K` channels.              |
| **Depthwise Conv2D**                 | `(H_in, W_in, C_in)`       | `(H_out, W_out, C_in)`             | `F × F × C_in + C_in`                                                                               | –                                   | One filter per input channel. Often followed by pointwise conv (`1×1`) to mix channels.  |
| **Pointwise Conv (1×1 Conv)**        | `(H_in, W_in, C_in)`       | `(H_in, W_in, K)`                  | `1 × 1 × C_in × K + K`                                                                              | –                                   | Used for channel mixing or dimensionality reduction.                                     |
| **Batch Normalization**              | `(any)`                    | `(same as input)`                  | `2 × C` (`γ` and `β` for each channel)                                                              | `2 × C` (running mean and variance) | Normalizes activations to stabilize training.                                            |
| **Pooling (Max / Avg Pool)**         | `(H_in, W_in, C_in)`       | `(H_out, W_out, C_in)`             | –                                                                                                   | –                                   | Reduces spatial dimensions; no learnable parameters.                                     |
| **Flatten**                          | `(H, W, C)`                | `(H×W×C,)`                         | –                                                                                                   | –                                   | Converts 3D feature maps into a 1D vector before FC layers.                              |
| **Dropout**                          | `(any)`                    | `(same as input)`                  | –                                                                                                   | –                                   | Randomly drops units during training; no parameters.                                     |
| **Activation (ReLU, Sigmoid, etc.)** | `(any)`                    | `(same as input)`                  | –                                                                                                   | –                                   | Applies element-wise nonlinearity; purely functional.                                    |
| **Residual / Skip Connection**       | `(same input/output dims)` | `(same)`                           | –                                                                                                   | –                                   | Adds or concatenates activations from earlier layers; improves gradient flow.            |
| **Embedding Layer**                  | `(sequence_length,)`       | `(sequence_length, embedding_dim)` | `Vocab_size × embedding_dim`                                                                        | –                                   | Maps discrete tokens to dense continuous vectors.                                        |
| **RNN / LSTM / GRU**                 | `(seq_len, input_dim)`     | `(seq_len, hidden_dim)`            | Complex: depends on gates; e.g. LSTM has `4 × (input_dim + hidden_dim) × hidden_dim + 4×hidden_dim` | –                                   | Used for sequence modeling. Parameters from gates (input, forget, output).               |
| **Softmax**                          | `(N,)`                     | `(N,)`                             | –                                                                                                   | –                                   | Converts logits into probabilities that sum to 1.                                        |

---

### ⚙️ **Quick Reference Notes**

* **Trainable Parameters:** learned through backprop (weights, biases, BN γ & β, embedding weights).
* **Non-Trainable Parameters:** updated during training but not learned via gradients (e.g. running mean/var in BatchNorm).
* **Activations:** Output of each layer (shape = Output shape).
* **Activation size:** product of all dimensions in Output shape.

---
