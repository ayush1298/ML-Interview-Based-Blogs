2 hours ago • Edited • Visible to anyone on or off LinkedIn


You’re in a systems / ML infra interview at a top GenAI startup.

The interviewer asks:

“You’re serving a Multimodal LLM on vLLM to analyze videos. 
Requests are sequential.
max_num_seqs = 1.
Yet after a few videos, you hit CUDA OOM.
Why?”

Don’t answer:
“KV cache is growing across requests.”

That sounds right — but it’s wrong.

⸻

GPU memory in vLLM isn’t one thing.
It’s two very different behaviors.

𝐅𝐢𝐱𝐞𝐝 𝐌𝐞𝐦𝐨𝐫𝐲 (𝐊𝐕 𝐂𝐚𝐜𝐡𝐞)
 • Pre‑allocated per GPU based on max_model_len
 • Reused across requests
 • Contents reset, memory not freed
 • Does not grow over time

𝐃𝐲𝐧𝐚𝐦𝐢𝐜 𝐌𝐞𝐦𝐨𝐫𝐲 (𝐕𝐢𝐝𝐞𝐨 𝐏𝐫𝐞𝐟𝐢𝐥𝐥)
 • Video creates variable‑size tensors
 • PyTorch keeps memory reserved
 • Alloc/free cycles cause fragmentation
 • Eventually no contiguous block exists → OOM

Even with:
 • Sequential requests
 • max_num_seqs = 1
 • Tensor parallelism

Any single GPU can OOM — because memory isn’t pooled.

⸻

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝

“The KV cache isn’t accumulating.
The failure comes from memory fragmentation caused by variable‑size video prefills combined with aggressive KV pre‑allocation.
The fix is reducing max_model_len, leaving GPU headroom, and configuring the CUDA allocator.”
