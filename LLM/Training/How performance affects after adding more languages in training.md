You're in a Senior ML Interview at Google DeepMind. The interviewer sets a trap:

"We have a 1B parameter Transformer that is SOTA on 10 languages. We wants to add 90 more languages to the training mix. What happens to our English benchmarks?"

90% of candidates walk right into the trap and say:

"It will improve! Adding 90 languages acts as massive data augmentation and regularization. The model learns universal grammar structures, so the original 10 languages will benefit from the transfer learning."

They just crashed the English production metrics. They aren't optimizing for 𝐆𝐞𝐧𝐞𝐫𝐚𝐥 𝐈𝐧𝐭𝐞𝐥𝐥𝐢𝐠𝐞𝐧𝐜𝐞, they are optimizing a zero-sum game of parameter allocation.

This is the 𝐂𝐮𝐫𝐬𝐞 𝐨𝐟 𝐌𝐮𝐥𝐭𝐢𝐥𝐢𝐧𝐠𝐮𝐚𝐥𝐢𝐭𝐲.

With a fixed budget (1B params), the per-language capacity C decreases as the number of languages N increases.

While low-resource languages (e.g., 𝘠𝘰𝘳𝘶𝘣𝘢) might see a boost from transfer, your high-resource languages (𝘌𝘯𝘨𝘭𝘪𝘴𝘩, 𝘍𝘳𝘦𝘯𝘤𝘩, 𝘊𝘩𝘪𝘯𝘦𝘴𝘦) are now fighting for space in the same weights. They get diluted. The loss curve for your most profitable markets will flatline or regress.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To solve this without 10x-ing your compute, you deploy 𝐓𝐡𝐞 𝐁𝐨𝐭𝐭𝐥𝐞𝐧𝐞𝐜𝐤 𝐈𝐧𝐣𝐞𝐜𝐭𝐢𝐨𝐧.

Instead of retraining the whole dense model or training 100 separate models:
1️⃣ Freeze the shared 1B parameter backbone (it handles the universal syntax).
2️⃣ Inject lightweight 𝐀𝐝𝐚𝐩𝐭𝐞𝐫 𝐌𝐨𝐝𝐮𝐥𝐞𝐬 for each language.

These are tiny bottleneck layers (Down-projection → ReLU → Up-projection) inserted between the frozen Transformer blocks.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Don't dilute the weights. Freeze the backbone for shared transfer, and use 𝐋𝐚𝐧𝐠𝐮𝐚𝐠𝐞-𝐒𝐩𝐞𝐜𝐢𝐟𝐢𝐜 𝐀𝐝𝐚𝐩𝐭𝐞𝐫𝐬 to reserve capacity for high-resource markets. We get the universal reach without the regression."
