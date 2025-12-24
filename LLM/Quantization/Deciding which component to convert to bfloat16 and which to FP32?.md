You're in a ML Engineer interview at OpenAI and the interviewer asks:

"Your team is hitting OOM errors. An intern engineer proposes casting the entire model and optimizer state to bfloat16 to cut memory usage by 50%. Why is this a ticking time bomb that will cause training to go out of control, and what components must stay in FP32?"

Most candidates say:
"Actually, bfloat16 is safe because it shares the same dynamic range (exponent) as float32. Unlike float16, it doesn't suffer from overflow, so the intern engineer is right, you can cast everything to save memory without issues."

Wrong. That decision just killed your training run.

The reality is that we are confusing 𝐑𝐚𝐧𝐠𝐞 𝐰𝐢𝐭𝐡 𝐏𝐫𝐞𝐜𝐢𝐬𝐢𝐨𝐧. bfloat16 achieves its dynamic range by aggressively sacrificing its significand (the fraction). It only has 7 bits for precision, compared to 23 bits in float32.

This leads to the 𝐌𝐚𝐧𝐭𝐢𝐬𝐬𝐚 𝐓𝐫𝐚𝐩.

In deep learning, weight updates are often extremely small values (e.g., 1e-8). When you try to add this tiny gradient update to a larger model parameter stored in bfloat16, the hardware physically cannot represent the difference. The update rounds down to zero.

The model effectively "freezes" not because the math is wrong, but because the bit-width is too narrow to capture the learning signal.

You must use 𝐌𝐢𝐱𝐞𝐝 𝐏𝐫𝐞𝐜𝐢𝐬𝐢𝐨𝐧 𝐓𝐫𝐚𝐢𝐧𝐢𝐧𝐠:
- 1. 𝘊𝘰𝘮𝘱𝘶𝘵𝘢𝘵𝘪𝘰𝘯 (𝘍𝘰𝘳𝘸𝘢𝘳𝘥/𝘉𝘢𝘤𝘬𝘸𝘢𝘳𝘥): bfloat16 (Fast, low memory).

- 2. 𝘚𝘵𝘰𝘳𝘢𝘨𝘦 (𝘖𝘱𝘵𝘪𝘮𝘪𝘻𝘦𝘳 𝘚𝘵𝘢𝘵𝘦𝘴 & 𝘔𝘢𝘴𝘵𝘦𝘳 𝘞𝘦𝘪𝘨𝘩𝘵𝘴): float32.

You need the high precision of FP32 to "accumulate" those tiny updates before they are cast back to bfloat16 for the next pass.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"You can compute in low precision, but you must store in high precision. Casting optimizer states to bfloat16 causes 'swallowing' of small gradient updates due to low mantissa bits. You need FP32 Master Weights to maintain training stability."
