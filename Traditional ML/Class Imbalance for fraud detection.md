You are in a Senior Machine Learning Interview at Google DeepMind. The interviewer sets a trap:

"We have a 1:1000 class imbalance for fraud detection. We applied 𝘤𝘭𝘢𝘴𝘴_𝘸𝘦𝘪𝘨𝘩𝘵𝘴 to the 𝐂𝐫𝐨𝐬𝐬-𝐄𝐧𝐭𝐫𝐨𝐩𝐲 loss, but the model is still missing the hard edge cases. What do we do?"

90% of candidates walk right into the wall.

Most candidates immediately suggest aggressive oversampling (𝘚𝘔𝘖𝘛𝘌) or tuning the class weights even higher (e.g., 1:5000).

They think: "If the minority class is ignored, I just need to scream louder (higher weights) during backprop."

------
𝐓𝐡𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲:
You aren't losing because the weights are wrong. You are losing because of 𝐆𝐫𝐚𝐝𝐢𝐞𝐧𝐭 𝐃𝐫𝐨𝐰𝐧𝐢𝐧𝐠.

Even with perfect class weights, your dataset likely contains 990,000 "easy" negatives (legitimate transactions that are obviously legit) and 1,000 "hard" positives.

In standard 𝐖𝐞𝐢𝐠𝐡𝐭𝐞𝐝 𝐂𝐫𝐨𝐬𝐬-𝐄𝐧𝐭𝐫𝐨𝐩𝐲 (𝐖𝐂𝐄), the gradients from those 990,000 easy examples, even if individually small, sum up to dominate the update step.
 
The model spends all its capacity optimizing examples it has already learned, drowning out the signal from the difficult, subtle fraud cases.

------
The Solution: 𝐓𝐡𝐞 𝐄𝐚𝐬𝐲-𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐒𝐮𝐩𝐩𝐫𝐞𝐬𝐬𝐢𝐨𝐧

You don't need to re-balance the counts. You need to re-balance the difficulty.
The solution is switching from 𝐖𝐞𝐢𝐠𝐡𝐭𝐞𝐝 𝐂𝐫𝐨𝐬𝐬-𝐄𝐧𝐭𝐫𝐨𝐩𝐲 to 𝐅𝐨𝐜𝐚𝐥 𝐋𝐨𝐬𝐬.

Focal Loss adds a modulating factor (1 − pₜ)ᵞ to the standard loss equation. 

Here is what happens in production:
- 𝘐𝘧 𝘵𝘩𝘦 𝘮𝘰𝘥𝘦𝘭 𝘪𝘴 𝘶𝘯𝘴𝘶𝘳𝘦 (𝘏𝘢𝘳𝘥 𝘌𝘹𝘢𝘮𝘱𝘭𝘦): The modulating factor stays near 1. The loss is unchanged. The model learns.
- 𝘐𝘧 𝘵𝘩𝘦 𝘮𝘰𝘥𝘦𝘭 𝘪𝘴 𝘤𝘰𝘯𝘧𝘪𝘥𝘦𝘯𝘵 (𝘌𝘢𝘴𝘺 𝘌𝘹𝘢𝘮𝘱𝘭𝘦): The factor drops to near 0. The loss contribution is effectively "shut off."

This forces the model to stop patting itself on the back for identifying the obvious negatives and focus 100% of its gradient descent budget on the edge cases.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"𝐖𝐞𝐢𝐠𝐡𝐭𝐞𝐝 𝐂𝐫𝐨𝐬𝐬-𝐄𝐧𝐭𝐫𝐨𝐩𝐲 solves for moderate imbalance (1:10) by balancing counts. 𝐅𝐨𝐜𝐚𝐥 𝐋𝐨𝐬𝐬 solves for extreme imbalance (1:1000+) by balancing hardness. In a fraud scenario, I would implement 𝐅𝐨𝐜𝐚𝐥 𝐋𝐨𝐬𝐬 with γ = 2 to down-weight the easy negatives that are currently dominating the gradient."
