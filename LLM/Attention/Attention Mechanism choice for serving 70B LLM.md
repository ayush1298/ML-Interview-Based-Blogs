You're in a ML Systems interview at Google, and the interviewer asks:

"We're serving a 70B LLM. Inference latency is killing us. Walk me through attention mechanism choices."

Here's how you answer:

A. Most candidates know "GQA reduces memory." That's kindergarten-level.

B. There are 4 brutal truths that separate senior from junior engineers.

𝟭. 𝗧𝗵𝗲 𝗥𝗲𝗮𝗹 𝗕𝗼𝘁𝘁𝗹𝗲𝗻𝗲𝗰𝗸 - 𝗞𝗩 𝗖𝗮𝗰𝗵𝗲 𝗶𝘀 𝗬𝗼𝘂𝗿 𝗘𝗻𝗲𝗺𝘆

Llama-2-13B at FP16:

1.3 MB per token

At 4K context? 5.2 GB per sequence

Batch size 32? 166 GB just for KV cache

Decoding is memory-bandwidth bound, not compute-bound. You spend more time moving data than doing math.

𝟮. 𝗠𝘂𝗹𝘁𝗶-𝗛𝗲𝗮𝗱 𝗔𝘁𝘁𝗲𝗻𝘁𝗶𝗼𝗻 (𝗠𝗛𝗔) - 𝗧𝗵𝗲 𝗕𝗮𝘀𝗲𝗹𝗶𝗻𝗲

Each of n_heads gets independent K, V projections.

KV cache per token: 2 × n_heads × d_head

Perfect for training. Disaster for inference at scale.

𝟯. 𝗠𝘂𝗹𝘁𝗶-𝗤𝘂𝗲𝗿𝘆 𝗔𝘁𝘁𝗲𝗻𝘁𝗶𝗼𝗻 (𝗠𝗤𝗔) - 𝗧𝗼𝗼 𝗔𝗴𝗴𝗿𝗲𝘀𝘀𝗶𝘃𝗲

All query heads share ONE KV head.

KV cache: 2 × 1 × d_head (32× reduction for 32-head attention)

The problem: Single KV head = massive information bottleneck. Quality degrades on complex reasoning.

Never use in production.

𝟰. 𝗚𝗿𝗼𝘂𝗽𝗲𝗱 𝗤𝘂𝗲𝗿𝘆 𝗔𝘁𝘁𝗲𝗻𝘁𝗶𝗼𝗻 (𝗚𝗤𝗔) - 𝗧𝗵𝗲 𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗦𝘁𝗮𝗻𝗱𝗮𝗿𝗱

Why choose 1 or n_heads? Use n_groups heads.

Typical: 32 query heads → 8 KV heads (4 queries share 1 KV)

The win:

4× KV cache reduction vs MHA

95% quality retention

Llama 2/3, Mistral, Qwen2 all use GQA

Critical insight: GQA reduces memory bandwidth (moving data), NOT FLOPs (compute). Query matrix Q stays full size.

𝟱. 𝗠𝘂𝗹𝘁𝗶-𝗛𝗲𝗮𝗱 𝗟𝗮𝘁𝗲𝗻𝘁 𝗔𝘁𝘁𝗲𝗻𝘁𝗶𝗼𝗻 (𝗠𝗟𝗔) - 𝗧𝗵𝗲 𝗙𝘂𝘁𝘂𝗿𝗲

Don't store K and V. Store compressed latent.

C^KV = compress(input) // d_c << n_heads × d_head

Then: K, V = decompress(C^KV) at runtime

DeepSeek-V2: 93.3% KV cache reduction, 5.76× throughput boost

Why not everywhere?

Custom CUDA kernels required

Implementation complexity

Lower throughput in some scenarios despite cache savings

The Decision Matrix

Use MHA: Training, models <7B, contexts <2K

Use GQA: Production (90% of cases), 7B-70B+ models, proven at scale

Use MLA: Ultra-long contexts (128K+), training from scratch, bleeding edge

𝗠𝗶𝘀𝘁𝗮𝗸𝗲𝘀 𝗧𝗵𝗮𝘁 𝗚𝗲𝘁 𝗬𝗼𝘂 𝗥𝗲𝗷𝗲𝗰𝘁𝗲𝗱

❌ "GQA is faster because less memory" - Explain bandwidth vs compute bottleneck
❌ "MLA is always better" - Trade-offs: implementation complexity, lower throughput
❌ "Use MQA for speed" - Quality degradation unacceptable at scale

✅ Right answer: Identify bottleneck → Quantify KV cache → Choose based on model size, context length, quality needs, infrastructure

Final truth: Industry has spoken. GQA is production standard. MLA is future. MHA is training-only. MQA is a cautionary tale.

<img width="800" height="410" alt="image" src="https://github.com/user-attachments/assets/fc671ff3-af0b-4f34-8d1f-3196afc913b7" />
