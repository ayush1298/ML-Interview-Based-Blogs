Interviewer: "You need to quantize a model from FP16 to INT8. Walk me through how you'd do it without destroying quality."

Your answer: "I'll just convert all weights to INT8 format"

❌ Rejected.

Here's the critical mistake:

Don't say: "Quantization reduces precision" or "Use 8 bits instead of 16."
Too surface-level.
The real answer is the outlier feature problem.
INT8 quantization fails because 0.01% of activation values are 100× larger than the rest. Your quantization range is wasted on outliers.

You're compressing a skyscraper and a house with the same ruler.

Here's why naive quantization destroys quality:

FP16 weights → Scale to [-127, 127] → Store as INT8 → 2× memory reduction
Problem: Activation outliers exist at specific feature dimensions.

6,000 features: Normal distribution (-0.5 to +0.5)
144 features: Outliers (100× larger, -50 to +50)
Those 144 features control 90% of model quality.

The outlier math is brutal:

- Quantization range: [-127, 127] = 254 values
- One outlier at value=50: Forces scale = 50/127 = 0.39
- Normal value 0.3: Quantized to round(0.3/0.39) = 1
- Actual range used: 2 out of 254 values
- Precision loss: 99.2%

You're using a bathroom scale to weigh an ant and an elephant together.

Remember: Outliers are dimension-specific, not token-specific:

- Feature dim 2,145: Always outlier (±40 to ±60)
- Feature dim 891: Always normal (±0.2 to ±0.5)
- Pattern stable across ALL prompts, ALL batches
- Position-independent, dimension-dependent

This changes everything.

> Bad approach:
Single quantization scale per tensor
Convert all weights uniformly
Model perplexity: 12.3 → 2,847 (destroyed)

> Good approach (LLM.int8()):
Identify outlier feature dimensions (top 0.5%)
Keep outliers in FP16 (144 dims)
Quantize normal features to INT8 (5,856 dims)
Model perplexity: 12.3 → 12.6 (preserved)

The difference is mixed precision, not uniform precision.

Memory bandwidth bottleneck:

- FP16: Load 140GB from VRAM per forward pass
- INT8: Load 70GB from VRAM per forward pass
- Throughput: 1.8× higher
- Quality: 98% maintained

Cost reduction:

FP16: 70B model needs 4× A100 GPUs
INT8: 70B model fits 2× A100 GPUs
Cost: Cut in half
