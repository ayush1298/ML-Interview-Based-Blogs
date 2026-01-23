You're in an ML Engineer interview at Anthropic, and the interviewer asks:

"Your LLM inference is running out of GPU memory with long conversations. How do you fix this?"

Here's how you answer:

Don't say "buy more GPUs" or "truncate context."
Wrong approach.
The real bottleneck isn't model size.
It's KV cache memory that grows linearly with every token.
Smart engineers offload, not truncate.


GPU Memory = Model Weights + KV Cache.
As context grows, KV cache can consume 10× more memory than the model itself.
A 7B model with 8K context?
That's ~4GB just for KV cache storage.

The problem everyone misses:
Your KV cache sits idle in expensive GPU memory between user interactions.
User types a message, pauses for 30 seconds, types again.
Meanwhile, their 2GB cache is blocking new requests from being served.

btw subscribe to my newsletter to get my posts in your inbox daily -

https://lnkd.in/gsHvQW7m
now back to post-

Here's the diagnostic framework every senior ML engineer knows:

High GPU utilization + low throughput = KV cache memory bottleneck
OOM errors on long contexts = need an offloading strategy
Idle sessions consuming memory = wasted GPU resources
Recomputing the same context = missing cache reuse


The metric that separates juniors from seniors:

Time-to-First-Token (TTFT) with cache reuse.
NVIDIA reports ~14× faster TTFT when reusing offloaded cache vs recomputing from scratch.
Cache transfer cost < recomputation cost.

"Our model handles 4K context fine!"

Interviewer follow-ups:
"What's your KV cache size at 32K tokens?"
"How do you handle multi-user sessions?"
"Where do you store inactive caches?"

No offloading strategy = you don't understand production inference.

The memory hierarchy that gets you promoted:

Junior: keep everything in GPU memory until OOM
Senior: GPU → CPU RAM → SSD → network storage based on access patterns
Principal: predictive offloading using usage analytics

Know your offloading targets by use case:

Multi-turn conversations → CPU RAM (fast resume)
Document analysis → shared cache in distributed storage
Code assistance → local SSD for IDE sessions
Batch inference → aggressive disk offloading

The brutal production reality:

Perfect model + no cache strategy = OOM crashes
Smart offloading + slow storage = latency spikes
Great hardware + poor cache management = wasted money

You need tiered storage, not just bigger GPUs.

What I'd mention explicitly:

"I'd implement tiered KV cache offloading using tools like LMCache. Benchmark transfer cost vs recomputation, optimize for access patterns, and monitor cache hit rates."

The question that ends the interview:

"How do you calculate optimal offloading thresholds?"

Wrong: "Move old data to disk."
Right: Transfer_cost < recomputation_cost.

Profile access patterns, measure storage latency, and implement predictive offloading based on session analytics.

Understanding memory hierarchy > buying bigger GPUs.
