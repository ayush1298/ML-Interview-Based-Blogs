You're in an ML Engineer interview at Google and the interviewer asks:

"We need to serve our model for two different use cases: a low-latency chatbot that needs a fast 𝐓𝐢𝐦𝐞-𝐭𝐨-𝐅𝐢𝐫𝐬𝐭-𝐓𝐨𝐤𝐞𝐧 (𝐓𝐓𝐅𝐓), and a high-throughput batch summarization job. How do these two workloads stress the GPU differently, and what fundamental tradeoff are you managing?"

Don't say: "For the chatbot, I'd use a small batch size (like 1) for low latency. For the batch job, I'd use a large batch size for high throughput."

This is the classic answer. It's the 𝘸𝘩𝘢𝘵, not the 𝘸𝘩𝘺. It completely misses the underlying hardware bottleneck.

The reality is that LLM inference isn't one workload. It's two distinct phases with opposite performance profiles.

1. 𝐓𝐡𝐞 𝐏𝐫𝐞𝐟𝐢𝐥𝐥 𝐏𝐡𝐚𝐬𝐞 (𝐘𝐨𝐮𝐫 𝐂𝐡𝐚𝐭𝐛𝐨𝐭'𝐬 𝐓𝐓𝐅𝐓)
- This is processing the entire input prompt (e.g., 2,000 tokens) all at once.
- It's a massively parallel operation, full of large matrix multiplications.
- This phase is 𝐂𝐨𝐦𝐩𝐮𝐭𝐞-𝐁𝐨𝐮𝐧𝐝. It can actually saturate the GPU's tensor cores. Your chatbot's TTFT is almost 𝘦𝘯𝘵𝘪𝘳𝘦𝘭𝘺 dominated by this prefill speed.

2. 𝐓𝐡𝐞 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐨𝐧 𝐏𝐡𝐚𝐬𝐞 (𝐘𝐨𝐮𝐫 𝐁𝐚𝐭𝐜𝐡 𝐉𝐨𝐛'𝐬 𝐓𝐡𝐫𝐨𝐮𝐠𝐡𝐩𝐮𝐭)
- This is generating one token at a time, auto-regressively.
- For every single token, the GPU must read the entire, massive KV cache from high-bandwidth memory (HBM).
- This phase is Memory-Bandwidth-Bound. The GPU's compute units are starved, just sitting idle waiting for data.

Think of it this way: Prefill is a drag race (all compute, right now). Generation is a factory assembly line (your speed is limited by how fast you can move parts from the warehouse).

Your chatbot's latency is a 𝐜𝐨𝐦𝐩𝐮𝐭𝐞 𝐩𝐫𝐨𝐛𝐥𝐞𝐦.
Your batch job's throughput is a 𝐦𝐞𝐦𝐨𝐫𝐲 𝐛𝐚𝐧𝐝𝐰𝐢𝐝𝐭𝐡 𝐩𝐫𝐨𝐛𝐥𝐞𝐦.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"The core tradeoff is managing for two different bottlenecks. The chatbot's 𝐓𝐢𝐦𝐞-𝐭𝐨-𝐅𝐢𝐫𝐬𝐭-𝐓𝐨𝐤𝐞𝐧 is dominated by the 𝐜𝐨𝐦𝐩𝐮𝐭𝐞-𝐛𝐨𝐮𝐧𝐝 𝐩𝐫𝐞𝐟𝐢𝐥𝐥 phase. The batch job's throughput is limited by the 𝐦𝐞𝐦𝐨𝐫𝐲-𝐛𝐚𝐧𝐝𝐰𝐢𝐝𝐭𝐡-𝐛𝐨𝐮𝐧𝐝 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐨𝐧 phase. I'd optimize the prefill for the chatbot, but for the batch job, I'd focus on saturating memory bandwidth, likely with larger batches, to maximize token throughput."
