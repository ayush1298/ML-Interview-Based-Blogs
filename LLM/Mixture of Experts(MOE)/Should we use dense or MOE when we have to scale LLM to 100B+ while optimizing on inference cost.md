3 weeks ago • Visible to anyone on or off LinkedIn

You're in a Machine Learning Architect interview at NVIDIA, and the interviewer asks:
"We need to scale our LLM to 100B+ parameters but keep inference costs reasonable. Should we use dense or Mixture of Experts architecture? Justify your choice."

Here's how you can answer:
A. Most candidates fumble here because they only know "MoE uses multiple experts." Incomplete answer.
B. There are 5 critical factors every ML architect should understand cold.

𝟭. 𝗧𝗵𝗲 𝗦𝗽𝗮𝗿𝘀𝗲 𝘃𝘀 𝗗𝗲𝗻𝘀𝗲 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳 - 𝗧𝗵𝗲 𝗳𝘂𝗻𝗱𝗮𝗺𝗲𝗻𝘁𝗮𝗹 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲
Dense models activate ALL parameters:
70B model = 70B active parameters every forward pass
Predictable but expensive
Sparse MoE activates only a SUBSET:
Mixtral 8x7B = 56B total, only 14B active per token
4x fewer FLOPs during inference
The brutal truth? MoE gives you 70B-class quality with 14B-class inference cost.

𝟮. 𝗧𝗵𝗲 𝗠𝗲𝗺𝗼𝗿𝘆 𝗥𝗲𝗮𝗹𝗶𝘁𝘆 - 𝗪𝗵𝗲𝗿𝗲 𝟵𝟬% 𝗼𝗳 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀 𝗴𝗼 𝘄𝗿𝗼𝗻𝗴
Most people think "MoE = less memory."
Wrong move.
You need to LOAD all experts:
Mixtral 8x7B needs ~95GB VRAM (not 14GB)
All 8 experts must be resident
Active parameters ≠ loaded parameters
Real deployment? You need MORE VRAM than dense models but FASTER inference.

𝟯. 𝗧𝗵𝗲 𝗥𝗼𝘂𝘁𝗶𝗻𝗴 𝗠𝗲𝗰𝗵𝗮𝗻𝗶𝘀𝗺 - 𝗧𝗵𝗲 𝗵𝗶𝗱𝗱𝗲𝗻 𝗰𝗼𝗺𝗽𝗹𝗲𝘅𝗶𝘁𝘆
Token Choice (Top-K):
 - Router selects K experts per token
 - Most common: K=2 (Mixtral, Deepseek)
 - Weighted combination of outputs
Expert Choice:
 - Experts select top N tokens
 - Fixed capacity per expert
 - Better load balancing
Soft MoE:
 - Weighted average of ALL experts
 - Better for vision models
 - Higher compute cost
The counterintuitive reality? Top-1 routing often matches Top-2 quality.

𝟰. 𝗧𝗵𝗲 𝗟𝗼𝗮𝗱 𝗕𝗮𝗹𝗮𝗻𝗰𝗶𝗻𝗴 𝗣𝗿𝗼𝗯𝗹𝗲𝗺 - 𝗪𝗵𝘆 𝘁𝗿𝗮𝗶𝗻𝗶𝗻𝗴 𝗶𝘀 𝘁𝗿𝗶𝗰𝗸𝘆
Without proper balancing:
Some experts get 80% of tokens
Other experts barely train
Routing collapse during training
Solution stack:
Auxiliary Loss: Penalizes uneven expert usage (weight: 0.01-0.1) Expert Capacity: Hard limit on tokens per expert Top-K with Noise: Prevents always picking same experts
Real production insight? Auxiliary loss weight is THE most important hyperparameter.

𝟱. 𝗧𝗵𝗲 𝗗𝗲𝗽𝗹𝗼𝘆𝗺𝗲𝗻𝘁 𝗖𝗼𝘀𝘁 - 𝗧𝗵𝗲 𝘁𝗿𝘂𝘁𝗵 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
Dense 70B: 50 tokens/sec throughput Mixtral 8x7B: 120 tokens/sec throughput
But here's the hidden cost:
Expert parallelism needs high-bandwidth interconnect
All-to-all communication patterns
2-3x network traffic vs dense models

𝗪𝗵𝗲𝗻 𝗠𝗼𝗘 𝘄𝗶𝗻𝘀:
✅ Throughput bottlenecked (not memory) 
✅ Need 70B+ quality on 20B budget 
✅ Diverse task distribution 
✅ Can afford larger VRAM

𝗪𝗵𝗲𝗻 𝗗𝗲𝗻𝘀𝗲 𝘄𝗶𝗻𝘀:
✅ Memory constrained deployments 
✅ Homogeneous workloads 
✅ Need predictable latency 
✅ Smaller models (<30B)
