You're in a Senior AI Engineer interview at NVIDIA and the interviewer asks:

"We switched from standard FP16 fine-tuning to QLoRA (4-bit quantization) to save memory. The model fits now, but training speed hasn't improved, it's actually slightly slower. Why didn't reducing precision by 4x result in a 4x speedup?"

Most candidates say: "That sounds like a bug. Since 4-bit integers are 4x smaller than 16-bit floats, we are moving less data. Less memory bandwidth usage always equals faster training."

𝐖𝐡𝐲 𝐭𝐡𝐢𝐬 𝐟𝐚𝐢𝐥𝐬: They are confusing storage efficiency with computational throughput. They are assuming the GPU is doing math in 4-bit. It isn't.

Here is the architectural reality: QLoRA is a memory optimization, not a compute optimization.

To understand why your training slowed down, you have to look at what is happening inside the GPU kernels.

1️⃣ 𝐓𝐡𝐞 "𝐔𝐧𝐳𝐢𝐩𝐩𝐢𝐧𝐠" 𝐓𝐚𝐱: 
The weights are stored in VRAM as 4-bit integers (saving huge amounts of space). However, NVIDIA Tensor Cores generally do not perform training operations (backpropagation) directly in INT4.

Before every Matrix Multiplication (GEMM), the system must dequantize those 4-bit weights back into BF16 or FP16 in the GPU's cache.

2️⃣ 𝐂𝐨𝐦𝐩𝐮𝐭𝐞-𝐁𝐨𝐮𝐧𝐝 𝐯𝐬. 𝐌𝐞𝐦𝐨𝐫𝐲-𝐁𝐨𝐮𝐧𝐝
- FP16 Training: You load large weights, but you compute immediately.
- QLoRA Training: You load small weights (fast), but then you pause to run a "dequantization kernel" before you can compute.

You have effectively traded 𝐂𝐨𝐦𝐩𝐮𝐭𝐞 𝐋𝐚𝐭𝐞𝐧𝐜𝐲 for 𝐌𝐞𝐦𝐨𝐫𝐲 𝐂𝐚𝐩𝐚𝐜𝐢𝐭𝐲.

If your training run wasn't bottlenecked by memory bandwidth in the first place, adding that extra dequantization step simply adds pure overhead to every single forward and backward pass.
- Pro: You can fit a 70B parameter model on a single node.
- Con: You pay a computational tax for that privilege.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"QLoRA introduces on-the-fly dequantization overhead. While we save VRAM by storing weights in 4-bit, the GPU must constantly cast them up to BF16 for calculation. We are accepting slightly slower wall-clock time in exchange for the ability to fit a larger batch size or a larger model on consumer hardware."
