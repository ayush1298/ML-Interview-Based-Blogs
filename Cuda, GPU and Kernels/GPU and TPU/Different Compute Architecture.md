CPU vs GPU vs TPU vs NPU vs LPU, explained visually:
.
.
5 hardware architectures power AI today.

Each one makes a fundamentally different tradeoff between flexibility, parallelism, and memory access.

> CPU

It is built for general-purpose computing. A few powerful cores handle complex logic, branching, and system-level tasks.

It has deep cache hierarchies and off-chip main memory (DRAM). It's great for operating systems, databases, and decision-heavy code, but not that great for repetitive math like matrix multiplications.

> GPU

Instead of a few powerful cores, GPUs spread work across thousands of smaller cores that all execute the same instruction on different data.

This is why GPUs dominate AI training. The parallelism maps directly to the kind of math neural networks need.

> TPU

They go one step further with specialization.

The core compute unit is a grid of multiply-accumulate (MAC) units where data flows through in a wave pattern.

Weights enter from one side, activations from the other, and partial results propagate without going back to memory each time.

The entire execution is compiler-controlled, not hardware-scheduled. Google designed TPUs specifically for neural network workloads.

> NPU

This is an edge-optimized variant.

The architecture is built around a Neural Compute Engine packed with MAC arrays and on-chip SRAM, but instead of high-bandwidth memory (HBM), NPUs use low-power system memory.

The design goal is to run inference at single-digit watt power budgets, like smartphones, wearables, and IoT devices.

Apple Neural Engine and Intel's NPU follow this pattern.

> LPU (Language Processing Unit)

This is the newest entrant, by Groq.

The architecture removes off-chip memory from the critical path entirely. All weight storage lives in on-chip SRAM.

Execution is fully deterministic and compiler-scheduled, which means zero cache misses and zero runtime scheduling overhead.

The tradeoff is that it provides limited memory per chip, which means you need hundreds of chips linked together to serve a single large model. But the latency advantage is real.

AI compute has evolved from general-purpose flexibility (CPU) to extreme specialization (LPU). Each step trades some level of generality for efficiency.

The visual below maps the internal architecture of all five side by side, and it was inspired by ByteByteGo's post on CPU vs GPU vs TPU. I expanded it to include two more architectures that are becoming central to AI inference today.

<img width="1250" height="1250" alt="image" src="https://github.com/user-attachments/assets/53e58157-94e1-4337-8ef8-bccdc989abdc" />
