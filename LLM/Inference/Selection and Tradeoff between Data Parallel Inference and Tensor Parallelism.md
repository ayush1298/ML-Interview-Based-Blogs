You’re in an ML Systems interview at NVIDIA. The interviewer asks:


“We need to serve a 70B model at scale. When do you choose 𝐃𝐚𝐭𝐚 𝐏𝐚𝐫𝐚𝐥𝐥𝐞𝐥 𝐈𝐧𝐟𝐞𝐫𝐞𝐧𝐜𝐞 (replicas) vs 𝐓𝐞𝐧𝐬𝐨𝐫/𝐏𝐢𝐩𝐞𝐥𝐢𝐧𝐞 𝐏𝐚𝐫𝐚𝐥𝐥𝐞𝐥 (shards), and what tradeoff are you managing?”

Don’t say: “Replicas for throughput, shards for memory.”

 That’s the what, not the why. The real bottleneck is communication vs compute locality during the forward pass.

Replicas (Data Parallel Inference): Full model per GPU, requests are routed to replicas. Communication during the forward pass is near-zero. Great when the model fits and you want maximum throughput and simple scaling.

Tensor/Pipeline Parallel (Sharded Inference): One request spans GPUs; every layer or stage requires communication. This is latency-sensitive and stresses NVLink/NVSwitch. You pick it when the model won’t fit or to reduce per-GPU memory, knowing you now pay per-token/per-layer comm costs.

Time-To-First-Token and tokens/sec hinge on that tradeoff:

If the model fits, replicas preserve locality → better TTFT and higher throughput.
If it doesn’t, shards restore fit but introduce fabric-bound latency; keep shards intra-node and use micro-batching, KV quantization, and continuous batching to claw back performance.

Answer that gets you hired:

 “The decision is about fit vs locality and the cost of communication. If the model fits, I use replicas to keep compute local and scale out requests. If it doesn’t, I shard (tensor/pipeline) but confine shards to fast interconnects and tune micro-batching, KV cache strategy, and batching policy to offset the communication overhead and protect TTFT and tokens/sec.”
