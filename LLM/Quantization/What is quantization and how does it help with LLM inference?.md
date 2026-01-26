In one of my interviews for ML Engineer position, I was asked:

“What is quantization and how does it help with LLM inference?”

Here is how you can answer:

1. Understand the Basics

> Definition: Quantization reduces the precision of model weights and activations (e.g., from 32-bit floating point to 8-bit integers).
> Purpose: Decreases model size and memory usage, speeds up inference, and reduces computational costs.
> Trade-offs: May slightly impact accuracy but enables deployment on resource-constrained devices.

2. Types of Quantization

> Post-Training Quantization (PTQ): Apply quantization after model training without retraining. Simpler but may have more accuracy loss.
> Quantization-Aware Training (QAT): Train the model with quantization in mind, simulating low-precision during training. Better accuracy preservation but requires more effort.
> Dynamic vs Static: Dynamic quantization determines scale factors at runtime; static quantization calculates them beforehand.

3. Common Precision Levels

> FP32 (Full Precision): Standard 32-bit floating point, highest accuracy but largest size.
> FP16 (Half Precision): 16-bit floating point, reduces memory by 50% with minimal accuracy loss.
> INT8 (8-bit Integer): Reduces size by 75%, faster inference, widely supported by hardware accelerators.
> INT4/INT2: Extreme quantization for maximum compression, requires careful calibration.

4. Implementation Techniques

> Weight-Only Quantization: Quantize only weights, keep activations in higher precision. Good balance of performance and accuracy.
> Weight and Activation Quantization: Quantize both for maximum speedup but more complex calibration needed.
> Mixed Precision: Use different precision levels for different layers based on sensitivity analysis.

5. Tools and Frameworks

> Popular Libraries: GPTQ, AWQ, bitsandbytes, GGUF format for llama.cpp.
> Framework Support: PyTorch (torch.quantization), TensorFlow Lite, ONNX Runtime.
> Calibration: Use representative dataset to determine optimal scaling factors and minimize accuracy degradation.

These are the points you can keep in mind before framing your answer.
