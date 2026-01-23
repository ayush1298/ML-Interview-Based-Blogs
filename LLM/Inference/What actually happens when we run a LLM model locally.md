You're in a ML Engineer interview at Microsoft, and the interviewer asks:

"Explain what actually happens when you 'run a model locally'. Not the marketing fluff—the real mechanics."

Here's how you can answer:

A. Most candidates say "you load weights and generate text." Incomplete. That's like saying a car "burns gas and moves."

B. There are 5 core systems every engineer must understand.

1. What Even Is a "Model"? - The anatomy

𝗔 𝗺𝗼𝗱𝗲𝗹 𝗶𝘀𝗻'𝘁 𝗼𝗻𝗲 𝘁𝗵𝗶𝗻𝗴. 𝗜𝘁'𝘀 𝟰 𝗰𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁𝘀:

Weights (the brain):

Giant files: 7B model = 14GB (FP16), 70B = 140GB

Billions of learned numbers (parameters)

This IS the model's "knowledge"

Architecture (the body):

Transformer = stack of layers (attention + MLPs)

7B model ≈ 32 layers, 70B ≈ 80 layers

Each layer = more understanding, deeper context

Tokenizer (the translator):

Converts text → integers (token IDs)

"internationalization" = 6 tokens

"lol" = 1 token

"🚀" = who knows (depends on tokenizer)

Config (the blueprint):

Hidden size, num layers, vocab size

Context window (2K, 8K, 128K tokens)

Model metadata

The brutal truth: If you don't understand tokenization, you don't understand LLMs.

2. Inference = Fancy Autocomplete (but make it billions of times)

What happens when you hit "generate":

Step 1: Tokenize your prompt

"Hello world" → [15496, 995] (2 tokens)

Step 2: For each generation step:

Model reads ALL tokens so far (entire sequence)

Does math through ALL layers (attention → MLP → repeat)

Predicts probability distribution over 32K-128K tokens

Picks one token (greedy or sampled)

Appends to sequence

Repeat until done

One. Token. At. A. Time.

Why it feels slow: Generating "Hello, how are you?" = 6 forward passes through a 70-layer network.

Why it's still fast: GPUs do trillions of ops/sec. Each forward pass = 50-200ms for 7B model.

𝗧𝗵𝗲 𝗔𝗻𝘀𝘄𝗲𝗿 𝗧𝗵𝗮𝘁 𝗚𝗲𝘁𝘀 𝗬𝗼𝘂 𝗛𝗶𝗿𝗲𝗱

"Running a model locally means loading billions of parameters into VRAM, allocating KV cache for the context window, and doing token-by-token autoregressive generation through a transformer stack.

For a 7B model at INT4, I need ~3.5GB for weights plus ~2GB for 4K context. Each generation step does a full forward pass—attention across all past tokens, then MLPs—and samples the next token from the output distribution.

The main bottlenecks are VRAM capacity (weights + KV cache) and memory bandwidth during decode. I'd use vLLM for serving (PagedAttention cuts memory waste by 3x), quantize to INT4 for consumer GPUs, and ensure I'm using the correct chat template—wrong format causes hallucinations even with a perfect model.

𝟯. 𝗧𝗵𝗲 𝗩𝗥𝗔𝗠 𝗠𝗮𝘁𝗵 𝗡𝗼𝗯𝗼𝗱𝘆 𝗧𝗲𝗮𝗰𝗵𝗲𝘀 𝗬𝗼𝘂

You need to fit TWO things in GPU memory:

A. Model Weights

7B @ FP16 = 14GB

7B @ INT4 = 3.5GB (quantized)

70B @ FP16 = 140GB (won't fit consumer GPU)

70B @ INT4 = 35GB (barely fits 4090)

B. KV Cache (the conversation memory)

Stores attention keys/values for every past token

Rule of thumb: ~0.5MB per token for 7B model

4K context = 2GB KV cache

32K context = 16GB KV cache

The equation that determines if you can run a model:

VRAM needed = Weights + (Tokens × 0.5MB × Batch Size)

Real example:

RTX 4090 (24GB)

Want to run 13B model @ 4K context

INT4 weights: 6.5GB

KV cache: 2GB

Overhead: 1GB

Total: 9.5GB ✅ FITS

Same model @ 32K context: 22.5GB ❌ OOM

This is why context windows cost money in production.

𝟰. 𝗤𝘂𝗮𝗻𝘁𝗶𝘇𝗮𝘁𝗶𝗼𝗻 - 𝗧𝗵𝗲 𝗦𝗽𝗲𝗲𝗱/𝗤𝘂𝗮𝗹𝗶𝘁𝘆 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳

FP16 (baseline):

Each parameter = 2 bytes

Full precision, full intelligence

7B model = 14GB

INT8:

1 byte per parameter

~1% quality loss

7B model = 7GB

INT4/NF4 (sweet spot):

0.5 bytes per parameter

~3-5% quality loss

7B model = 3.5GB

Most consumer GPUs run this

INT2:

0.25 bytes per parameter

10%+ quality loss

Experimental, not production-ready

The senior engineer insight: Quantization saves memory AND increases speed (less data to move = faster inference).

When to quantize: ✅ Consumer hardware (4090, 3090) ✅ Throughput-critical serving ✅ Mobile/edge deployment

When NOT to quantize: ❌ Research experiments ❌ You have 8xH100s ❌ Quality is non-negotiable

𝟱. 𝗗𝗲𝗰𝗼𝗱𝗶𝗻𝗴 - 𝗛𝗼𝘄 𝘁𝗵𝗲 𝗠𝗼𝗱𝗲𝗹 𝗔𝗰𝘁𝘂𝗮𝗹𝗹𝘆 𝗣𝗶𝗰𝗸𝘀 𝗧𝗼𝗸𝗲𝗻𝘀

After the model computes probabilities for 32K tokens, how does it choose?

Greedy (robot mode):

Always pick highest probability token

Deterministic, boring, repetitive

Temperature (chaos knob):

temp = 0: Greedy

temp = 0.7: Balanced (default)

temp = 1.5: Creative chaos

temp = 2.0: Word salad

Top-K (filter by rank):

Only consider top K tokens

K=40 is common

Prevents sampling from long tail

Top-P / Nucleus (filter by probability):

Sample from tokens that add up to P cumulative probability

P=0.9 is common

More dynamic than top-K

The combo that works:

temperature = 0.7

top_p = 0.9

top_k = 40

repetition_penalty = 1.1

Common mistake: Using base models with chat prompts. Base models need specific formats or they hallucinate.

𝗖. 𝗪𝗵𝗮𝘁 𝗛𝗮𝗽𝗽𝗲𝗻𝘀 𝗪𝗵𝗲𝗻 𝗬𝗼𝘂 "𝗟𝗼𝗮𝗱 𝗮 𝗠𝗼𝗱𝗲𝗹"?

Step 1: Download artifacts

Weights (14GB for 7B)

Tokenizer (vocab.json, merges.txt)

Config (model dimensions, layer count)

Step 2: Allocate VRAM

Copy weights to GPU

Allocate KV cache buffers

Initialize CUDA kernels

Step 3: Warmup

First inference = slowest (kernel compilation)

Next inferences = fast (cached)

Step 4: Ready for inference

Model waiting in VRAM

Tokenizer ready

You can now generate

Typical startup time:

7B model: 5-15 seconds

70B model: 30-60 seconds

𝗗. 𝗧𝗵𝗲 𝗧𝗲𝗺𝗽𝗹𝗮𝘁𝗲 𝗣𝗿𝗼𝗯𝗹𝗲𝗺 𝗡𝗼𝗯𝗼𝗱𝘆 𝗪𝗮𝗿𝗻𝘀 𝗬𝗼𝘂 𝗔𝗯𝗼𝘂𝘁

Chat models expect specific formats:

Llama 3:

<|begin_of_text|><|start_header_id|>user<|end_header_id|>

Your prompt<|eot_id|>

<|start_header_id|>assistant<|end_header_id|>

Mistral:

<s>[INST] Your prompt [/INST]

ChatML:

<|im_start|>user

Your prompt<|im_end|>

<|im_start|>assistant

Wrong template = hallucinations, refusals, or silence.

The debugging nightmare:

Model outputs gibberish? Check template.

Model refuses safe requests? Wrong system prompt.

Model ignores instructions? Using base model, not chat-tuned.

𝗘. 𝗦𝗲𝗿𝘃𝗶𝗻𝗴 𝗢𝗽𝘁𝗶𝗼𝗻𝘀 - 𝗧𝗵𝗲 𝗦𝘁𝗮𝗰𝗸

vLLM (production king):

PagedAttention, continuous batching

2-3x throughput vs naive PyTorch

OpenAI-compatible API

llama.cpp (portability king):

Runs on CPU, GPU, Metal, everything

GGUF format (quantized)

Ultra-low dependencies

ExLlama v2 (speed king for inference):

Fastest single-GPU inference

GPTQ/EXL2 quantization

Not for serving, for local chat

Text Generation Inference (Hugging Face):

Production-grade serving

Flash Attention, tensor parallelism

Good for multi-GPU

The tradeoff matrix:

Need throughput? → vLLM

Need portability? → llama.cpp

Need speed (single GPU)? → ExLlama

Need enterprise support? → TGI

𝗙. 𝗖𝗼𝗻𝘁𝗲𝘅𝘁 𝗪𝗶𝗻𝗱𝗼𝘄 - 𝗧𝗵𝗲 𝗠𝗲𝗺𝗼𝗿𝘆 𝗧𝗮𝘅

2K context:

~1GB KV cache for 7B model

Good for: Q&A, simple chat

8K context:

~4GB KV cache

Good for: Document analysis, coding

32K context:

~16GB KV cache

Good for: Long conversations, research

128K context:

~64GB KV cache

Good for: Full codebases, books

Requires multi-GPU for most models

Why bigger isn't always better:

Attention is O(n²) in sequence length

128K context = 256x slower attention than 8K

Most queries use <4K tokens anyway

The optimization: Use RAG (retrieval) instead of dumping everything in context.

𝗚. 𝗖𝗼𝗺𝗺𝗼𝗻 𝗣𝗶𝘁𝗳𝗮𝗹𝗹𝘀 (𝗮𝗻𝗱 𝗵𝗼𝘄 𝘁𝗼 𝗱𝗲𝗯𝘂𝗴 𝘁𝗵𝗲𝗺)

OOM (Out of Memory):

Quantize more aggressively

Reduce context window

Reduce batch size

Offload layers to CPU (slow but works)

Gibberish output:

Wrong chat template

Using base model with instruct prompt

Temperature too high (>1.5)

Broken tokenizer

Slow inference (<10 tokens/sec):

CPU offloading active

Missing Flash Attention

Wrong CUDA version

Batch size = 1 (no throughput optimization)

Model refuses everything:

Overly restrictive system prompt

Chat template includes safety prefix

Model is base, not chat-tuned

𝗛. 𝗧𝗵𝗲 𝗟𝗼𝗰𝗮𝗹 𝗟𝗟𝗠 𝗖𝗵𝗲𝗰𝗸𝗹𝗶𝘀𝘁

Before you run ANY model locally:

1. Math check:

Model size in GB (quantized)

KV cache needed (tokens × 0.5MB)

Do they fit in your VRAM?

2. Format check:

Is it base or chat-tuned?

Do you have the correct template?

System prompt configured?

3. Runtime check:

vLLM for serving

llama.cpp for portability

ExLlama for local speed

4. Sampling check:

Temperature: 0.7

Top-P: 0.9

Repetition penalty: 1.1

5. Warmup:

First generation is slow

Profile tokens/sec on 2nd+ runs
