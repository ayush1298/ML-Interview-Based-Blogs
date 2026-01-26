OpenAI Research Scientist Interview - Final Round

Question: "Your inference costs are 10x higher than expected due to KV cache. How do you diagnose and fix this?"

You: "I'll just increase my GPU memory to store more cache"

Awkward silence
Interview over.

Here's why you failed:

Don't say: "Add more memory" or "Optimize the cache size."
Wrong framing.
The real answer isn't about capacity - it's about memory fragmentation from contiguous allocation.

Small sequences vs long sequences vs mixed batches = completely different memory behaviors.

Most teams debug by checking total memory usage, not allocation patterns.
Your memory problem isn't size - it's holes.
Traditional allocation wastes 40% of your GPU memory on unusable gaps.

PagedAttention isn't magic - it's just virtual memory for KV cache.
"More memory" doesn't fix fragmentation.
The allocation reality everyone misses:

Contiguous allocation = Giant blocks that can't be split
Non-contiguous allocation = Small blocks that fit anywhere
Growing sequences = Constant reallocation and copying
Finished sequences = Holes that new sequences can't use

Memory layout drives the cost, not memory amount.

"But what about cache size?"

Interviewer: "How do you handle variable-length sequences efficiently?"

Cache size without allocation strategy is meaningless.

PagedAttention gives you near-zero fragmentation, but only if sequences of mixed lengths were your bottleneck.

Fixed-size blocks only help when you need flexible allocation.
The infrastructure framework that matters:

> Long uniform sequences + Known lengths = Contiguous is fine
> Mixed lengths + Dynamic batching = PagedAttention essential
> Short sequences + High turnover = Block-based allocation wins
> Rare long sequences + Mostly short = Fragmentation kills you
> Match the allocation strategy to the workload pattern.

The evolution path most deployments miss:

Start: Simple contiguous allocation (easy to implement)
Scale: Hit fragmentation issues (40% waste)
Optimize: PagedAttention (near-zero fragmentation)
Production: 5-6x throughput improvement on same hardware

It's not about buying bigger GPUs - it's about using them better.The answer that gets you hired:"KV cache cost isn't about total memory. 

It's about allocation fragmentation. 
Contiguous blocks waste space through holes. 

PagedAttention uses virtual memory concepts - fixed-size blocks that can live anywhere. Pick based on your sequence length variance, not your memory budget."
