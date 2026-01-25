> be sf founder
> AI startup
> gpu is moat
> burn $400K on GPU cluster 
> hire infra engineer
> GPUs sit idle 19 hours/day
> mfw Modal would've cost $2K/month
> mfw I could've shipped 3 products instead of managing Kubernetes

Here's how serverless can save you $$$:

Everyone obsesses over "owning your infrastructure."
Meanwhile, serverless GPU platforms solved the hardest parts:

> Cold start optimization
> Auto-scaling
> Multi-region deployment
> GPU multiplexing

You get enterprise-grade infra with 10 lines of code.

The magic of serverless GPUs isn't just "no DevOps."
It's the cost model:
You pay $0.0008/sec for H100 time. Your agent runs for 3 seconds = $0.0024. With 10K requests/day = $24/day.
Traditional GPU rental: $2.50/hour × 24 hours = $60/day at 4% utilization.

Here's what's actually possible with serverless:
- Deploy a Llama 70B endpoint in 5 minutes
- Auto-scale from 0 to 100 GPUs based on demand
- Run batch jobs on 1000 GPUs without infrastructure
- Build multi-step agents with persistent state

This used to require 6 engineers and 3 months.

The serverless sweet spot:
Bursty traffic patterns where traditional GPUs sit idle 80% of the time.

Example: Document processing API
> 1000 requests at 9am
> 50 requests at 2pm
> 2000 requests at 5pm

Serverless: Pay for 3050 invocations. 
Dedicated: Pay for 24 hours whether you use it or not.


Cold starts are NOT the enemy for most AI apps.
Modal's cold start: 2-5s with container caching. 
Your user sends a document for analysis. 
They wait 30s for results anyway.
That 3s cold start? Irrelevant.
What matters: You didn't pay for 23 hours of idle GPU time.

Agentic workflows are where serverless shines.

Your coding agent:
> Analyzes codebase: 8 seconds
> Generates solution: 12 seconds
> Runs tests: 15 seconds

Total: 35 seconds of GPU time across 3 minutes. 
With dedicated GPUs, you paid for 3 minutes. 
With Modal, you paid for 35 seconds.


"But what about state between agent steps?"
Modal volumes + class-based functions solve this:
- Warm containers persist for 5 minutes. 
- Your agent's 10 tool calls reuse the same container. 
- Only the first call has cold start.
- State lives in memory across invocations. 
- You're not round-tripping to Redis.

The batch processing superpower:
Need to embed 10M documents? Yes?
Serverless: Spin up 500 GPUs, process in 20 minutes, shut down. Cost: $80.
Your infrastructure: Would take 3 days on 8 GPUs. Cost: $576 + engineering time to parallelize.

Map-reduce at GPU scale with zero orchestration.

Use Modal/serverless when you have:

- Unpredictable traffic (0-100 req/sec swings)
- Batch workloads that spike monthly
- <10K requests/day per model
- Multi-model serving (20+ different models)
- Development velocity matters more than $/request
