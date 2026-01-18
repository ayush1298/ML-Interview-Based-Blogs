You're in a Senior Computer Vision interview at OpenAI. The interviewer sets a trap:

"We just deployed a CLIP model for zero-shot classification. We're feeding in raw class names like 𝘥𝘰𝘨 or 𝘱𝘭𝘢𝘯𝘦 as text prompts. The accuracy is shaky and the variance is high. Without retraining a single parameter, 𝐡𝐨𝐰 𝐝𝐨 𝐲𝐨𝐮 𝐟𝐢𝐱 𝐭𝐡𝐞 𝐬𝐭𝐚𝐛𝐢𝐥𝐢𝐭𝐲 𝐚𝐧𝐝 𝐛𝐨𝐨𝐬𝐭 𝐈𝐦𝐚𝐠𝐞𝐍𝐞𝐭 𝐚𝐜𝐜𝐮𝐫𝐚𝐜𝐲?"

90% of candidates walk right into the trap.

Most say: "Just change the prompt to 𝘈 𝘱𝘩𝘰𝘵𝘰 𝘰𝘧 𝘢 [𝘤𝘭𝘢𝘴𝘴]."

It's not wrong, it helps, but it reveals they treat 𝐅𝐨𝐮𝐧𝐝𝐚𝐭𝐢𝐨𝐧 𝐌𝐨𝐝𝐞𝐥𝐬 like magic black boxes rather than 𝘩𝘪𝘨𝘩-𝘥𝘪𝘮𝘦𝘯𝘴𝘪𝘰𝘯𝘢𝘭 𝘷𝘦𝘤𝘵𝘰𝘳 𝘴𝘱𝘢𝘤𝘦𝘴. They are betting your production metrics on a single point in latent space.

The Senior Engineer knows that in high-dimensional space, a single text embedding is noisy. 𝘋𝘰𝘨 could mean a pet, a hot dog, or a friend. Even 𝘈 𝘱𝘩𝘰𝘵𝘰 𝘰𝘧 𝘢 𝘥𝘰𝘨 is just one vector direction.

To pass this interview, you need to mention 𝐓𝐡𝐞 𝐂𝐞𝐧𝐭𝐫𝐨𝐢𝐝 𝐒𝐭𝐚𝐛𝐢𝐥𝐢𝐳𝐚𝐭𝐢𝐨𝐧 𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥.

We don't want the vector for a specific sentence. We want the mean vector that represents the concept itself, robust to linguistic noise.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:
1️⃣ 𝘎𝘦𝘯𝘦𝘳𝘢𝘵𝘦 𝘝𝘢𝘳𝘪𝘢𝘯𝘤𝘦: Don't create one prompt. Create 80+ distinct templates:
- "A photo of a {class}."
- "A sketch of a {class}."
- "A low-resolution image of a {class}."

2️⃣ 𝘉𝘢𝘵𝘤𝘩 𝘌𝘯𝘤𝘰𝘥𝘦: Run all 80 prompts through the Text Encoder to get 80 distinct vectors (N x D).

3️⃣ 𝘈𝘷𝘦𝘳𝘢𝘨𝘦: Calculate the mean of these vectors to find the "center of gravity" for that class concept.

4️⃣ 𝘕𝘰𝘳𝘮𝘢𝘭𝘪𝘻𝘦: Re-normalize the averaged vector to unit length.

By averaging the embeddings, you marginalize out the noise of specific phrasing (e.g., 𝘭𝘪𝘨𝘩𝘵𝘪𝘯𝘨, 𝘴𝘵𝘺𝘭𝘦, 𝘤𝘰𝘮𝘱𝘰𝘴𝘪𝘵𝘪𝘰𝘯) and isolate the semantic signal of the object itself.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"Single prompts are noisy estimates of a class. I would use 𝘗𝘳𝘰𝘮𝘱𝘵 𝘌𝘯𝘴𝘦𝘮𝘣𝘭𝘪𝘯𝘨: generate multiple prompt templates for each class, average their embeddings to approximate the true class centroid, and use that stable vector for the dot-product classification."
