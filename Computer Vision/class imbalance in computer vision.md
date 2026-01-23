You're in a Senior ML Interview at OpenAI. The interviewer sets a trap:

"We have 50 000 images of 'city streets' but only 45 images of 'deer at night.' How do we fix this 𝐂𝐥𝐚𝐬𝐬 𝐈𝐦𝐛𝐚𝐥𝐚𝐧𝐜𝐞 to prevent the model from ignoring the deer?"

90% of candidates walk right into the trap.

They say "I will ramp up the data augmentation pipeline." Then they start listing standard 𝘵𝘰𝘳𝘤𝘩𝘷𝘪𝘴𝘪𝘰𝘯 transforms: 𝘙𝘢𝘯𝘥𝘰𝘮𝘏𝘰𝘳𝘪𝘻𝘰𝘯𝘵𝘢𝘭𝘍𝘭𝘪𝘱, 𝘙𝘢𝘯𝘥𝘰𝘮𝘙𝘰𝘵𝘢𝘵𝘪𝘰𝘯(30), 𝘊𝘰𝘭𝘰𝘳𝘑𝘪𝘵𝘵𝘦𝘳, and maybe 𝘔𝘰𝘴𝘢𝘪𝘤 𝘢𝘶𝘨𝘮𝘦𝘯𝘵𝘢𝘵𝘪𝘰𝘯.

It feels like the correct, robust MLOps answer.

The interviewer nods, notes "You just trained the model to recognize those same 45 deer upside-down and slightly greener." and moves on.

Here is the failure mode: 𝘚𝘵𝘢𝘯𝘥𝘢𝘳𝘥 𝘨𝘦𝘰𝘮𝘦𝘵𝘳𝘪𝘤 𝘱𝘦𝘳𝘵𝘶𝘳𝘣𝘢𝘵𝘪𝘰𝘯𝘴 𝘱𝘳𝘰𝘷𝘪𝘥𝘦 𝘐𝘯𝘷𝘢𝘳𝘪𝘢𝘯𝘤𝘦, 𝘯𝘰𝘵 𝘋𝘪𝘷𝘦𝘳𝘴𝘪𝘵𝘺.

A rotated deer is still the exact same instance of a deer. The candidates aren't adding new high-level semantic information (fur patterns, body shapes, poses). They are just adding noise to the existing low-level pixels.

They cannot augment their way out of a semantic deficit with geometric tricks.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To pass, you need to propose 𝐒𝐞𝐦𝐚𝐧𝐭𝐢𝐜 𝐒𝐲𝐧𝐭𝐡𝐞𝐬𝐢𝐬.

Instead of manipulating the pixels, you manipulate the latent space.

1️⃣ 𝘛𝘩𝘦 𝘗𝘪𝘱𝘦𝘭𝘪𝘯𝘦: Use a conditional generative model (like Stable Diffusion or a fine-tuned LoRA) in an Image-to-Image workflow.
2️⃣ 𝘛𝘩𝘦 𝘔𝘦𝘵𝘩𝘰𝘥: Take your abundant "empty street at night" images. Use the generative model to "inpaint" or synthesize deer into those existing, real-world lighting contexts.
3️⃣ 𝘛𝘩𝘦 𝘙𝘦𝘴𝘶𝘭𝘵: You aren't just rotating a deer; you are creating new deer. New poses, new interactions with shadows, and new occlusions that never existed in the training set.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"Geometric augmentation solves for robust features (noise tolerance). Generative synthesis solves for distribution shifts (semantic gaps). In a data-starved regime, we need synthesis, not just rotation."
