You are in a Senior Machine Learning Engineer interview at Google DeepMind and the interviewer asks:

"You just switched a 7B parameter training run from SGD to Adam to speed up convergence. The model size is identical, but the cluster immediately crashes with a 𝘊𝘜𝘋𝘈 𝘖𝘶𝘵-𝘖𝘧-𝘔𝘦𝘮𝘰𝘳𝘺 (𝘖𝘖𝘔) error. Why?"

🚫 Don't say:
"Adam is computationally more expensive so it uses more memory," or "I probably need to lower the batch size."

That's a junior guess. It ignores the mechanics of the optimizer.

The reality is that Adam isn't just an algorithm, it's a VRAM glutton. The candidates fell into the 𝐎𝐩𝐭𝐢𝐦𝐢𝐳𝐞𝐫 𝐒𝐭𝐚𝐭𝐞 𝐓𝐫𝐚𝐩.

Unlike SGD, which is stateless, Adam maintains two additional scalar states for every single parameter in your network to track the learning trajectory:
- 𝘔𝘰𝘮𝘦𝘯𝘵𝘶𝘮 (𝘍𝘪𝘳𝘴𝘵 𝘔𝘰𝘮𝘦𝘯𝘵)
- 𝘝𝘢𝘳𝘪𝘢𝘯𝘤𝘦 (𝘚𝘦𝘤𝘰𝘯𝘥 𝘔𝘰𝘮𝘦𝘯𝘵)

Here is the "3𝐱 𝐏𝐚𝐫𝐚𝐦𝐞𝐭𝐞𝐫 𝐑𝐮𝐥𝐞" strictly for memory planning:
- 𝘚𝘎𝘋: 𝘙𝘦𝘲𝘶𝘪𝘳𝘦𝘴 𝘔𝘦𝘮𝘰𝘳𝘺 ≈ 𝘞𝘦𝘪𝘨𝘩𝘵𝘴 + 𝘎𝘳𝘢𝘥𝘪𝘦𝘯𝘵𝘴.
- 𝘈𝘥𝘢𝘮: 𝘙𝘦𝘲𝘶𝘪𝘳𝘦𝘴 𝘔𝘦𝘮𝘰𝘳𝘺 ≈ 𝘞𝘦𝘪𝘨𝘩𝘵𝘴 + 𝘎𝘳𝘢𝘥𝘪𝘦𝘯𝘵𝘴 + 𝘔𝘰𝘮𝘦𝘯𝘵𝘶𝘮 + 𝘝𝘢𝘳𝘪𝘢𝘯𝘤𝘦.

For a 7B model in FP16 (2 bytes/param), your weights are ~14GB. But Adam demands an additional ~28GB just to store those optimizer states.

You didn't OOM because the model is too big. You OOM'd because you tripled your memory footprint without checking your hardware envelope.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:
If you are VRAM-constrained, you don't abandon Adam. You use PagedAdam from bitsandbytes to offload those massive optimizer states to system RAM (CPU), fetching them only when needed during the update step.

💡 𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:
"Adam imposes a 3x memory penalty compared to pure model weights due to stored momentum and variance states. To fix the OOM without losing convergence speed, I would implement PagedAdam to offload the optimizer states to CPU memory, or re-architect the cluster capacity to account for the 3x state overhead."

Quick follow-up: Ever wonder why Adam's states are FP32 by default in mixed-precision? It's for stability, FP16 can cause underflow in variance estimates. But if you're bold, try fused Adam variants in Apex for potential savings

If PagedAdam's too slow (paging overhead ~10-20% perf hit), go for ZeroRedundancyOptimizer in DeepSpeed. Shards states across GPUs, no CPU offload needed. Perfect for cluster-scale
