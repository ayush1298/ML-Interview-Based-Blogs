Acronyms that aspiring kernel engineers should know:

CUDA → Compute Unified Device Architecture

ROCm → Radeon Open Compute Platform (AMD’s equivalent of CUDA)

PTX → Parallel Thread Execution all CUDA programs are compiled to PTX which is the equivalent of assembly level language for NVIDIA GPUs. Further higher level DSL’s like Triton compile down to PTX too. Crucially the same 
PTX code can run on any NVIDIA family of GPUs i.e. there’s always forward compatibility.

SASS → Streaming/Shader Assembler is the low-level assembly language that compiles to binary microcode, which executes natively on NVIDIA GPU hardware.

NVCC → Nvidia Cuda Compiler a toolchain from NVIDIA for compiling CUDA C/C++ as well as PTX code.

NCCL → The NVIDIA Collective Communications Library is a library providing inter-GPU communication primitives.

SM → Streaming Multiprocessor, the fundamental compute unit of an NVIDIA GPU. An SM executes programs in groups of 32 threads called warps. All the threads in the warp execute the same instruction but on different pieces of data.

CC → Compute Capability, a version number of NVIDIA GPUs. Each version of GPUs have new hardware and software features. For e.g. the Hopper with a CC of 9.x introduced Tensor Memory Accelerator (TMA)

GeMM → General Matrix Multiply, gemm actually also includes a translation and scaling factor. GeMM operations compute α·(A × B) + β·C. Where A,B,C are all matrices

FMA → Fused Multiply and Add computes a X b + c where a, b and c are all scalars. A GeMM is composed of a series of FMAs.

𝗰𝘂𝗕𝗟𝗔𝗦 → CUDA Basic Linear Algebra Subroutine library, containing efficient implementations of operations like dot product, gemm (matmul), imax (index of max) etc. cuBLAS is closed source and its implementation details are a black box.

𝗰𝘂𝘁𝗹𝗮𝘀𝘀 → CUDA Templates for Linear Algebra Subroutines. An open source CUDA C++ library containing templates and abstractions that map onto their hardware for implementing custom CUDA kernels and GEMMs. 

𝗦𝗜𝗠𝗧 → Single Instruction Multiple Threads. The core working principle of GPUs, they have multiple threads running the same instruction at the same time on different pieces of data, parallelizing work.

𝗗𝗥𝗔𝗠 → Dynamic Random Access Memory, corresponds to the main/largest memory component of a GPU. 

𝗛𝗕𝗠 → High Bandwidth Memory also refers to the same thing as DRAM.

𝗦𝗥𝗔𝗠 → Static Random Access Memory, SRAM makes up registers, shared memory l1/l2 caches, the way it stores bits is different to DRAM.

𝗣𝗖𝗜𝗲 → Peripheral Component Interconnect Express is a high-speed serial computer expansion bus standard that’s used for connecting the GPU and CPU.

𝗖𝗧𝗔 → Co-operative Thread Array. This includes the groups of threads that are scheduled to run on a single SM. All the threads in a CTA have access to the same Shared Memory but each thread gets its own private registers. CTAs are divided into multiple warps, all the threads in the same warp execute at the same time i.e. in lock-step while the threads in other warps wait.

𝗠𝗠𝗔 → Matrix Multiply and Accumulate. Computes C += A @ B

𝗪𝗚𝗠𝗠𝗔 → Warp Group MMA. A warp group is composed of 4 warps. Supported from the Hopper family of GPUs, this allows us to perform matrix multiplications in an async manner and with work divided between 128 threads.

𝗧𝗠𝗔 → Tensor Memory Accelerator a new hardware unit introduced in Hopper that helps moving data between Global Memory and Shared Memory in an async manner. It doesn’t use any of the cuda cores or warps associated with a SM freeing them up to do other work.
