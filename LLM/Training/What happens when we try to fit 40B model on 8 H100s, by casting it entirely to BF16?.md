You're in a Senior AI Engineer interview at Meta. The interviewer sets a trap: 

"You're trying to fit a 40B parameter model on 8 H100s. To save memory, you cast the entire model and optimizer state to BF16. Your training instantly diverges. What critical mixed-precision rule did you just violate, and why?"

95% of candidates walk right into it.

Most candidates say: "BF16 doesn't have enough dynamic range. You should have used FP16 instead, or maybe your learning rate is just too high for half-precision training. I would clip the gradients and try again."

Wrong. They just failed. Gradient clipping won't save you from fundamental numerical collapse.

𝐓𝐡𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲: The dynamic range of BF16 is actually identical to FP32, so underflow or overflow is not the issue here.

The trap is that the candidate cast the 𝘰𝘱𝘵𝘪𝘮𝘪𝘻𝘦𝘳 𝘴𝘵𝘢𝘵𝘦 𝘢𝘯𝘥 𝘮𝘢𝘴𝘵𝘦𝘳 𝘸𝘦𝘪𝘨𝘩𝘵𝘴 𝘥𝘰𝘸𝘯 to 16-bit precision.

In deep learning, weight updates ( wₜ₊₁ = wₜ − η∇L ) are often tiny compared to the magnitude of the weights themselves.

BF16 achieves its massive dynamic range by sacrificing fractional bits - it has very low resolution.

If you store your master parameters and optimizer momentum in BF16, when you try to add a very small gradient update to a relatively large weight, the update gets entirely rounded off to zero.

Your model isn't learning, it's accumulating numerical garbage.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:
Production-grade mixed-precision training requires a strict division of labor between your data types.

1️⃣ 𝘔𝘢𝘴𝘵𝘦𝘳 𝘞𝘦𝘪𝘨𝘩𝘵𝘴 𝘪𝘯 𝘍𝘗32: Keep a pristine, high-precision copy of your parameters in float32. This ensures you can accurately accumulate tiny gradient updates over thousands of steps without rounding errors.

2️⃣ 𝘖𝘱𝘵𝘪𝘮𝘪𝘻𝘦𝘳 𝘚𝘵𝘢𝘵𝘦𝘴 𝘪𝘯 𝘍𝘗32: AdamW tracks first and second moments (momentum and variance). These running averages require full 32-bit precision to remain mathematically sound.

3️⃣ 𝘍𝘰𝘳𝘸𝘢𝘳𝘥/𝘉𝘢𝘤𝘬𝘸𝘢𝘳𝘥 𝘪𝘯 𝘉𝘍16: Downcast the weights to BF16 only for the actual matrix multiplications.

This transient casting gives you the massive Tensor Core speedup and VRAM reduction during the compute-heavy phases.

The FP32 master weights act as a stable anchor, updated cleanly at the end of the step.

-----
𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"BF16 is for transient compute, not state. You cast the forward and backward passes to BF16 for throughput, but you must keep master weights and optimizer states in FP32 to prevent tiny gradient updates from being rounded to zero."
