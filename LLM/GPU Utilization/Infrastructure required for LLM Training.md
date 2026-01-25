“Just rent a GPU for training”

Until you need:
- Multi-node training for 70B+ models
- $5/hour per GPU (not $30/hour)
- 90%+ GPU utilization

Then you build your own ml infra.

Here’s the reality:

Most ML engineers think training infrastructure =

- Rent some A100s
- Install PyTorch
- Run training script
- Scale with more GPUs

The pain starts around 8 GPUs.

Remember: You’re not training ONE model on ONE GPU.

You’re orchestrating DOZENS of experiments across hundreds of GPUs with checkpointing, fault tolerance, and resource sharing.

That’s a scheduling problem, not a training problem.

What you actually need:
> Job scheduler that understands GPU topology 
> Distributed checkpoint manager that doesn’t waste bandwidth 
> Network fabric optimized for all-reduce 
> Elastic training that handles node failures

This is the actual platform.

Your training cost breakdown at scale:
> Compute: $10/GPU-hour (you pay $30 on cloud)
> Data transfer: $2/TB (kills you with large datasets)
> Storage: $0.02/GB-month (checkpoints add up fast)
> Network: Included (but becomes bottleneck)

The hidden cost? Idle GPU time while debugging.

The first principle of distributed training:

Bandwidth >> Compute for models over 10B params

Ring all-reduce needs 2(N-1)/N bandwidth efficiency. With 64 GPUs on 3.2 Tbps InfiniBand, you max out at 200GB/sec actual throughput.

This is why “just add more GPUs” plateaus.

Training Llama 70B:
- 140GB model weights
- Optimizer states: 280GB
- Checkpoints every 1K steps
- 30 checkpoints = 12.6TB

One training run = $250 in storage. You run 50 experiments/month.

“We need to train 10 models simultaneously with different hyperparameters”

Now your platform needs:
> Gang scheduling for multi-GPU jobs
> Spot instance preemption handling
> Shared dataset caching across jobs
> Priority queues with fairness

90% of DIY platforms can’t do this.

> Use cloud when you’re training <5 models/month, using standard frameworks, can tolerate random failures, and engineering time costs more than GPU markup.

> Build your own when you train 20+ models/month, need 70B+ params, want <$10/GPU-hour, or are spending $50K+/month.

The actual math:

AWS p5.48xlarge (8× H100): $98/hour 100 training runs × 48 hours = $470,400/year

Your bare-metal with 64× H100s at $2.5M upfront: Depreciation + power = $150K/year at 60% utilization = $312,500

Plus $200K engineer, $50K maintenance. Break-even: 18 months.

Production training platforms have four layers:

- Orchestration (job queue, gang scheduler, resource manager). 
- Execution (distributed runtime, checkpoint manager, fault handler). 
- Storage (dataset cache, checkpoint store, artifact registry). 
- Telemetry (GPU util, training metrics, cost per epoch).

Most build layer 2, skip the rest.

That’s it.

Building training infrastructure is a 9-month project with upfront hardware costs.

But at 100+ training runs/month? ROI in 12 months.
