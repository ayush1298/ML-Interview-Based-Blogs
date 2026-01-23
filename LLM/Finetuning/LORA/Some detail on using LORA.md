You're in a ML Engineer interview at Microsoft, and the interviewer asks:
"We're building fine-tuning infrastructure for 100+ customer models. Should we use LoRA or full fine-tuning? Justify your choice."

Here's how you can answer:
A. Most candidates fumble here because they only know "LoRA saves memory." Incomplete answer.
B. There are 5 critical factors every ML engineer should understand cold.

1. The Capacity Question - The make-or-break decision
LoRA works by decomposing weight updates: W' = W + γBA
Where B and A are low-rank matrices with FAR fewer parameters than W.
The brutal truth? LoRA underperforms when your dataset exceeds its capacity.
Rule of thumb: Neural networks store ~2 bits per parameter. Your 50K instruction dataset with 1 bit/token loss? You need enough LoRA parameters to absorb that information.

2. Which Layers Get LoRA? - Where 90% of engineers go wrong
Most people apply LoRA ONLY to attention layers (following the original paper).
Wrong move.
Recent experiments show attention-only LoRA underperforms even when you match parameter counts with higher rank.
The winner: Apply LoRA to ALL layers, especially MLP/MoE layers where most parameters live.
Example on Llama-3.1-8B:
MLP-only (rank 128): 0.24B params ✅
Attention-only (rank 256): 0.25B params ❌
Same parameter count. MLP-only wins. Why? Because training dynamics depend on where parameters are, not just how many.

3. The Batch Size Penalty - The hidden performance killer
Here's what separates junior from senior ML engineers:
LoRA degrades FASTER than full fine-tuning as batch size increases.
And it's independent of rank.
Rank-1, rank-256, rank-512... all show the same degradation pattern at large batches.

4. The Learning Rate Mystery - 10x faster, but why?
Optimal LoRA learning rate is consistently 10x higher than full fine-tuning.
Across ALL model sizes. 8B to 70B parameters. Llama, Qwen, doesn't matter.
Empirical fact: LoRA LR = 10 × FullFT LR
The kicker? We don't have a complete theoretical explanation for this 10x ratio.
The 1/r scaling factor makes optimal LR approximately rank-invariant (rank-1 and rank-512 use similar LRs). But the 10x boost over FullFT? Still an open question.


When LoRA matches full fine-tuning: 
✅ Applied to all layers (especially MLPs) 
✅ Rank × 2 bits/param > dataset information content 
✅ Reasonable batch sizes (<512) 
✅ LR properly tuned (10× FullFT optimal) 
✅ Training long enough (B matrix grows to match A scale)

When LoRA underperforms: 
❌ Attention-only 
❌ Dataset too large for capacity 
❌ Very large batches (1024+) 
❌ Wrong LR (using FullFT learning rate) 
❌ Short training with low LR

------------------------------------------------------ 

Further Details:

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
