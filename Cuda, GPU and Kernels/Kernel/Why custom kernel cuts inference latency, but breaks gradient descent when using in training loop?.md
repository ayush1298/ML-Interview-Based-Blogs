You're in a Senior AI Engineer interview at Anthropic. The interviewer sets a trap:

"You wrote a custom, bare-metal CUDA Max Pooling operation that cuts inference latency by 40%. But when you drop it into the training loop, gradient descent completely breaks. Why?"

90% of candidates walk right into it.

Most candidates say: "It's a numerical stability issue. You probably aggressively quantized to FP16 or INT8 for the inference optimization, which caused underflow or vanishing gradients during the backward pass. You just need to upcast back to FP32 or BF16 for training."

Wrong. That is a patch for a completely different problem. They just failed.

-----
𝐓𝐡𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲: This isn't about precision, FLOPs, or floating-point math. It is about the fundamental physics of backpropagation.

Max Pooling is a non-differentiable routing operation, not a smooth mathematical equation.

In a standard 2x2 pool, you are aggressively destroying data by throwing away three numbers and keeping one.

If your hyper-optimized inference kernel only returns the final pooled values to minimize VRAM allocation and maximize memory bandwidth, it burns the bridge behind it.

When the backward pass arrives, the automatic differentiation engine has absolutely no idea which specific pixels in the input tensor actually produced those gradients.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To make a custom pooling operation trainable, you must completely rewrite the kernel to cache spatial metadata.

1️⃣ 𝘊𝘢𝘤𝘩𝘦 𝘵𝘩𝘦 𝘈𝘳𝘨𝘮𝘢𝘹: Your forward pass must explicitly allocate memory to store the index (the exact spatial coordinate) of every single winning max value.
2️⃣ 𝘙𝘰𝘶𝘵𝘦 𝘵𝘩𝘦 𝘌𝘳𝘳𝘰𝘳: During the backward pass, the gradient doesn’t magically distribute itself. It must be routed exclusively to the exact neuron that “won” the pooling operation.
3️⃣ 𝘡𝘦𝘳𝘰 𝘵𝘩𝘦 𝘓𝘰𝘴𝘦𝘳𝘴: The other neurons in that receptive field get a gradient of exactly zero. Without the cached indices mapping the forward pass, your framework cannot route these signals.
4️⃣ 𝘈𝘤𝘬𝘯𝘰𝘸𝘭𝘦𝘥𝘨𝘦 𝘵𝘩𝘦 𝘛𝘳𝘢𝘥𝘦-𝘰𝘧𝘧: Pure inference kernels are designed to immediately discard state to keep H100 SRAM clear. Training kernels are fundamentally stateful and require significantly higher memory bandwidth to preserve the computational graph.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"An inference-optimized Max Pooling kernel only outputs the max values to save memory, but a training-capable kernel must simultaneously compute and cache the argmax indices so the backward pass knows exactly where to route the non-zero gradients."
