You're in a Senior ML Interview at Google DeepMind. The interviewer hands you a marker and sets the trap:

"We are training a 𝘛𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘦𝘳 from scratch using 𝘈𝘥𝘢𝘮. We set a constant Learning Rate of 1e-3. Predict the first 1000 steps."

90% of candidates walk right into the trap.

Most candidates say: "It converges. 𝘈𝘥𝘢𝘮 is an adaptive optimizer, it adjusts per-parameter learning rates automatically. 1e-3 is a standard default. It might be noisy at first, but the loss will go down."

The reality? Your loss curve doesn't just oscillate, it explodes. You hit NaNs within 50 steps. You just wasted a cluster run.

Here is the physics of why: 𝘛𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘦𝘳𝘴, unlike 𝘙𝘦𝘴𝘕𝘦𝘵𝘴, lack strong inductive biases at initialization. 
- At Step 0, the layers are completely misaligned.
- If you apply a full magnitude update (1e-3) on a randomly initialized Transformer, the gradients aren't just "large", they are structurally incoherent. 
- You push the parameters into a region of the loss landscape with such steep curvature that they can never recover.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To pass the interview, you need to reference The 𝐕𝐚𝐫𝐢𝐚𝐧𝐜𝐞 𝐄𝐱𝐩𝐥𝐨𝐬𝐢𝐨𝐧.

In the first few hundred steps of 𝘛𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘦𝘳 training, the gradient variance is effectively infinite. To fix this, you cannot use a constant LR. You must implement a 𝐋𝐢𝐧𝐞𝐚𝐫 𝐖𝐚𝐫𝐦-𝐮𝐩 𝐒𝐜𝐡𝐞𝐝𝐮𝐥𝐞.
- 𝘗𝘩𝘢𝘴𝘦 1 (𝘞𝘢𝘳𝘮-𝘶𝘱): Start LR at 0.0. Linearly increase it over the first ~4,000 steps. This allows the variance of the gradients to stabilize as the layers align.
- 𝘗𝘩𝘢𝘴𝘦 2 (𝘋𝘦𝘤𝘢𝘺): Once the "curvature" is stable, switch to an Inverse Square Root decay to converge.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Transformers don't tolerate high learning rates at initialization due to high gradient variance. I would implement a linear warm-up from 0 to d_model^(-0.5) to let the curvature stabilize, preventing early divergence before switching to the decay schedule."
