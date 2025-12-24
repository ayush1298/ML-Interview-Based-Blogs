You're in an AI Engineer interview at OpenAI and the interviewer asks: 

"You've successfully fine-tuned a model with RL. It's now excellent at following instructions, but it's become 'dumber' at general knowledge and creative writing. What is this phenomenon called, and what specific term would you add to your loss function to prevent this?"

Don't say: "That's catastrophic forgetting. We can fix it with a lower learning rate or by mixing in more general-purpose SFT data."

This is a textbook answer that misses the real RL-specific problem. It's not just "forgetting", it's active over-optimization.

The reality is your model hasn't just "forgotten" its knowledge, it's actively learning to exploit the flaws in your reward model (RM).

This is the "𝐚𝐥𝐢𝐠𝐧𝐦𝐞𝐧𝐭 𝐭𝐚𝐱."

Your policy is chasing the reward signal so aggressively that it's diverging from the original, general-purpose model it started as. It's learning "hacks" to please the RM, sacrificing its underlying knowledge.

You don't just "remind" the model. You 𝘤𝘰𝘯𝘴𝘵𝘳𝘢𝘪𝘯 it.

The solution is to add a 𝐊𝐋 𝐝𝐢𝐯𝐞𝐫𝐠𝐞𝐧𝐜𝐞 𝐩𝐞𝐧𝐚𝐥𝐭𝐲 to your objective function.
- Your goal isn't just to 𝘮𝘢𝘹𝘪𝘮𝘪𝘻𝘦 𝘳𝘦𝘸𝘢𝘳𝘥.
- Your goal is to maximize reward while 𝘴𝘵𝘢𝘺𝘪𝘯𝘨 𝘤𝘭𝘰𝘴𝘦 𝘵𝘰 𝘺𝘰𝘶𝘳 𝘰𝘳𝘪𝘨𝘪𝘯𝘢𝘭 𝘱𝘰𝘭𝘪𝘤𝘺.

You keep a frozen reference model (let's call it π_ref, your original SFT model) and you penalize your new, active policy (π_θ) for becoming too different from it.

The new loss term is a "leash." It forces the model to find answers that both get a high reward AND are "stylistically" similar to how the original, smart model would have responded.

This is the core mechanic of PPO. You're not just optimizing for the reward; you're optimizing for reward minus a divergence penalty.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"This is the 𝐚𝐥𝐢𝐠𝐧𝐦𝐞𝐧𝐭 𝐭𝐚𝐱, a form of over-optimization where the policy diverges from the pre-trained model's capabilities to exploit the reward model. I would add a 𝐊𝐋 𝐝𝐢𝐯𝐞𝐫𝐠𝐞𝐧𝐜𝐞 𝐩𝐞𝐧𝐚𝐥𝐭𝐲 to the loss, calculated between the active policy and a frozen 𝘳𝘦𝘧𝘦𝘳𝘦𝘯𝘤𝘦 𝘮𝘰𝘥𝘦𝘭, to regularize the policy and preserve its general knowledge."
