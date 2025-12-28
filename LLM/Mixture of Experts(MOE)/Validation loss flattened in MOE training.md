You're in a Senior ML Engineer interview at Google DeepMind and the interviewer asks: 

"You have just launched a new Mixture of Experts (MoE) training run. After a few thousand steps, you check the logs and see the validation loss has flatlined. What is the 𝐦𝐨𝐬𝐭 𝐥𝐢𝐤𝐞𝐥𝐲 𝐜𝐚𝐮𝐬𝐞 specific to an MoE, and how do you fix it?"

Most candidates say: "My learning rate is too high," or "I have a bug in my data pipeline."

Wrong. Those are generic problems. They don't show you understand the 𝘶𝘯𝘪𝘲𝘶𝘦 failure mode of an MoE.

The reality? 𝐘𝐨𝐮𝐫 𝐫𝐨𝐮𝐭𝐞𝐫 𝐡𝐚𝐬 𝐜𝐨𝐥𝐥𝐚𝐩𝐬𝐞𝐝.

This is the classic MoE production trap. Here's what's 𝘳𝘦𝘢𝘭𝘭𝘺 happening:
- Early in training, the router "discovers" one or two experts that are slightly better than the others.
- It starts sending all the tokens to these "hero" experts.
- The other 62 experts get zero tokens. They become "dead" parameters - just sitting in VRAM, consuming memory, and learning nothing.
- You're paying the memory cost for a 500B model but getting the performance of a 50B one.

This isn't a team; it's a few overworked employees and a room full of people doing nothing.

𝐓𝐡𝐞 𝐟𝐢𝐱 𝐢𝐬 𝐭𝐡𝐞 𝐚𝐮𝐱𝐢𝐥𝐢𝐚𝐫𝐲 𝐛𝐚𝐥𝐚𝐧𝐜𝐢𝐧𝐠 𝐥𝐨𝐬𝐬.

This is the non-negotiable "tax" you must add to your main loss function. It’s a heuristic that explicitly penalizes the router for this imbalance.

It forces the router to spread the tokens around, even to "worse" experts, ensuring all experts are forced to learn and specialize. It's the key that prevents 𝐞𝐱𝐩𝐞𝐫𝐭 𝐬𝐭𝐚𝐫𝐯𝐚𝐭𝐢𝐨𝐧.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"The most likely cause is 𝐫𝐨𝐮𝐭𝐞𝐫 𝐜𝐨𝐥𝐥𝐚𝐩𝐬𝐞 leading to expert starvation. I'd immediately check the expert utilization metrics. The fix is to tune the coefficient of the auxiliary balancing loss to force a more even token distribution, even if it slightly hurts the main loss in the short term."
