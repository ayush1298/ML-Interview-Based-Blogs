You're in a Senior Computer Vision Engineer interview at Meta. The interviewer sets a trap:

"You're using a Max activation function across a set of feature maps. During backpropagation debugging, you notice that the vast majority of your weights in the preceding layer aren't updating at all. Why is this mathematically expected, and how does the engine handle exact ties?"

Most candidates say: "It sounds like a vanishing gradient problem or a dying ReLU issue. I would just bump up the learning rate, or switch to Average Pooling so the gradients can flow back to all the weights evenly."

Wrong. They just failed. That is a patch, not a solution.

-----
𝐓𝐡𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲:
The vanishing gradient is a completely different phenomenon. This is structural routing.

The max function acts as a hard switch.

The derivative of max(x) with respect to the input is exactly 1 for the maximum value, and exactly 0 for everything else.

If you run a 4x4 max pool, 15 out of 16 incoming connections receive a dead zero gradient by mathematical definition.

You aren't experiencing a bug, you are experiencing designed sparsity.

When junior devs blindly swap to Average Pooling, they destroy spatial invariance and dilute the signal, trading a perceived "bug" for severely degraded feature extraction.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: We need to understand the hardware physics and graph mechanics.

1️⃣ 𝐓𝐡𝐞 𝐌𝐚𝐭𝐡: The Jacobian of a max operation is a sparse vector containing a single 1. Backprop acts as a router, dropping the gradient payload strictly onto the winning index.

2️⃣ 𝐓𝐡𝐞 𝐓𝐢𝐞-𝐁𝐫𝐞𝐚𝐤𝐞𝐫: What happens on exact ties? Academic theory says you split the gradient evenly (e.g., 0.5 and 0.5).

3️⃣ 𝐓𝐡𝐞 𝐂𝐨𝐦𝐩𝐮𝐭𝐞 𝐏𝐡𝐲𝐬𝐢𝐜𝐬: In production on a cluster of H100s, splitting gradients across ties requires atomic operations, which absolutely crush memory bandwidth.

4️⃣ 𝐓𝐡𝐞 𝐇𝐚𝐫𝐝𝐰𝐚𝐫𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲: Frameworks like PyTorch and cuDNN CUDA kernels default to deterministic routing. They blindly assign the full gradient to the first maximal index encountered in memory to keep thread execution fast.

5️⃣ 𝐓𝐡𝐞 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞 𝐅𝐢𝐱: If extreme weight freezing is actually starving your model's capacity, you don't use Average Pooling. You use LogSumExp or SoftPool to create a differentiable, smooth approximation that leaks tiny gradients to the "losers" without destroying the max signal.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

Max pooling is a structural gradient router that mathematically starves non-maximum weights by design, and production CUDA kernels handle ties deterministically via the first index to avoid atomic memory collisions. If you need dense gradient flow, upgrade to a smooth max approximation instead of breaking your spatial hierarchy with an average pool.
