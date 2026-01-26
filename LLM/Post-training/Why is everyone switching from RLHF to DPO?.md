You’re in a Machine Learning interview at OpenAI, and the interviewer asks:

“Why is everyone switching from RLHF to DPO? Isn’t RLHF the proven approach?”

Here’s how you answer:

Don’t say: “DPO is simpler” or “RLHF is too complex.”

Too surface-level. The real answer is the reward model bottleneck. RLHF trains a separate reward model that becomes a noisy proxy for human preferences. DPO directly optimizes the policy on preference data. You’re eliminating the broken telephone.

Here’s why RLHF is fundamentally flawed:

Your training pipeline: Human preferences → Train reward model → Use RL to optimize policy against reward model.

Problem: The reward model is trained on limited data (10k-100k comparisons), but then used to generate 1M+ training signals. It’s overconfident on out-of-distribution outputs.

Reward model accuracy ≠ Alignment quality.

The RLHF failure modes are brutal:

> Reward hacking: Model finds adversarial outputs that score high but are gibberish
> Mode collapse: Policy degenerates to only generate “safe” high-reward outputs
> Reward model brittleness: 75% accuracy on test set → 100% confident predictions in RL
> Training instability: PPO hyperparameters require black magic to converge

You’re building a skyscraper on quicksand. One unstable component breaks everything.

The complexity comparison:

RLHF pipeline:

- SFT on demonstrations (1 week)
- Train reward model on preferences (2 days)
- PPO training against reward model (1-2 weeks, often fails)
- Extensive hyperparameter tuning (pray to the RL gods)

DPO pipeline:

- SFT on demonstrations (1 week)
- Train directly on preferences (2 days)

Done. No RL, no reward model.

RLHF: 3+ weeks, unstable. DPO: 9 days, stable.

The fundamental difference that matters:

RLHF objective:

> maximize E[reward_model(policy(x))] - β × KL(policy || base)
> Requires RL (PPO/REINFORCE)
> Reward model is separate neural net
> Unstable optimization landscape

DPO objective:

> maximize log(σ(β × log(π(y_w|x)/π(y_l|x)/π_ref)))
> Direct supervised learning on preferences
> No reward model needed
> Stable gradient descent

That eliminated reward model changes everything. No more broken telephone.

The performance gap that surprised everyone:

MT-Bench scores (GPT-4 as judge):

Llama 2 base: 4.2/10
Llama 2 + RLHF: 6.9/10
Llama 2 + DPO: 7.1/10

DPO beats RLHF despite being “just” supervised learning. The simplicity IS the feature.
