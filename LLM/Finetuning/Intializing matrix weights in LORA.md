You're in a Senior ML Engineer interview at Google DeepMind. The interviewer sets a quiet trap:

"You are implementing 𝐋𝐨𝐑𝐀 (𝐋𝐨𝐰-𝐑𝐚𝐧𝐤 𝐀𝐝𝐚𝐩𝐭𝐚𝐭𝐢𝐨𝐧) from scratch. How do you initialize the down-projection matrix A and the up-projection matrix B?"

90% of candidates walk right into a brick wall.

Most candidates reflexively answer: "I'd use standard deep learning best practices. 𝐗𝐚𝐯𝐢𝐞𝐫/𝐆𝐥𝐨𝐫𝐨𝐭 or 𝐊𝐚𝐢𝐦𝐢𝐧𝐠 initialization for both matrices to ensure stable variance and healthy gradients."

It feels like the safe, textbook answer.
In reality, you just broke the model before the first training step.

The candidate forgot what LoRA actually is. It isn't a new layer, it is a residual update.

The effective weight formula is:
W_new = W_frozen + (B x A)

If they initialize both A and B with random weights (𝘟𝘢𝘷𝘪𝘦𝘳/𝘒𝘢𝘪𝘮𝘪𝘯𝘨), their product (B x A) becomes a matrix of random noise.

At Step 0, they are adding this random noise directly to your carefully pre-trained 70B parameter weights. 

They aren't fine-tuning, they are lobotomizing the model's existing knowledge with a "cold start" shock. 

The loss starts high, and the model has to spend the first few epochs just un-learning your initialization.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To pass the interview, you need to prove you understand 𝐈𝐝𝐞𝐧𝐭𝐢𝐭𝐲 𝐏𝐫𝐞𝐬𝐞𝐫𝐯𝐚𝐭𝐢𝐨𝐧.

The correct approach is asymmetric initialization:
- 𝘐𝘯𝘪𝘵𝘪𝘢𝘭𝘪𝘻𝘦 𝘔𝘢𝘵𝘳𝘪𝘹 𝘈 (𝘋𝘰𝘸𝘯-𝘗𝘳𝘰𝘫𝘦𝘤𝘵𝘪𝘰𝘯): Use Random Gaussian. We need noise here to break symmetry and allow gradients to flow.
- 𝘐𝘯𝘪𝘵𝘪𝘢𝘭𝘪𝘻𝘦 𝘔𝘢𝘵𝘳𝘪𝘹 𝘉 (𝘜𝘱-𝘗𝘳𝘰𝘫𝘦𝘤𝘵𝘪𝘰𝘯): Use Exact Zeros.

Mathematically, because B is zero, the product (B x A) is Zero.

W_new = W_frozen + 0

At Step 0, your fine-tuned model is mathematically identical to the base model. You haven't degraded the pre-trained performance. As training begins, B slowly moves away from zero, introducing the adaptation gradually.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝
"We initialize the Up-projection to zero and the Down-projection to random. This ensures the adapter starts as an identity function, preserving the pre-trained weights at Step 0 while avoiding the gradient symmetry problem of setting both to zero."
