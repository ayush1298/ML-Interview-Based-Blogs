Deep dive into TPU architecture 🧵 

The problem: von Neumann bottleneck.

CPUs load values from memory → compute → store back to memory. For EVERY calculation.

Memory access is orders of magnitude slower than computation. This bottleneck kills throughput in ML workloads that need billions of operations.


GPUs solved this with massive parallelism - 2,500 to 5,000 ALUs running simultaneously.

Great for neural networks! But GPUs are still general-purpose. Those thousands of ALUs still need to constantly read/write from registers and shared memory for every operation.


Enter TPUs: Application-Specific Integrated Circuits (ASICs) that ONLY do matrix operations.

No word processing. No rocket engines. Just matrix multiply-accumulate operations at insane speeds.

The key? Systolic array architecture.

A systolic array is thousands of multiply-accumulators directly connected to each other in a physical matrix.

Cloud TPU v3: 128 x 128 ALUs per systolic array, 2 arrays per chip.
TPU v6e/v7: 256 x 256 ALUs.

That's 16K multiply-accumulate ops per cycle, per unit.


Here's the magic:

TPU loads parameters from memory into the Matrix Multiplication Unit once. Then loads data. As each multiplication executes, the result passes DIRECTLY to the next multiply-accumulator.

No memory access during matrix multiplication. Zero.


TPU system hierarchy:

• TensorCore = MXUs + vector unit + scalar unit
• Chip = 1+ TensorCores 
• Slice = chips connected by high-speed ICI (inter-chip interconnect)
• Pod = collection of slices
• Multislice = multiple slices using datacenter network

Scale from single chip to thousands.


TPU v5p and v6e also include SparseCores - specialized processors for sparse operations.

Perfect for recommendation models that rely heavily on embeddings. 4 SparseCores per chip on v5p, 2 per chip on v6e.

Hardware acceleration for the entire ML stack.


TPU VM architecture gives you direct SSH access to the VM connected to TPU hardware.

Root access. Full compiler logs. Real debugging. No gRPC middleware.

(TPU Node architecture is deprecated as of April 2025 - migrate to TPU VMs if you haven't already)


The trade-off?

CPUs: flexible, general-purpose
GPUs: parallel, gaming + ML
TPUs: specialized matrix processors for neural networks only

But for training and inference on transformers and neural nets? TPUs achieve computational throughput that GPUs can't match.

That's the power of purpose-built silicon.
