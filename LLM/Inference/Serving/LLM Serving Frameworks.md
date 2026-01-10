You're in a ML Inference Engineer interview at NVIDIA, and the interviewer asks: 

"Our team wants to switch from API to a self-hosted. Which serving framework and why?" 

Here's how you answer:

Don't say: "vLLM is fastest" or "Ollama is easiest." 
Wrong framing. 
The real answer isn't about features - it's about matching serving philosophy to your constraints. 
Local prototype vs. production scale vs. complex workflows = completely different frameworks.

Most teams pick based on benchmarks, not bottlenecks
Your serving choice matters less than your use case.

PagedAttention isn't magic - it's just better memory management "Fastest" framework can be slowest for YOUR workload

The infrastructure reality everyone misses:

Single user prototype = Ollama/LLaMA.cpp wins
Multi-user production = vLLM dominates
AI agent workflows = SGLang is your only option
Edge deployment = LLaMA.cpp or bust

Architecture drives the decision, not features.

"But what about performance?"

Interviewer: "How do you handle 1000 concurrent users?"

Performance without context is meaningless.

> vLLM's PagedAttention gives you 24x throughput, but only if memory fragmentation was your bottleneck.
> SGLang's RadixAttention only helps with cache reuse scenarios.

By the way, just reading about inference frameworks won't help you land a job.

I personally learnt a lot by doing stuff.

If I were to do all over, I would rent a gpu from Hyperbolic for dirt cheap, and play with some open source model with different frameworks.

The business framework that matters:

> Rapid prototyping + Local dev = Ollama
> Known high load + GPU budget = vLLM
> Complex multi-step LLM workflows = SGLang
> Constrained environments + Portability = LLaMA.cpp

Match the tool to the business constraint.

The evolution path most teams miss:

> Start: Ollama (prototype fast)
> Scale: vLLM (handle users)
> Optimize: SGLang (complex workflows)
> Edge: LLaMA.cpp (deploy anywhere)

It's not replacement - it's graduation based on needs.

The answer that gets you hired:

"Framework choice isn't about better vs worse. It's about constraints vs capabilities. Ollama gives you speed-to-market.

vLLM gives you user scale. SGLang gives you workflow complexity.

Pick based on your biggest constraint, not your biggest benchmark."

That's it for today. See ya tomorrow!

And if you want to read more about these frameworks, checkout this

More detail at: https://www.hyperbolic.ai/blog/llm-serving-frameworks
