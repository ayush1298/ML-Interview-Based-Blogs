"Just batch your LLM requests"
Until you need:

1. 100+ concurrent users
2. <500ms first token latency
3. 50+ tokens/sec throughput per user

Then you need continuous batching.

Most people think LLM inference is simple:
1. Take a batch of prompts
2. Process them together
3. Return responses

But this naive batching wastes 60-80% of your GPU compute.

The problem? Padding and synchronization.

Traditional batching has a fatal flaw:

All prompts must have the same length (padded). All prompts must finish together (slowest determines speed).

User 1: "Hi" (needs padding to 1000 tokens) 
User 2: "Write an essay..." (finishes last)
Everyone waits. GPU idles. Money burns.

vLLM's continuous batching solves this with 3 core techniques:
1. KV Cache - store computed attention states
2. Chunked Prefill - break large prompts into chunks
3. Ragged Batching - no padding, just concatenate

Let me break each down:

A. KV Cache basics:
When generating token N+1, you already computed attention for tokens 1-N.
Instead of recomputing (O(n²) cost), store and reuse those key/value states.

This drops per-token cost from O(n²) to O(n).

For Llama-2-7B: 16KB per token cached.

B. Chunked Prefill:

Got a 10,000 token prompt? Can't fit in GPU memory at once?

Split it into chunks (say, 512 tokens each). Process incrementally. Append to KV cache as you go.

No memory explosion. Same result. Flexible scheduling.

C. Ragged Batching (the magic):

Traditional: Add batch dimension, force same length 
vLLM: Concatenate sequences, control with attention mask
Prompt 1: [tokens 0-100] Prompt 2: [tokens 101-250]
Attention mask ensures token 50 can't see token 200.
Zero padding waste.

Dynamic Scheduling ties it together:

User finishes? Remove from batch immediately. 
New request arrives? Insert into next batch. 
Mix prefill + decode in same batch.

Keep GPU at 100% utilization. 
No waiting for slowest request. 
Maximize tokens/sec.

Real-world impact:
Naive batching: 8 users × 1000 tokens = 8000 tokens processed
But 6000 are padding

Effective throughput: 25%
Continuous batching: Same batch = 2000-3000 real tokens
Zero padding
3-4x better throughput

This is why vLLM powers production inference:
ChatGPT handles thousands of concurrent users efficiently. 
Claude can mix long context prompts with quick questions. 
Open-source models become economically viable.

Continuous batching isn't optional at scale - it's the foundation.
