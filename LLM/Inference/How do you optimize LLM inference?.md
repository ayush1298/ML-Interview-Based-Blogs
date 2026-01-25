You're in an AI Infrastructure interview at OpenAI, and the interviewer asks:

"We need to serve GPT-4 to 10M users with <200ms TTFT. How do you optimize LLM inference?"

Here's how NOT to answer: "Just add more GPUs."

The 16 techniques that separate senior from staff engineers:

𝗠𝗲𝗺𝗼𝗿𝘆 𝗧𝗿𝗶𝗰𝗸𝘀: 
📌 PagedAttention: Treat KV cache like OS paging (16-token blocks). No fragmentation = 2-3x throughput (https://lnkd.in/g2tfDYPF)

📌 KV Quantization: FP8 cache vs FP16 = 2x capacity, <1% quality loss (https://lnkd.in/g2tfDYPF)

📌 Memory Offload: CPU stores cold KVs, GPU hot path stays fast

𝗕𝗮𝘁𝗰𝗵𝗶𝗻𝗴 𝗠𝗮𝗴𝗶𝗰: 
📌 Continuous Batching: Add new requests mid-generation (vLLM's secret weapon) 

📌 Dynamic Batching: Adjust batch size real-time based on queue depth 

📌 Request Coalescing: Merge similar prefixes before processing

𝗦𝗽𝗲𝗲𝗱 𝗛𝗮𝗰𝗸𝘀: 
📌 Speculative Decoding: Draft model proposes 5 tokens, big model validates in 1 pass. 2-3x faster decode 

📌 CUDA Graphs: Pre-record GPU ops, replay = zero kernel launch overhead 

📌 FP8 Kernels: Half the bandwidth, 2x faster matmuls

𝗦𝗺𝗮𝗿𝘁 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗶𝗻𝗴: 
📌 Prefetch Pipelines: Load next layer weights while computing current 

📌 Asynchronous Prefill: Process prompts on separate GPUs from decode 

📌 GPU-CPU Overlap: Copy next batch while computing current

𝗔𝗱𝘃𝗮𝗻𝗰𝗲𝗱: 
📌 Token Parallelism: Generate multiple tokens per step 

📌 Context Streaming: Don't load full 128K context, stream as needed 

📌 Early Exit: Small queries exit at layer 12/40, save 70% compute

The brutal reality: Most teams only know batching. The 10x engineers stack 5+ techniques.

Interview killer answer: "I'd profile first. Memory-bound? PagedAttention + KV quant. Compute-bound? Speculative decode + FP8. Latency-critical? Disaggregate prefill/decode with async scheduling. Then continuous batching for throughput."
