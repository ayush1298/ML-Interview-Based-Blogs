You’re in an AI Engineer interview at OpenAI. The interviewer asks:

“The product team wants a 2x speedup on our Llama 3 70B endpoint, but they’ve forbidden any lossy techniques like quantization or pruning. How can you losslessly accelerate inference, and what core asymmetry in the Transformer are you exploiting?”

Most candidates say: “Well, we could improve our batching strategy with vLLM’s PagedAttention...”.

Wrong approach. That improves overall 𝘵𝘩𝘳𝘰𝘶𝘨𝘩𝘱𝘶𝘵, but it doesn’t make a 𝘴𝘪𝘯𝘨𝘭𝘦 user’s generation 2x faster. They’re stumped by the “lossless” constraint.

The reality is that autoregressive generation is painfully slow. It’s 𝐦𝐞𝐦𝐨𝐫𝐲-𝐛𝐚𝐧𝐝𝐰𝐢𝐝𝐭𝐡-𝐛𝐨𝐮𝐧𝐝. For every single token, we have to read the 𝘦𝘯𝘵𝘪𝘳𝘦 massive KV cache from HBM.

But inference isn’t one process. It’s two:
- 𝐏𝐫𝐞𝐟𝐢𝐥𝐥 (𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧): Processing the prompt. This is fast, parallel, and compute-bound.
- 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐨𝐧 (𝐃𝐞𝐜𝐨𝐝𝐢𝐧𝐠): Generating one token at a time. This is slow, sequential, and memory-bound.

The core asymmetry is this: 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐚 𝐭𝐨𝐤𝐞𝐧 𝐢𝐬 10𝐱 𝐟𝐚𝐬𝐭𝐞𝐫 𝐭𝐡𝐚𝐧 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐚 𝐭𝐨𝐤𝐞𝐧.

So, we exploit this with 𝐒𝐩𝐞𝐜𝐮𝐥𝐚𝐭𝐢𝐯𝐞 𝐃𝐞𝐜𝐨𝐝𝐢𝐧𝐠.

Here’s the plan:
- We use a small, lightning-fast “𝐝𝐫𝐚𝐟𝐭 𝐦𝐨𝐝𝐞𝐥” (e.g., a 1.5B model) to “guess” the next 5-7 tokens. This is cheap.
- We then feed that entire 5-token chunk to our 70B “𝐭𝐚𝐫𝐠𝐞𝐭 𝐦𝐨𝐝𝐞𝐥” in a single forward pass.
- This single pass verifies all 5 tokens in parallel (using the fast prefill mode), which is dramatically faster than generating them 5 times sequentially.
- Using a clever rejection sampling algorithm, the 70B model accepts the tokens it would have generated anyway (say, the first 4) and only pays the slow generation cost for the one token it disagrees on.

We just generated 4-5 tokens for the price of ~1.5. That’s your 2x lossless speedup.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

“We exploit the asymmetry between fast, compute-bound verification and slow, memory-bound generation. We’ll implement Speculative Decoding, using a small draft model to rapidly propose tokens and our 70B target model to losslessly verify them in a single, parallel batch.”
