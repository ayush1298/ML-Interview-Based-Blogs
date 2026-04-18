You're in a Senior AI Engineer interview at Anthropic and the interviewer asks:

"Your autoregressive decoding is completely memory-bound, making token generation painfully slow. Instead of trying to optimize the memory bandwidth directly, how can you leverage a significantly smaller, 𝘸𝘦𝘢𝘬𝘦𝘳 model to artificially parallelize the generation process of your massive frontier model?"

Most candidates say: "We should build a routing layer to send easy prompts to the small model and hard prompts to the big one."

Wrong approach. That's a product feature, not an infrastructure-level decoding optimization. You completely missed the bottleneck.

During autoregressive generation, your GPUs are starving. You have to load billions of weights from memory to the compute cores just to generate one single token. 

You aren't compute-bound, you are severely memory-bandwidth bound.

To break this bottleneck, you need 𝐒𝐩𝐞𝐜𝐮𝐥𝐚𝐭𝐢𝐯𝐞 𝐃𝐞𝐜𝐨𝐝𝐢𝐧𝐠.

Think of it like an eager Junior Developer drafting code while a Principal Engineer reviews it. The Principal is slow but accurate, the Junior is fast but makes mistakes.

Here is how you actually parallelize the generation:

1️⃣ 𝘛𝘩𝘦 𝘚𝘱𝘳𝘪𝘯𝘵 (𝘋𝘳𝘢𝘧𝘵𝘪𝘯𝘨): You use the small, cheap "draft" model to race ahead and guess the next K tokens (e.g., 5 tokens) autoregressively. Because it’s tiny, it does this in milliseconds.

2️⃣ 𝘛𝘩𝘦 𝘗𝘢𝘳𝘢𝘭𝘭𝘦𝘭 𝘊𝘩𝘦𝘤𝘬 (𝘝𝘦𝘳𝘪𝘧𝘪𝘤𝘢𝘵𝘪𝘰𝘯): You pass those 5 draft tokens to your massive "target" model. Because neural networks can process known sequences in parallel, the massive model evaluates all 5 tokens in one single forward pass.

3️⃣ 𝘛𝘩𝘦 𝘍𝘢𝘭𝘭𝘣𝘢𝘤𝘬: The target model scores the draft tokens. If the draft matches the target model’s probability distribution, you keep them. You just generated 5 tokens for the time cost of 1. If it rejects token #3, you keep the first two, discard the rest, and let the target model output the correct 3rd token.

You are fundamentally trading unused GPU compute (which you have plenty of) to save on memory bandwidth (which is your true bottleneck). The entire system's speedup now hinges on one critical insider metric: your Acceptance Rate (the percentage of draft tokens the big model agrees with).

-----
𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"We implement 𝐒𝐩𝐞𝐜𝐮𝐥𝐚𝐭𝐢𝐯𝐞 𝐃𝐞𝐜𝐨𝐝𝐢𝐧𝐠. We use a lightweight draft model to rapidly generate candidate tokens, allowing our massive target model to process and verify those tokens in parallel, effectively converting a memory-bound sequential process into a highly efficient, compute-bound parallel operation."
