You're in a Machine Learning System Design interview at OpenAI. The interviewer sets a trap:

"We need to train a specialized CLIP model for medical imaging from scratch. You have a node of 8 A100s. What batch size do you configure?"

95% of candidates walk right into the trap.

The candidates pull out a calculator and optimizes for VRAM.

"Well, with a ViT-L backbone and high-res X-rays, a batch size of 64 per GPU is the safe limit to avoid OOM errors. So, a global batch size of 512."

It sounds like a competent engineering answer. They respected the hardware constraints. They avoided the crash.

They also just guaranteed the model will be useless.

In Supervised Learning (e.g., ResNet classifier), batch size is just a gradient estimation tool. Smaller batches are often fine (or even better for regularization).

But in 𝐂𝐨𝐧𝐭𝐫𝐚𝐬𝐭𝐢𝐯𝐞 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠 (𝐂𝐋𝐈𝐏), your batch size is your dataset.
- With a batch of N, you have N correct pairs (positives).
- But more importantly, you have N^2 - N incorrect pairs (negatives).

If N=64, your model only has to distinguish the correct X-ray from 63 random other X-rays. That is too easy. The model learns trivial features (e.g., "this image is bright") and converges instantly. It never learns the semantic nuance.

You need to explain that for CLIP, Batch Size ≠ Speed. Batch Size = Intelligence.

To force the model to learn robust features, it needs to distinguish the correct image from thousands of hard negatives in a single pass. The original CLIP paper didn't use massive batches just for speed; they did it because the loss function breaks down mathematically at small scales.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:
1️⃣ 𝘐𝘨𝘯𝘰𝘳𝘦 𝘝𝘙𝘈𝘔 𝘭𝘪𝘮𝘪𝘵𝘴: You cannot train effective CLIP on a single GPU's memory limit.
2️⃣ 𝘋𝘪𝘴𝘵𝘳𝘪𝘣𝘶𝘵𝘦𝘥 𝘕𝘦𝘨𝘢𝘵𝘪𝘷𝘦𝘴: Use torch.distributed.all_gather to collect embeddings from all GPUs before calculating the loss matrix.
3️⃣ 𝘛𝘢𝘳𝘨𝘦𝘵 𝘏𝘪𝘨𝘩 𝘕𝘶𝘮𝘣𝘦𝘳𝘴: You need a global effective batch size of 4,096 minimum. If you can't fit it, use techniques like Gradient Checkpointing or Gradient Caching to simulate the larger matrix.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝
"In Contrastive Learning, the batch size is a hyperparameter for model quality, not just hardware efficiency. If we can't hit 4k+ samples per step, we shouldn't start training."
