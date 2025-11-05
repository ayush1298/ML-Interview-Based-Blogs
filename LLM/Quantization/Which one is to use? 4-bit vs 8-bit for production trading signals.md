You're in a GenAI Engineer interview at Goldman Sachs, and the interviewer asks:
"We need to deploy a 70B parameter LLM for production trading signals. Should we use 4-bit or 8-bit quantization? Justify your choice."
Here's how you can answer:
A. Most candidates fumble here because they only know "quantization reduces model size." Incomplete answer.
B. There are 5 critical factors every GenAI engineer should understand cold.

𝟭. 𝗧𝗵𝗲 𝗣𝗿𝗲𝗰𝗶𝘀𝗶𝗼𝗻-𝗣𝗲𝗿𝗳𝗼𝗿𝗺𝗮𝗻𝗰𝗲 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳 - 𝗧𝗵𝗲 𝗳𝘂𝗻𝗱𝗮𝗺𝗲𝗻𝘁𝗮𝗹 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲
8-bit (INT8) maintains near-IDENTICAL accuracy:
Performance degradation < 1% on most tasks
Uses linear quantization: Q = round(scale × W + zero_point)
4-bit (INT4/NF4) trades accuracy for efficiency:
Performance degradation 2-5% depending on the architecture
Uses non-linear quantization (NormalFloat4) to preserve distribution
The brutal truth? 8-bit is production-safe. 4-bit requires EXTENSIVE validation.

𝟮. 𝗧𝗵𝗲 𝗠𝗲𝗺𝗼𝗿𝘆 𝗙𝗼𝗼𝘁𝗽𝗿𝗶𝗻𝘁 - 𝗪𝗵𝗲𝗿𝗲 𝟵𝟬% 𝗼𝗳 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀 𝗴𝗼 𝘄𝗿𝗼𝗻𝗴
Most people think "4-bit = 2x smaller than 8-bit."
Wrong move.
FP32: 70B model = 280GB
INT8: 70B model = 70GB (4x compression)
INT4: 70B model = 35GB (8x compression)
But here's the catch - you STILL need overhead for KV cache, activations, and gradients.
Real-world 70B INT4 deployment? Needs 48-60GB minimum, not 35GB.

𝟯. 𝗧𝗵𝗲 𝗤𝘂𝗮𝗻𝘁𝗶𝘇𝗮𝘁𝗶𝗼𝗻 𝗠𝗲𝘁𝗵𝗼𝗱 - 𝗧𝗵𝗲 𝗵𝗶𝗱𝗱𝗲𝗻 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗸𝗶𝗹𝗹𝗲𝗿
Here's what separates junior from senior GenAI engineers:
Post-Training Quantization (PTQ):
Fast setup (hours)
Works reliably for 8-bit
4-bit quality varies wildly
GPTQ/AWQ (Advanced PTQ):
Weight-only quantization with calibration
Industry standard for 4-bit LLMs
Requires representative calibration dataset (CRITICAL)
QAT (Quantization-Aware Training):
Expensive compute (days to weeks)
Required for mission-critical 4-bit deployments

𝟰. 𝗧𝗵𝗲 𝗜𝗻𝗳𝗲𝗿𝗲𝗻𝗰𝗲 𝗦𝗽𝗲𝗲𝗱 𝗧𝗿𝗮𝗱𝗲 - 𝟱𝘅 𝘁𝗵𝗿𝗼𝘂𝗴𝗵𝗽𝘂𝘁, 𝗯𝘂𝘁 𝘄𝗵𝘆?
8-bit: Native GPU support (Tensor Cores)
Blazing fast matrix multiplication
1.5-2x throughput vs FP16
4-bit: Limited hardware support
Requires dequantization to FP16 for computation
Memory bandwidth bound, NOT compute bound
The counterintuitive reality? 4-bit isn't always faster despite being smaller.

𝟱. 𝗧𝗵𝗲 𝗗𝗲𝗽𝗹𝗼𝘆𝗺𝗲𝗻𝘁 𝗥𝗲𝗮𝗹𝗶𝘁𝘆 - 𝗧𝗵𝗲 𝗰𝗼𝘀𝘁 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
8-bit: A100 80GB fits 70B comfortably, batch size 8-16 supported
4-bit: RTX 4090 24GB runs 70B (barely), batch size 1-4 maximum

𝗪𝗵𝗲𝗻 𝟴-𝗯𝗶𝘁 𝘄𝗶𝗻𝘀:
✅ Accuracy non-negotiable (finance, healthcare)
✅ Production reliability > cost optimization
✅ Batch inference workloads
𝗪𝗵𝗲𝗻 𝟰-𝗯𝗶𝘁 𝘄𝗶𝗻𝘀:
✅ Extreme memory constraints
✅ Cost optimization critical
✅ Acceptable 2-5% quality degradation
✅ Using GPTQ/AWQ with proper calibration
