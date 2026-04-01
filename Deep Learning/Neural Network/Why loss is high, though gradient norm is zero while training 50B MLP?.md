You're in a Senior ML Engineer interview at Google DeepMind. The interviewer sets a trap:

"You're training a massive 50-billion parameter MLP on a cluster of H100 GPUs. Your monitoring tool shows the gradient norm has hit absolute zero, but your loss is still unacceptably high. What just happened?"

95% of candidates walk right into it.

Most candidates immediately suggest: "We are stuck in a local minimum. We need to bump up the learning rate, add heavy momentum, or use cosine annealing to bounce out of the valley."

Wrong. They just failed the loop. That is a patch, not a solution.

-----
𝐓𝐡𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲:
In low-dimensional toy problems, like the cute 2D loss surfaces you plotted in your undergrad optimization class, a zero gradient with high loss is almost always a local minimum.

But in modern deep learning, you are operating in a 50-billion dimensional space.

Statistically, for a critical point to be a true local minimum, the loss surface must curve upwards in all 50 billion orthogonal directions simultaneously.

The probability of that happening is practically zero. You aren't in a local minimum. You are stuck on a high-dimensional saddle point.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:
To prove what is actually happening to your model's physics, you evaluate the eigenvalues of the Hessian matrix (the second derivative of the loss function).

1️⃣ If all eigenvalues are strictly positive, the matrix is positive definite. That's a true local minimum.

2️⃣ If all eigenvalues are negative, it's a local maximum.

3️⃣ If there is a mix of positive and negative eigenvalues, it is a saddle point.

In high-dimensional production models, almost every critical point with unacceptably high loss is a saddle point. Your gradient is zero because the surface is flat, but it still drops off in at least one orthogonal direction (the negative eigenvalue).

You don't need a chaotic learning rate spike that destabilizes your KV cache or blows up your gradients. You need targeted noise injection or a trusted adaptive optimizer (like AdamW) to naturally escape along the dimension of the negative eigenvalue.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

In high-dimensional parameter spaces, a zero gradient with high loss is almost guaranteed to be a saddle point, not a local minimum, which is mathematically proven by identifying mixed-sign eigenvalues in the Hessian matrix.
