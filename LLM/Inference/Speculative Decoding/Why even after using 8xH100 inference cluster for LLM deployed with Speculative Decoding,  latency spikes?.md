You're in a Senior AI Engineer interview at OpenAI. The interviewer sets a trap.

"You deployed 𝐒𝐩𝐞𝐜𝐮𝐥𝐚𝐭𝐢𝐯𝐞 𝐃𝐞𝐜𝐨𝐝𝐢𝐧𝐠 to speed up an 8xH100 inference cluster. But at peak load, latency actually spiked by 30%. Why?"

90% of candidates walk right into it.

Most candidates say, "The draft model is guessing wrong too often, so we lose the speedup."

They assume a rejected draft token just means falling back to standard autoregressive generation. They treat speculation like a free cache hit where a miss has zero cost.

If they say that, the interview is over. They aren't optimizing for token acceptance, they are fighting kernel-level synchronization.

When a draft prediction fails, you don't just "try again." You have to clean up the mess.

At the system level, the draft model has already eagerly written partial states to your KV cache. When the target model verifies a mismatch, those updates are instantly invalid. Your GPU must now execute a hard rollback.

This triggers:
1️⃣ 𝘗𝘰𝘪𝘯𝘵𝘦𝘳 𝘗𝘶𝘳𝘨𝘪𝘯𝘨: GPU kernels must stall to purge orphaned KV blocks and synchronize memory pointers across tensor parallel ranks.
2️⃣ 𝘙𝘦𝘤𝘰𝘮𝘱𝘶𝘵𝘢𝘵𝘪𝘰𝘯 𝘚𝘱𝘪𝘬𝘦𝘴: The target model must execute an unplanned, memory-heavy forward pass to overwrite the sequence.
3️⃣ 𝘊𝘰𝘯𝘵𝘦𝘹𝘵 𝘚𝘸𝘪𝘵𝘤𝘩𝘪𝘯𝘨: Under high concurrency (e.g., batch size 128), forcing the GPU to constantly switch between asynchronous drafting and synchronous error-correction fragments VRAM bandwidth.

The memory bandwidth required to constantly overwrite orphaned KV states completely outstrips the compute savings of predicting ahead. You hit a memory wall, and latency skyrockets.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Speculative decoding is a bet on memory bandwidth, not just compute. When draft entropy is high, rolling back orphaned KV cache states creates a kernel-level synchronization bottleneck that makes speculation strictly slower than standard generation."
