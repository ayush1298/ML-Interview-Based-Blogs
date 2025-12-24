You're in a GenAI Engineer interview at NVIDIA, and the interviewer asks:
"We need to deploy a 70B parameter LLM for production inference. Should we use 4x A100 40GB or 1x H100 80GB? Justify your choice."
Here's how you can answer:
A. Most candidates fumble here because they only know "more GPUs = more power." Incomplete answer.
B. There are 5 critical factors every GenAI engineer should understand cold.

𝟭. 𝗧𝗵𝗲 𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗢𝘃𝗲𝗿𝗵𝗲𝗮𝗱 - 𝗧𝗵𝗲 𝗵𝗶𝗱𝗱𝗲𝗻 𝗽𝗲𝗿𝗳𝗼𝗿𝗺𝗮𝗻𝗰𝗲 𝗸𝗶𝗹𝗹𝗲𝗿
Single GPU: Zero communication overhead
Pure compute speed
No synchronization barriers
Multi-GPU: Inter-GPU communication becomes bottleneck
All-reduce operations on EVERY layer
The brutal truth? Multi-GPU adds 20-40% latency overhead for autoregressive generation.

𝟮. 𝗧𝗵𝗲 𝗣𝗮𝗿𝗮𝗹𝗹𝗲𝗹𝗶𝘇𝗮𝘁𝗶𝗼𝗻 𝗦𝘁𝗿𝗮𝘁𝗲𝗴𝘆 - 𝗪𝗵𝗲𝗿𝗲 𝟴𝟱% 𝗼𝗳 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀 𝗴𝗼 𝘄𝗿𝗼𝗻𝗴
Most people think "split model = split work equally."
Wrong move.
Tensor Parallelism (TP):
Splits individual layers across GPUs
Requires communication EVERY forward pass
Best for: Ultra-large models that don't fit on single GPU
Pipeline Parallelism (PP):
Splits layers sequentially across GPUs
Bubble overhead 10-30%
Best for: Training, not inference
The counterintuitive reality? For inference, you want MAXIMUM model parallelism, MINIMUM communication.

𝟯. 𝗧𝗵𝗲 𝗕𝗮𝘁𝗰𝗵 𝗦𝗶𝘇𝗲 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳 - 𝗧𝗵𝗲 𝗳𝘂𝗻𝗱𝗮𝗺𝗲𝗻𝘁𝗮𝗹 𝗲𝗰𝗼𝗻𝗼𝗺𝗶𝗰𝘀
Single GPU (H100 80GB):
Batch size: 4-8 for 70B model
Throughput: ~200 tokens/sec total
Latency: 50-80ms per token
Multi-GPU (4x A100 40GB):
Batch size: 16-32 theoretically
Throughput: ~280 tokens/sec total
Latency: 70-120ms per token
But here's the catch - higher batch size only helps if you HAVE that many concurrent requests.
Real-world API serving? Avg concurrent requests = 2-6, not 32.

𝟰. 𝗧𝗵𝗲 𝗠𝗲𝗺𝗼𝗿𝘆 𝗕𝗮𝗻𝗱𝘄𝗶𝗱𝘁𝗵 𝗥𝗲𝗮𝗹𝗶𝘁𝘆 - 𝗪𝗵𝘆 𝗻𝗲𝘄𝗲𝗿 ≠ 𝗯𝗲𝘁𝘁𝗲𝗿 𝗮𝗹𝘄𝗮𝘆𝘀
H100 80GB:
Memory bandwidth: 3.35 TB/s (HBM3)
Single point of failure
4x A100 40GB:
Memory bandwidth: 6.4 TB/s combined (4 × 1.6 TB/s)
Redundancy built-in
Multi-GPU bandwidth is NOT additive for sequential operations.
LLM inference is memory-bound, NOT compute-bound. You're reading weights, not multiplying.

𝟱. 𝗧𝗵𝗲 𝗙𝗮𝗶𝗹𝘂𝗿𝗲 𝗠𝗼𝗱𝗲 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳 - 𝗧𝗵𝗲 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗿𝗲𝗮𝗹𝗶𝘁𝘆 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
Single GPU: 1 GPU fails = 100% downtime
Multi-GPU: 1 GPU fails = 100% downtime (model split across all GPUs)
Wait, what?
Unless you implement replica groups, multi-GPU gives you ZERO fault tolerance.

𝗪𝗵𝗲𝗻 𝗦𝗶𝗻𝗴𝗹𝗲 𝗚𝗣𝗨 𝘄𝗶𝗻𝘀:
✅ Low latency critical (real-time applications) 
✅ Low concurrent request volume (<10) 
✅ Simplicity > raw throughput 
✅ Newer GPU architecture available

𝗪𝗵𝗲𝗻 𝗠𝘂𝗹𝘁𝗶-𝗚𝗣𝗨 𝘄𝗶𝗻𝘀:
✅ High throughput workloads (batch processing) 
✅ Model too large for single GPU 
✅ High concurrent request volume (>20) 
✅ Cost per token > latency optimization
