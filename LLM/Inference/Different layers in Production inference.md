Just use OpenAI's API" Until you need:

- Custom fine-tuned models
- <50ms p99 latency 
- $0.001/1K tokens (not $1.25/1K input)

Then you build your own inference platform.

Most engineers think "build your own" means:
- Rent some GPUs
- Load model with vLLM
- Wrap it in FastAPI
- Ship it

The complexity hits you around week 2. 

Remember, You're not building a system to serve one model to one user. You're building a system that handles hundreds of concurrent requests, across multiple models, with wildly different latency requirements.

That's a fundamentally different problem.

What you actually need is 
> A request router that understands model capabilities. 
> A dynamic batcher that groups requests without killing latency. 
> A KV cache manager that doesn't OOM your GPUs.
> A model instance pool that handles traffic spikes.

And that's just the core components.

Your <50ms p99 requirement breaks down as:

- Network overhead: 10-15ms (you can't fix this)
- Queueing delay: 5-20ms (if you batch wrong, this explodes)
- First token latency: 20-40ms (model dependent)
- Per-token generation: 10-50ms (grows with context length)

You have maybe 5ms of slack. This is why "just throw H100s at it" fails.

The first principle of inference platforms:

"Continuous batching ≠ Static batching"

Static batching waits for 8 requests, then processes them together. Continuous batching processes 8 requests and adds request #9 mid-generation.

vLLM does this. TensorRT-LLM does this. Your FastAPI wrapper doesn't.

This single difference is 3-5x throughput.

"We have 20 fine-tuned models for different tasks"

Now your platform needs model routing based on user intent. Dynamic loading and unloading so you don't keep 20 models in memory. Shared KV cache across similar base models. LoRA adapter swapping in <100ms.

This is where 90% of DIY inference platforms die.

> Use OpenAI API when you're under 100K requests/month, using standard models, can tolerate 500ms+ latency, and cost per request is 10x higher than raw compute.

> Build your own when you have custom models, doing 500K+ requests/month, need sub-100ms p99, or when cost optimization actually matters.

The break-even is usually around $5-10K/month in API spend.

Production inference platforms have four layers:

> Request handling (load balancer, rate limiter, queue). 
> Orchestration (model router, dynamic batcher, priority scheduler). 
> Inference engine (vLLM/TRT-LLM, KV cache manager, multi-GPU coordinator). > Observability (per-component latency, GPU utilization, cost per token).

Most engineers build layer 1 and 3, then wonder why production break
