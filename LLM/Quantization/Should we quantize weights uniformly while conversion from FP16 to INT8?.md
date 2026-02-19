You're in a Senior ML Interview at Meta. The interviewer sets a trap:

"We need to fit Llama-3-70B on cheaper hardware. Standard quantization from FP16 to INT8 reduces memory by 50%. Should we just quantize all the weights uniformly?"

90% of candidates walk right into it.

The candidates say: "Yes. You map the float range to [-127, 127]. You lose a tiny bit of precision, but the model size drops by half and inference speed doubles. It's a standard trade-off."

Wrong.

Do this with a 70B+ parameter model, and their perplexity will explode. Their won't just lose "a tiny bit of precision", they will likely output gibberish.

They assume model weights and activations follow a nice, bell-curve distribution. They assume if they zoom out, the data looks uniform.

The reality is that LLMs rely on outliers.

Once models pass a certain scale (usually >6B params), a phenomenon emerges: specific feature dimensions start producing activation values that are 100x larger than the rest.

If they use a single quantization scale (min/max) for the whole tensor, these massive outliers stretch your grid.
- Outlier value: 50.0
- Regular value: 0.005

To fit 50.0 into an INT8 bucket, their "step size" becomes so large that 0.005 rounds down to zero. They just erased the model's subtle reasoning capabilities because they were catering to the loud minority.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: You need to account for 𝐓𝐡𝐞 𝐎𝐮𝐭𝐥𝐢𝐞𝐫 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐄𝐟𝐟𝐞𝐜𝐭.

Outliers don't happen randomly; they persist in specific feature dimensions (channels) across all tokens. Channel 145 might always be huge, while Channel 146 is normal.

To fix this, you don't use uniform quantization. You use Mixed-Precision Decomposition (the magic behind LLM.int8()):

1️⃣ Identify: Run a calibration pass to find the feature columns that contain outliers (usually <0.1% of dimensions).
2️⃣ Separate: Split the matrix multiplication into two parts.
3️⃣ Execute:
- Outliers: Keep them in FP16 (High Precision).
- The Rest: Quantize 99.9% of values to INT8 (High Compression).

You pay a tiny compute penalty for the decomposition, but you recover full model accuracy while still saving ~45% VRAM.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Naive quantization fails because large models develop systematic activation outliers that dictate the quantization grid, crushing small values to zero.

I would implement a vector-wise quantization or mixed-precision decomposition strategy. We isolate the outlier dimensions in FP16 to preserve the signal range, and only quantize the stable 99% of parameters to INT8. We aren't just compressing data; we are protecting the outliers."
