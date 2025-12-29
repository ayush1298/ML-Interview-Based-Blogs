You're in a Senior AI Engineer interview at Meta and the interviewer drops this on you:

"We need to switch to 𝐐𝐮𝐚𝐧𝐭𝐢𝐳𝐚𝐭𝐢𝐨𝐧 𝐀𝐰𝐚𝐫𝐞 𝐓𝐫𝐚𝐢𝐧𝐢𝐧𝐠 (𝐐𝐀𝐓) because post-training quantization is tanking our accuracy. But the rounding operation (Float -> Int8) is a step function with a derivative of zero. How do you actually backpropagate gradients through it to update the weights?"

90% of candidates walk right into the trap.

Most candidates immediately answer: "You can't backpropagate through a step function. It's non-differentiable, so the gradients vanish to zero."

Technically true, but useless. If they stop here, the interview is over. They have just explained why the model won't learn, not how to fix it.

The reality of QAT is that 𝘸𝘦 𝘩𝘢𝘷𝘦 𝘵𝘰 "𝘭𝘪𝘦" 𝘵𝘰 𝘵𝘩𝘦 𝘰𝘱𝘵𝘪𝘮𝘪𝘻𝘦𝘳.

If you use the actual derivative of the rounding function, your gradient is 0 everywhere (flat) or undefined (at the step). The signal dies immediately.

To fix this in production, we use the 𝐒𝐭𝐫𝐚𝐢𝐠𝐡𝐭 𝐓𝐡𝐫𝐨𝐮𝐠𝐡 𝐄𝐬𝐭𝐢𝐦𝐚𝐭𝐨𝐫 (𝐒𝐓𝐄).

Here is the mechanism you need to explain:
1️⃣ 𝘛𝘩𝘦 𝘍𝘰𝘳𝘸𝘢𝘳𝘥 𝘗𝘢𝘴𝘴 (𝘛𝘩𝘦 𝘛𝘳𝘶𝘵𝘩): We apply the quantization (rounding). The loss is calculated using the discrete, "snapped" values. This ensures the model feels the pain of quantization errors.
2️⃣ 𝘛𝘩𝘦 𝘉𝘢𝘤𝘬𝘸𝘢𝘳𝘥 𝘗𝘢𝘴𝘴 (𝘛𝘩𝘦 𝘓𝘪𝘦): When calculating gradients, we ignore the rounding function entirely. We approximate its derivative as the Identity Function (1).

Think of it like walking up a staircase:
- 𝘍𝘰𝘳𝘸𝘢𝘳𝘥: You step on the hard, discrete stairs.
- 𝘉𝘢𝘤𝘬𝘸𝘢𝘳𝘥: You pretend it was a smooth ramp so you can slide the gradient information back down without hitting a wall.

We accept a "𝘨𝘳𝘢𝘥𝘪𝘦𝘯𝘵 𝘮𝘪𝘴𝘮𝘢𝘵𝘤𝘩", the gradient doesn't perfectly match the forward operation, because a noisy gradient is infinitely better than a zero gradient.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"We decouple the passes. We use the quantized weights in the forward pass to simulate inference precision, but we apply the Straight Through Estimator in the backward pass, treating the rounding operation as an identity function to keep the gradients flowing to the learnable full-precision weights."
