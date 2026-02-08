You're in a Senior AI Interview at Google DeepMind. The interviewer sets a trap:

"We have a 70B parameter LLM. We need it to see images. But here's the constraint: We have zero budget to fine-tune the 70B weights, and we can't afford to destroy the model's existing reasoning capabilities."

90% of candidates walk right into the trap.

They say: "Easy. Just turn the images into tokens and concatenate them with the text prompt."

Here is why that answer fails the interview:
1️⃣ 𝐂𝐨𝐧𝐭𝐞𝐱𝐭 𝐄𝐱𝐩𝐥𝐨𝐬𝐢𝐨𝐧: Raw image patches will flood your context window, leaving no room for actual reasoning.

2️⃣ 𝐃𝐞𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐯𝐞 𝐈𝐧𝐭𝐞𝐫𝐟𝐞𝐫𝐞𝐧𝐜𝐞: Even if you use LoRA, you risk shifting the distribution of the core LLM too much if you aren’t careful with initialization.

The interviewer isn't looking for a "𝘱𝘳𝘰𝘮𝘱𝘵 𝘦𝘯𝘨𝘪𝘯𝘦𝘦𝘳𝘪𝘯𝘨" hack. They are testing if the candidates know how to adapt the model structurally, not just at the input level, while keeping 99% of the compute graph frozen.

To pass, you must identify the two specific "surgical" components from the Flamingo architecture:

1️⃣ 𝐓𝐡𝐞 𝐏𝐞𝐫𝐜𝐞𝐢𝐯𝐞𝐫 𝐑𝐞𝐬𝐚𝐦𝐩𝐥𝐞𝐫 (𝐓𝐡𝐞 𝐂𝐨𝐦𝐩𝐫𝐞𝐬𝐬𝐨𝐫): Instead of feeding thousands of patch tokens into the LLM, you train a lightweight Perceiver to ingest variable-sized image features and "downsample" them into a fixed, small number of visual tokens (e.g., 64). This decouples vision cost from text cost.

2️⃣ 𝐆𝐚𝐭𝐞𝐝 𝐂𝐫𝐨𝐬𝐬-𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧 (𝐓𝐡𝐞 𝐈𝐧𝐣𝐞𝐜𝐭𝐨𝐫): You insert new 𝘊𝘳𝘰𝘴𝘴-𝘈𝘵𝘵𝘦𝘯𝘵𝘪𝘰𝘯 layers between the frozen LLM layers. Crucially, these are initialized with a tanh gating mechanism starting at 0.
- 𝘈𝘵 𝘴𝘵𝘦𝘱 0: The model ignores the vision input entirely (preserving original LLM behavior).
- 𝘋𝘶𝘳𝘪𝘯𝘨 𝘵𝘳𝘢𝘪𝘯𝘪𝘯𝘨: The model slowly learns to "open the gate" and attend to visual tokens only when necessary.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"I would keep the 𝘝𝘪𝘴𝘪𝘰𝘯 𝘌𝘯𝘤𝘰𝘥𝘦𝘳 and 𝘓𝘓𝘔 completely frozen. I would inject trainable 𝘎𝘢𝘵𝘦𝘥 𝘊𝘳𝘰𝘴𝘴-𝘈𝘵𝘵𝘦𝘯𝘵𝘪𝘰𝘯 layers interleaved within the LLM to attend to visual features, and use a Perceiver Resampler to compress the visual input into a fixed token budget. This allows multimodal alignment without the catastrophic cost of full fine-tuning."
