**Quantization-Aware Training (QAT)** and **Mixed-Precision Training (MPT)** are *completely different techniques*, used for different goals.

Below is the clearest comparison:

---

# ✅ **1. Quantization-Aware Training (QAT)**

### **Goal:**

Reduce model size + speed up inference by using **8-bit (INT8) or 4-bit** weights/activations.

### **Idea:**

During training, the model **simulates** low-precision arithmetic (INT8 ops) so it can learn to tolerate quantization noise.

### **How it works:**

* Forward pass uses **fake quantization** (simulate INT8)
* Backward pass still uses full precision gradients
* After training → the model is fully quantized (INT8/FP8/4-bit)

### **Used for:**

✔ Deploying small, fast models
✔ Running on edge devices
✔ Minimizing accuracy drop after quantization

### **Precision levels:**

* **FP32 → INT8 / INT4**
* Activations and weights both quantized

---

# ✅ **2. Mixed-Precision Training (MPT)**

### **Goal:**

Speed up training + reduce GPU memory usage while maintaining accuracy.

### **Idea:**

Use **FP16/BF16 for most operations**
but keep critical values (like master weights) in FP32 to avoid instability.

### **How it works:**

* Forward: FP16/BF16
* Backward: FP16/BF16
* Optimizer: FP32 master weights
* Loss scaling is used to avoid underflow

### **Used for:**

✔ Training *large models* faster
✔ Reducing GPU memory
✔ Improving throughput

### **Precision levels:**

* **FP32 + FP16**
* **BF16 + FP32**
* NOT INT8/INT4
* NOT used for deployment compression

---

# ⚡ Key Differences (Interview-Ready)

| Feature             | Quantization-Aware Training (QAT)        | Mixed-Precision Training (MPT) |
| ------------------- | ---------------------------------------- | ------------------------------ |
| **Goal**            | Compress model for inference             | Speed up model training        |
| **Precision used**  | INT8 / INT4 (fake quant during training) | FP16 + FP32 / BF16 + FP32      |
| **Used for**        | Deployment                               | Training                       |
| **Accuracy impact** | Some loss if not done well               | Almost no loss                 |
| **Target**          | Weights + activations                    | Gradients + activations (FP16) |
| **Motivation**      | Smaller, faster runtime model            | Faster, cheaper training       |

---

# 🔥 Simple Analogy

### **Quantization-Aware Training (QAT)**

“Train the model to think in *8-bit* so it behaves well when deployed with small numbers.”

### **Mixed-Precision Training (MPT)**

“Train using *faster 16-bit arithmetic*, but keep backups in 32-bit to stay stable.”

---

More details on Mixed-Precision Training(MPT): 

Without loss scaling: 

<img width="878" height="280" alt="image" src="https://github.com/user-attachments/assets/abbb6ab2-eef1-4e02-b9ef-290ca4208bd8" />


With loss scaling: 

<img width="1102" height="242" alt="image" src="https://github.com/user-attachments/assets/544a8dfa-ee3f-40f3-912c-dac5d41a5440" />


---

# 🔥 **Mixed-Precision Training: Step-by-Step Explanation**

The idea:
👉 **Use FP16 for speed**, but
👉 **Keep a FP32 “master copy” of weights** to avoid accuracy loss.

Let’s go through the diagram piece-by-piece.

---

# ✅ **Step 1 — Start with Master Weights (FP32)**

The optimizer maintains **full precision (FP32) weights**.

These are the “real” weights used for updating.

```
Weights_master = FP32
```

---

# ✅ **Step 2 — Cast the FP32 Weights → FP16 (for Forward Pass)**

To speed up compute, we create a temporary **FP16 version** of the weights.

```
Weights_fp16 = cast(Weights_master → FP16)
```

These FP16 weights are what go into the forward pass.

---

# ✅ **Step 3 — Forward Pass (FP16 activations, FP16 weights)**

The forward pass runs **in FP16**:

```
Loss_fp32 = model_forward(inputs, Weights_fp16)
```

Even though activations + weights are FP16, the loss output is stored in **FP32** to avoid precision issues.

---

# ✅ **Step 4 — Loss Scaling (Critical Step)**

FP16 gradients can underflow (too small → become zero).
So before backprop, we **multiply the loss by a large number**, e.g. 1024.

```
Scaled_Loss = Loss_fp32 × scale_factor
```

This helps gradients stay numerically stable.

---

# ✅ **Step 5 — Backward Pass in FP16: Compute Scaled Gradients**

Backprop now computes **scaled gradients in FP16**.

```
Scaled_Gradients_fp16 = backward(Scaled_Loss)
```

---

# ✅ **Step 6 — Convert Scaled Gradients FP16 → FP32**

Before using them for weight updates, we cast gradients to FP32:

```
Scaled_Gradients_fp32 = cast(Scaled_Gradients_fp16 → FP32)
```

---

# ✅ **Step 7 — Unscale the Gradients (Remove Loss Scaling)**

Divide by the scaling factor:

```
Gradients_fp32 = Scaled_Gradients_fp32 / scale_factor
```

These are the **true FP32 gradients**.

---

# ✅ **Step 8 — Optimizer Step (FP32)**

Optimizer updates the **FP32 master weights**:

```
Weights_master = Weights_master - learning_rate × Gradients_fp32
```

This is why training stays stable:
✔ updates happen to FP32 weights
✔ gradients used are FP32
✔ computation was fast because forward/backward was FP16

---

# 🔁 **Cycle Repeats**

Next iteration:

* cast updated FP32 master weights → FP16
* do forward/backward in FP16
* update master FP32 weights

---

# 🎯 **Final Summary (Very Important)**

**FP32**

* master weights
* optimizer
* true gradients

**FP16/BF16**

* forward activations
* backward gradients (before unscaling)
* speed-critical operations

**Loss scaling** prevents FP16 gradient underflow.

Refer to article: https://medium.com/data-science/understanding-mixed-precision-training-4b246679c7c4
