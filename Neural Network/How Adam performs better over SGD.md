You're in a Senior ML Engineer interview at OpenAI and the interviewer asks:

"We're training a model on a massive vocabulary. Some critical domain terms appear only once every 10,000 documents. Why will standard SGD fail to learn weights for these rare features, and how does Adam specifically fix this?"

Most candidates say: "Adam is better because it uses momentum to converge faster." 

Too vague. They just described 90% of optimizers. They missed the core problem: 𝐒𝐩𝐚𝐫𝐬𝐢𝐭𝐲.

The reality is that SGD is 𝐟𝐫𝐞𝐪𝐮𝐞𝐧𝐜𝐲-𝐛𝐢𝐚𝐬𝐞𝐝.

In standard SGD, the parameter update is directly proportional to the gradient.
- 𝘙𝘢𝘳𝘦 𝘍𝘦𝘢𝘵𝘶𝘳𝘦 = 𝘙𝘢𝘳𝘦 𝘯𝘰𝘯-𝘻𝘦𝘳𝘰 𝘨𝘳𝘢𝘥𝘪𝘦𝘯𝘵.
- 𝘙𝘢𝘳𝘦 𝘎𝘳𝘢𝘥𝘪𝘦𝘯𝘵 = 𝘛𝘪𝘯𝘺, 𝘪𝘯𝘧𝘳𝘦𝘲𝘶𝘦𝘯𝘵 𝘶𝘱𝘥𝘢𝘵𝘦𝘴.

By the time the model has converged on frequent words (like "the", "is", "user"), the weights for your rare terms (like "heteroscedasticity") are still basically random initialization. They were drowned out.

𝐇𝐨𝐰 𝐀𝐝𝐚𝐦 𝐬𝐨𝐥𝐯𝐞𝐬 𝐭𝐡𝐢𝐬 (𝐕𝐚𝐫𝐢𝐚𝐧𝐜𝐞 𝐍𝐨𝐫𝐦𝐚𝐥𝐢𝐳𝐚𝐭𝐢𝐨𝐧):

Adam doesn't just track momentum (the mean), it tracks the variance (the uncentered variance vₜ) of the gradients.
1️⃣ For a rare feature, the gradient is almost always zero.
2️⃣ Therefore, the running average of the squared gradient (vₜ) becomes extremely small.
3️⃣ Adam's update rule divides by √vₜ.

𝐇𝐞𝐫𝐞 𝐢𝐬 𝐭𝐡𝐞 𝐦𝐚𝐠𝐢𝐜:  Dividing by a tiny number boosts the effective learning rate for that specific parameter.

Think of it like an equalizer in audio engineering: Adam automatically turns up the volume on the quiet, rare frequencies so they can be heard just as clearly as the loud, frequent ones.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"SGD fails because its updates are proportional to feature frequency. Adam uses adaptive learning rates via variance normalization. It scales updates inversely to the gradient magnitude, ensuring rare features get large enough updates to be learned despite their sparsity."
