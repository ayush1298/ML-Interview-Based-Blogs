You're in a Senior AI Engineer interview at Meta and the interviewer asks:

"You're A/B testing two 70B models - one Multi-Head Attention (MHA), one Grouped Query Attention (GQA). Your colleague argues they'll have the same inference speed since FLOPs and parameter counts are identical. Is this assumption correct?"

Don't say: "Well, the FLOPs are similar, so maybe the GQA implementation has better kernel fusion or is just slightly more optimized..."

You just walked straight into the trap.

The reality is that inference is not 𝐜𝐨𝐦𝐩𝐮𝐭𝐞-𝐛𝐨𝐮𝐧𝐝; it is 𝐦𝐞𝐦𝐨𝐫𝐲-𝐛𝐨𝐮𝐧𝐝.

Your colleague is making a classic mistake: 𝘵𝘩𝘦𝘺'𝘳𝘦 𝘵𝘩𝘪𝘯𝘬𝘪𝘯𝘨 𝘢𝘣𝘰𝘶𝘵 𝘵𝘳𝘢𝘪𝘯𝘪𝘯𝘨, 𝘸𝘩𝘦𝘳𝘦 𝘺𝘰𝘶 𝘱𝘳𝘰𝘤𝘦𝘴𝘴 𝘭𝘢𝘳𝘨𝘦 𝘣𝘢𝘵𝘤𝘩𝘦𝘴 𝘢𝘯𝘥 𝘍𝘓𝘖𝘗𝘴 𝘢𝘳𝘦 𝘬𝘪𝘯𝘨.

𝐀𝐮𝐭𝐨-𝐫𝐞𝐠𝐫𝐞𝐬𝐬𝐢𝐯𝐞 𝐝𝐞𝐜𝐨𝐝𝐢𝐧𝐠 (generating text) is the complete opposite. It's a large matrix-vector operation, and the real bottleneck is the memory bandwidth required to read the KV Cache.

Here's the breakdown:
- For every single token you generate, the GPU must read the entire history of Keys (K) and Values (V) from high-bandwidth memory (HBM).
- 𝐌𝐇𝐀 (𝐌𝐮𝐥𝐭𝐢-𝐇𝐞𝐚𝐝 𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧): Has a Key and Value head for every Query head (e.g., 64 Q, 64 K, 64 V). This makes the KV Cache massive.
- 𝐆𝐐𝐀 (𝐆𝐫𝐨𝐮𝐩𝐞𝐝-𝐐𝐮𝐞𝐫𝐲 𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧): Shares K/V heads across groups of Query heads (e.g., 64 Q, but only 8 K and 8 V).

This is big approach.

GQA drastically shrinks the size of the KV Cache, often by 4-8x. A smaller cache means less data to read from HBM on every single step.

You're no longer saturating your memory bandwidth. This isn't a 5% optimization; it's the core reason Llama 2/3 and Mistral models are so fast.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"FLOPs are irrelevant here. Inference performance is dictated by memory bandwidth, and the primary bottleneck is the KV Cache. GQA is faster because it directly shrinks the cache size by reducing K/V heads, dramatically cutting HBM read pressure during decoding."
