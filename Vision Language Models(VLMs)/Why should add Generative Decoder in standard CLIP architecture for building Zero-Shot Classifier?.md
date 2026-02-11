You're in a Computer Vision interview at OpenAI. The interviewer sets a trap:

"We are building a 𝘡𝘦𝘳𝘰-𝘚𝘩𝘰𝘵 𝘊𝘭𝘢𝘴𝘴𝘪𝘧𝘪𝘦𝘳. We have the budget for a standard CLIP architecture. Why should we burn 25% more VRAM adding a 𝘎𝘦𝘯𝘦𝘳𝘢𝘵𝘪𝘷𝘦 𝘋𝘦𝘤𝘰𝘥𝘦𝘳 (𝘊𝘰𝘊𝘢) if we don't need to generate captions?"

90% of candidates walk right into it.

The candidates say: "You add the decoder for Multi-Task Learning. It allows the model to handle captioning tasks if business requirements change later."

The interviewer nods politely, makes a note, and the candidates never hear back. Why? Because they treated the architecture as a feature list, not a representation engine.

They aren't optimizing for 𝘷𝘦𝘳𝘴𝘢𝘵𝘪𝘭𝘪𝘵𝘺. They are optimizing for signal 𝘥𝘦𝘯𝘴𝘪𝘵𝘺.

𝘊𝘰𝘯𝘵𝘳𝘢𝘴𝘵𝘪𝘷𝘦 𝘓𝘰𝘴𝘴 (the mechanism behind CLIP) is inherently "lazy." It is a global "vibe check." To minimize loss, the model only needs to learn the minimum features necessary to distinguish a "Dog" from a "Table" in the current batch.

It discards fine-grained details, texture, exact count, spatial relation, because it doesn't need them to satisfy the contrastive objective.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: The real reason to add a decoder is to enforce 𝐓𝐡𝐞 “𝐆𝐫𝐚𝐧𝐮𝐥𝐚𝐫𝐢𝐭𝐲 𝐓𝐚𝐱”.

When you force the model to generate the caption token-by-token (e.g., "A fluffy cat sleeping on a red couch"), you impose a hard constraint on the Image Encoder.

- To predict “Red,” the encoder must preserve color data.
- To predict “Fluffy,” the encoder must preserve texture data.

The decoder acts as a strict auditor. It prevents the Image Encoder from discarding difficult features. This results in a significantly richer embedding space (~10% boost on ImageNet) even if you delete the decoder at inference time.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"Contrastive loss learns discriminative features (what makes X different from Y). Generative loss learns descriptive features (what makes X look like X). Combining them prevents the encoder from taking shortcuts."
