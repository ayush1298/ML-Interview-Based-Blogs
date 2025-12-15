You are in a Senior Machine Learning interview at OpenAI. The interviewer sets a quiet trap:

"We implemented a custom Dropout layer from scratch. How do you handle it during inference?"

90% of candidates walk right into the trap.

Most candidates immediately answer: "Simple. You just turn off the random masking. We need deterministic results in production, so we use all the weights as they are."

It feels intuitive. It's also catastrophic.

If they answer this way, their model’s predictions in production will be garbage.

Why? 𝐌𝐚𝐠𝐧𝐢𝐭𝐮𝐝𝐞 𝐌𝐢𝐬𝐦𝐚𝐭𝐜𝐡.

During training, if they drop 50% of their neurons (p=0.5), the next layer learns to expect a signal sum based on only half the active inputs.

If they suddenly turn all the neurons on during inference without adjustment, the total input to the next layer doubles. Their activations explode, pushing their neurons into saturation (if using Tanh/Sigmoid) or blowing up their logits (if using ReLU), causing numerical instability.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To fix this, you must solve 𝐓𝐡𝐞 𝐄𝐱𝐩𝐞𝐜𝐭𝐚𝐭𝐢𝐨𝐧 𝐆𝐚𝐩.

You cannot just "turn it off." You have to preserve the expected magnitude of the signal. You have two architectural choices:
- 𝘐𝘯𝘧𝘦𝘳𝘦𝘯𝘤𝘦 𝘚𝘤𝘢𝘭𝘪𝘯𝘨 (𝘛𝘩𝘦 𝘖𝘭𝘥 𝘞𝘢𝘺): At test time, multiply all outgoing weights by p. If you kept 50% of neurons during training, you scale outputs by 0.5 to match the training magnitude.
- 𝘐𝘯𝘷𝘦𝘳𝘵𝘦𝘥 𝘋𝘳𝘰𝘱𝘰𝘶𝘵 (𝘛𝘩𝘦 𝘗𝘳𝘰𝘥𝘶𝘤𝘵𝘪𝘰𝘯 𝘞𝘢𝘺): You scale the activations by 1/(1-p) during training. This artificially boosts the signal during the training pass so that it matches the "full" network magnitude.

Senior Engineers prefer Method #2 because it leaves the inference path clean, stateless, and unburdened by extra computation.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝
"I use 𝐈𝐧𝐯𝐞𝐫𝐭𝐞𝐝 𝐃𝐫𝐨𝐩𝐨𝐮𝐭. By scaling activations by 1/(1-p) during the training phase, I ensure the expected magnitude remains consistent. This allows me to simply remove the mask during inference without touching the weights or risking numerical instability."
