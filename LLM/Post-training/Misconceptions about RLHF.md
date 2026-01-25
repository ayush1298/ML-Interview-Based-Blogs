Here are common misconception about RLHF!

train a policy model → train a critic model → optimize both together.

^ Reinforcement Learning for LLM does not work like this.

But policy optimization ≠ value estimation.

You don't need to learn a separate value function to get a good baseline.

Once you understand this, you can build RL systems that use 50% less memory and train without critic model collapse.

Here are 4 GRPO strategies that separate expensive RLHF from efficient RLHF:


1. Group Baselines Replace Value Models

PPO trains a 7B critic to estimate: "how good should this response be?"

GRPO samples N=4-8 responses per prompt and asks: "how good is this response compared to the others?"

The average reward of the group = your baseline. No critic needed.

For Llama 7B: 110GB → 55GB memory.


2. Advantages From Relative Ranking

Instead of complex GAE with a value function, GRPO does dead-simple normalization:
advantage = (reward - mean(group_rewards)) / std(group_rewards)
Responses above average get reinforced. Below average get penalized.
The model learns: "generate responses better than your current average."
This self-normalizing signal is more stable than critic predictions.

3. Direct KL Regularization

PPO adds per-token KL penalty to rewards (messy, complicates advantage calculation).

GRPO adds KL divergence directly to the loss:

```
loss = -advantage × log_prob + β × KL(policy || reference)
```

Cleaner math. Easier to tune. Same regularization effect.

One less thing to break during training.

4. Scales From Outcome to Process Rewards

> Outcome supervision: Score the final answer, set all token advantages = normalized_reward

> Process supervision: Score each reasoning step, sum future step rewards as advantage

Same GRPO framework handles both. No architecture changes.

Process rewards give finer-grained learning signals for complex reasoning.


DeepSeek trained 236B parameter models with GRPO on fewer GPUs than PPO would need.

Zero policy collapses. Stable hyperparameters. 50% memory reduction.

From GSM8K:
- DeepSeekMath-Instruct: 82.9%
- After GRPO: 88.2%

From MATH:
- DeepSeekMath-Instruct: 46.8% 
- After GRPO: 51.7%

All with simpler code, less memory, and no critic model headaches.

