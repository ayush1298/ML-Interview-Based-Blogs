You're in a GenAI Engineer interview at NVIDIA, and the interviewer asks:
"We're deploying a 13B parameter. Should we use FP16 or BF16? Justify your choice."

Here's how you can answer:
A. Most candidates say "BF16 is better for training, FP16 for inference." Superficial answer.
B. There are 4 critical factors every GenAI engineer should understand cold.

𝟭. 𝗧𝗵𝗲 𝗡𝘂𝗺𝗲𝗿𝗶𝗰𝗮𝗹 𝗥𝗲𝗽𝗿𝗲𝘀𝗲𝗻𝘁𝗮𝘁𝗶𝗼𝗻 - 𝗧𝗵𝗲 𝗳𝘂𝗻𝗱𝗮𝗺𝗲𝗻𝘁𝗮𝗹 𝗮𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲
FP16 (Half Precision):

1 sign bit, 5 exponent bits, 10 mantissa bits
Range: ±65,504 (narrow dynamic range)
Precision: ~3 decimal digits

BF16 (Brain Float 16):

1 sign bit, 8 exponent bits, 7 mantissa bits
Range: ±3.4 × 10³⁸ (SAME as FP32)
Precision: ~2 decimal digits

The brutal truth? FP16 gives better precision. BF16 gives better range.

𝟮. 𝗧𝗵𝗲 𝗢𝘃𝗲𝗿𝗳𝗹𝗼𝘄/𝗨𝗻𝗱𝗲𝗿𝗳𝗹𝗼𝘄 𝗥𝗶𝘀𝗸 - 𝗪𝗵𝗲𝗿𝗲 𝟴𝟱% 𝗼𝗳 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀 𝗴𝗲𝘁 𝗯𝘂𝗿𝗻𝗲𝗱
Most people think "FP16 and BF16 are interchangeable."
Wrong move.
FP16's nightmare scenario:

Max value: 65,504
Gradient explosions during training → NaN
Requires loss scaling (1024x-32768x typical)
Attention logits can EASILY overflow

BF16's advantage:

Max value: 3.4 × 10³⁸ (FP32 range)
Drop-in replacement for FP32 → NO loss scaling needed
Direct truncation from FP32 (just chop 16 bits)

Real-world impact? Training Llama 2 70B in FP16 = gradient explosion hell. BF16 = smooth sailing.

𝟯. 𝗧𝗵𝗲 𝗛𝗮𝗿𝗱𝘄𝗮𝗿𝗲 𝗦𝘂𝗽𝗽𝗼𝗿𝘁 - 𝗧𝗵𝗲 𝗵𝗶𝗱𝗱𝗲𝗻 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗸𝗶𝗹𝗹𝗲𝗿
Here's what separates junior from senior GenAI engineers:

FP16 Hardware:
Universal support: V100, T4, A100, H100, ALL GPUs

BF16 Hardware:
Ampere+ only (A100, H100, RTX 3090+)

The counterintuitive reality? BF16 on V100 = 4x slower than FP16. Hardware matters MORE than format.

𝟰. 𝗧𝗵𝗲 𝗧𝗿𝗮𝗶𝗻𝗶𝗻𝗴 𝘃𝘀 𝗜𝗻𝗳𝗲𝗿𝗲𝗻𝗰𝗲 𝗧𝗿𝗮𝗱𝗲 - 𝗧𝗵𝗲 𝗰𝗼𝘀𝘁 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
Training (backward pass matters):

BF16 wins 90% of the time
No loss scaling complexity
Stable gradient updates
Industry standard: GPT-3, Llama 2, Stable Diffusion

Inference (forward pass only):

FP16 often superior
Better precision for final predictions
Wider hardware compatibility
Lower memory bandwidth on older GPUs

Mixed Precision Reality:

Store weights in BF16/FP16
Compute in FP32 for critical ops (softmax, LayerNorm)
Master weights in FP32 (training only)


𝗪𝗵𝗲𝗻 𝗙𝗣𝟭𝟲 𝘄𝗶𝗻𝘀:
✅ Inference on edge devices (Jetson, mobile)
✅ V100/T4 deployment (no BF16 support)
✅ Vision models with bounded value ranges
✅ Maximum precision critical (scientific computing)

𝗪𝗵𝗲𝗻 𝗕𝗙𝟭𝟲 𝘄𝗶𝗻𝘀:
✅ Training large models (7B+ parameters)
✅ Long-context scenarios (8K+ tokens)
✅ A100/H100 hardware available
✅ Training stability > precision
✅ Drop-in FP32 replacement needed

Difference table:
<img width="676" height="340" alt="image" src="https://github.com/user-attachments/assets/67ec5a0c-97fa-4d87-9bcf-64cb9f832459" />


Extra reading:
https://medium.com/@furkangozukara/what-is-the-difference-between-fp16-and-bf16-here-a-good-explanation-for-you-d75ac7ec30fa
