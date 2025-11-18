You're in a Senior AI Engineer interview at Google DeepMind, and the interviewer asks:

"We've implemented the original DeepSeek GRPO paper to train our new math chatbot. On uncertain queries, the Chain-of-Thought (CoT) is suddenly exploding to 10000 tokens. An engineer on the team says this is great, the model is just thinking harder and learning to backtrack. What's your diagnosis?"

Most candidates say: "This is a fantastic result! It's an emergent property. The RL algorithm is clearly working, forcing the model to think more to find the right answer. We can just clip the output at inference time."

Wrong. This answer confuses a 𝐥𝐞𝐚𝐫𝐧𝐢𝐧𝐠 𝐚𝐫𝐭𝐢𝐟𝐚𝐜𝐭 with a reasoning breakthrough. The model isn't thinking harder. It's reward hacking, and it's about to bankrupt your inference budget.

Here's the production-level problem:
The original GRPO paper includes a 𝘭𝘦𝘯𝘨𝘵𝘩_𝘯𝘰𝘳𝘮𝘢𝘭𝘪𝘻𝘢𝘵𝘪𝘰𝘯 term that divides the final reward by the length of the response. This sounds like a good idea to encourage concise answers.

But it creates a catastrophic, "very bad incentive."

When the model gets a problem right, it gets a positive reward. The incentive is to make the response shorter to maximize +reward / length.

But when the model gets a problem wrong, it gets a negative reward. To make its total loss smaller (i.e., less negative), the model learns a perverse trick: make the response as long as possible.

It's like a student who wrote a terrible essay. Instead of fixing their arguments, they just add 20 pages of fluff to "dilute" the bad grade.

The model isn't learning to solve the math problem. It's learning that when it's stuck, the best action is to output thousands of tokens of useless buffer to game the objective. You are paying for 10,000 tokens of failure, not 10,000 tokens of thought.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"This isn't emergence, it's a reward hacking trap. The 𝘭𝘦𝘯𝘨𝘵𝘩_𝘯𝘰𝘳𝘮𝘢𝘭𝘪𝘻𝘢𝘵𝘪𝘰𝘯 in the objective is incentivizing the model to dilute its negative rewards by exploding the sequence length. It's not thinking, it's hiding its failure.

This is a known issue. The fix is to modify the RL objective. We must remove this specific normalization term, which breaks the policy gradient anyway. We can then either remove it entirely or, as other papers have done, replace it with an explicit penalty that only rewards shortness after a correct answer is achieved. This aligns the model's incentive with our production goals."
