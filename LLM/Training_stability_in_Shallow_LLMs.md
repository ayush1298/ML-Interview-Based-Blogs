🧩 The Problem Warm-up Solves

When training starts, gradients are unstable because:

The LayerNorm scales (in Post-Norm) distort gradient magnitudes layer by layer.

The optimizer’s learning rate is too large for the model’s randomly initialized weights.

Gradients can suddenly spike → exploding gradients
or vanish → training collapse.

So, the model needs a few steps to “find its footing” before applying full-strength updates.

⚙️ The Warm-up Trick (used in “Attention Is All You Need”)

The paper proposed a learning rate schedule with linear warm-up, then decay:

<img width="571" height="162" alt="image" src="https://github.com/user-attachments/assets/1dc964dc-fee3-4092-b002-6e8ee9ebd9f0" />


🔹 Phase 1: Linear Warm-up

Start with a tiny learning rate (e.g., 
1x(10^-7).

Gradually increase linearly for the first few thousand steps.

Purpose: Prevents big weight updates before the network’s internal scales (LayerNorm statistics, attention weights) stabilize.

This lets the model “ease in” to training.

🔹 Phase 2: Inverse Square Root Decay

After warm-up, the learning rate decays as 1/√t 

Keeps updates small and stable for long training runs.

Prevents oscillations after the model stabilizes.

🧠 Why It Helps Post-Norm Models

Remember, in Post-Norm, gradients are repeatedly rescaled by LayerNorm during backprop.
At initialization, these rescaling factors are unpredictable.
If you start with a high learning rate, even small gradient distortions blow up quickly.

Warm-up prevents that:

During early steps, gradients are small → weights adjust slowly → activations stabilize.

After the model reaches a “steady state” (activations have roughly consistent magnitudes), the normal LR can take over safely.

🧪 Example Schedule
| Step |	LR scaling |	Purpose |
| -------- | -------- | --------- |
| 0 → 4000 |	Linear ↑ from 0 → 1.0× |	Stabilize early training |
| 4000 → end |	Decay ∝ 1/√t |	Prevent late oscillations |

🧠 TL;DR Summary

In shallow Post-Norm Transformers (like the original 6-layer model), learning rate warm-up is used to avoid exploding gradients during the unstable early phase of training.
It linearly ramps up the learning rate for a few thousand steps, letting the model stabilize internal statistics before training at full speed.
For deep models, this is insufficient — they need Pre-Norm, which inherently stabilizes gradients by preserving the clean residual path.
