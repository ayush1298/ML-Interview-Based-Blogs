LoRA sounds simple:

1. Add low-rank matrices
2. Train with less memory
3. Get same results

Reality:
- Learning rate needs 10x adjustment
- Layer selection changes everything
- Batch size tolerance is different
The "low-regret regime" nobody talks about:

Most teams follow the original LoRA paper:

- Attention layers only
- Rank 64
- Same hyperparameters as full fine-tuning

Thinking Machines ran 1000+ experiments across 14 models.

Every single one of these is wrong.
Finding #1: Attention-only LoRA is leaving performance on the table.

They tested:
- Attention-only (rank 256)
- MLP-only (rank 128) 
- All layers (rank 256)

MLP-only matched all-layer performance.
Attention-only underperformed despite 2x the parameters.

Why?

The MLP/MoE layers contain most of your model's parameters.
When you skip them, you're ignoring the layers that dominate the empirical neural tangent kernel.
It's like trying to steer a ship by only touching the rudder.

Finding #2: Your learning rate is probably 10x too low.

Across every model tested (Llama 3, Qwen 3):
- Optimal FullFT LR: ~2e-5
- Optimal LoRA LR: ~2e-4

The 10x ratio held constant regardless of model size.

This isn't a bug. It's the math.
The 1/r scaling factor in LoRA makes optimal LR nearly independent of rank.

Weird consequence:
Learning curves for rank 1, 16, 64, 256 are IDENTICAL for the first ~100 steps.

We thought it was a bug. It's not. It's what the math predicts.


Finding #3: Batch size kills LoRA performance differently than FullFT.

At batch size 32: LoRA ≈ FullFT
At batch size 512: LoRA falls behind

The gap grows with batch size, independent of rank.

It's a property of the BA parametrization, not capacity.
But here's the good news:

When you get these 3 things right:
1. Train ALL layers (especially MLPs)
2. Use 10x higher learning rate
3. Keep batch sizes reasonable

LoRA matches full fine-tuning performance at 67% of the compute cost.

The "low-regret regime":

LoRA works when:
- LoRA parameters > dataset information content
- Applied to all layers
- Proper hyperparameters

For typical post-training:
- Instruction tuning: ✅
- Reasoning datasets: ✅ 
- RL with policy gradients: ✅ (even at rank 1!)
RL is especially interesting.

Policy gradient RL provides ~1 bit of information per episode.
Even rank-1 LoRA has 3M+ parameters for Llama-3.1-8B.

Result: LoRA matches FullFT for RL even at rank 1.

DeepSeek-R1's 5.3M episodes? Totally replicable with LoRA.
Practical takeaways:

Don't:
- Train attention-only
- Use FullFT learning rates
- Assume higher rank = better

Do:
- Train all layers (MLP + attention)
- 10x your learning rate
- Start with rank 256
- Keep batch sizes under 256


LoRA isn't "good enough."
Done right, it's equivalent.

Detail blog: https://thinkingmachines.ai/blog/lora/
