You're in a ML Engineer interview at Google and the interviewer asks: 

"Your team is struggling with training instability and exploding gradients in a new 100B+ model. The original 'Attention Is All You Need' paper used post-norm with learning rate warm-up. Why is that a bad idea for deep models, and what's the one simple architectural change that solves this?"

Most candidates say: "Post-norm is just less stable, so you need a learning rate warm-up to prevent the gradients from exploding at the start. The fix is to use pre-norm."

Too vague. You didn't explain the why. This answer won't get you the job.

𝐓𝐡𝐞 𝐈𝐧𝐬𝐢𝐠𝐡𝐭
The reality is that post-norm actively poisons the residual stream.
Think of the residual stream as a clean gradient "superhighway" running from the final layer all the way down to the embeddings. This clean, near-identity connection is the only reason we can train 100+ layer networks at all.

𝘛𝘩𝘦 𝘗𝘰𝘴𝘵-𝘕𝘰𝘳𝘮 𝘔𝘪𝘴𝘵𝘢𝘬𝘦 (𝘛𝘩𝘦 𝘗𝘳𝘰𝘣𝘭𝘦𝘮)
- Post-norm places a LayerNorm "toll booth" directly on the highway after each block's output is added.
- As the gradient signal travels back from layer 100, it gets warped, re-scaled, and distorted by a LayerNorm at every single stop.
- In a shallow network (like the original 6-layer Transformer), you can survive this with a careful learning rate warm-up, it's a band-aid to let the gradients stabilize.
- In a 100+ layer model, the signal is hopelessly attenuated or explodes. You're forcing the optimizer to fight the architecture.

𝘛𝘩𝘦 𝘗𝘳𝘦-𝘕𝘰𝘳𝘮 𝘚𝘰𝘭𝘶𝘵𝘪𝘰𝘯 (𝘛𝘩𝘦 𝘍𝘪𝘹)
- The fix is Pre-Norm.
- This simple change moves the LayerNorm off the highway and onto the "exit ramp" (i.e., the input to the MHA or FFN block).
- The main residual stream remains a clean, untouched identity path.
- Gradients flow unobstructed. Training is stable from the first step, and you can often use higher learning rates.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Post-norm breaks the clean identity path of the residual stream, leading to severe gradient attenuation or explosion in very deep models. Pre-norm solves this by normalizing the inputs to the sub-layers, not the residual connection itself. This preserves the 'gradient highway,' which is non-negotiable for stable training at scale."
