You're in a Senior ML Interview at OpenAI. The interviewer sets a trap:

"Our LoRA fine-tuning isn't capturing the domain complexity. We increased the rank 𝐫 from 8 to 256 to give the model more capacity. But the loss curve flatlined. Why?"

90% of candidates walk right into it.

They say: "It's overfitting. Rank 256 is too high for a 𝘓𝘰𝘸-𝘙𝘢𝘯𝘬 adaptation. The model is just memorizing noise, so we should reduce r back to 16 or 32."

-----
𝐓𝐡𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲: They aren't overfitting. You are suffocating the model.

In standard LoRA, the weight updates are scaled by a factor of α/𝐫 . This works fine when r is small (8 or 16).

But as you scale 𝐫 to 256, that denominator gets massive. You are mathematically forcing your gradient updates toward zero. You added millions of parameters, but you prevented them from learning anything.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: You have encountered the 𝐕𝐚𝐧𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐝𝐚𝐭𝐞 𝐏𝐚𝐫𝐚𝐝𝐨𝐱.

To fix this, you don't need less rank. You need 𝐑𝐚𝐧𝐤-𝐒𝐭𝐚𝐛𝐢𝐥𝐢𝐳𝐞𝐝 𝐋𝐨𝐑𝐀 (𝐫𝐬𝐋𝐨𝐑𝐀).
- 𝘚𝘵𝘢𝘯𝘥𝘢𝘳𝘥 𝘓𝘰𝘙𝘈: Scales updates by α/r. As r grows, updates shrink.
- 𝘳𝘴𝘓𝘰𝘙𝘈: Scales updates by α/sqrt(r).

This simple square root change stabilizes the gradient norms across all rank sizes. It allows the adapter to actually utilize the extra capacity at r=256, often matching the performance of full fine-tuning.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Standard LoRA scaling penalizes high ranks. I would switch to rsLoRA to correct the gradient collapse. This lets us scale r indefinitely to capture domain complexity without stalling convergence."
