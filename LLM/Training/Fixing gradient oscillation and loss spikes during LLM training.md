You're in a Senior ML Interview at Meta. The interviewer sets a trap:

"You're training a 7B parameter Llama-style model. In the first 1000 steps, your gradients start oscillating wildly and the loss spikes. How do you fix it?"

90% of candidates walk right into the trap.

Most candidates immediately answer:
"I would significantly lower the learning rate or add more 𝘉𝘢𝘵𝘤𝘩 𝘕𝘰𝘳𝘮𝘢𝘭𝘪𝘻𝘢𝘵𝘪𝘰𝘯 𝘭𝘢𝘺𝘦𝘳𝘴."

It feels like the safe answer.

The interviewer checks a box marked "No Hire." Why? Because they just killed your training efficiency.

By "nuking" the learning rate (e.g., dropping from 3e-4 to 1e-5), they aren't solving the underlying geometry problem. They are just slowing the model's convergence to a crawl. They are wasting thousands of GPU hours to mask a symptom, not cure the disease.

The problem usually isn't that the direction of your gradient is wrong. The problem is that the step size is physically too large for the current curvature of the loss landscape.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: The Senior Engineer applies what I call The 𝐔𝐧𝐢𝐭 𝐂𝐥𝐢𝐩 𝐌𝐚𝐧𝐞𝐮𝐯𝐞𝐫.

Instead of touching the learning rate, you apply Gradient Clipping (specifically, clipping the Global L2 Norm to 1.0).

Here is the mechanical difference:
- 𝘓𝘰𝘸𝘦𝘳𝘪𝘯𝘨 𝘓𝘙: Shrinks the update vector indiscriminately.
- 𝘎𝘳𝘢𝘥𝘪𝘦𝘯𝘵 𝘊𝘭𝘪𝘱𝘱𝘪𝘯𝘨: Calculates the Norm (magnitude) of the gradient vector g. If ||g|| > 1.0, it rescales g to g/||g||.

This forces the gradient update to respect a maximum step size while strictly preserving the direction of the descent. You keep the velocity high where it's safe, but you install a "speed governor" for the cliffs where the gradients explode.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝
"I don't touch the learning rate yet. I apply Global Gradient Clipping (Norm = 1.0). This decouples the step size from the gradient magnitude, preventing exploding gradients without artificially stalling the model's convergence."
