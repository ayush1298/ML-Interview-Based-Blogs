"Just use KV cache for inference"

Until you need:
- Same 5000-token system prompt for every request
- 10M+ requests/day burning $50k on redundant compute
- RAG pipelines reprocessing the same docs 1000x/day

Then you implement prefix caching.

You know why basic KV cache isn't enough?

A typical ChatGPT-style app:
- System prompt: 2000 tokens (same for every user)
- RAG context: 3000 tokens (same docs retrieved repeatedly) 
- User query: 100 tokens (unique)
- Generated response: 500 tokens

Without prefix caching:
- Process 5000 tokens EVERY request (prefill)
- 1M requests = 5 BILLION redundant token computations
- You're paying to reprocess "You are a helpful assistant..." 1 million times

Prefill (prompt processing) is DETERMINISTIC. Same input tokens → same KV cache, always.

> Traditional KV cache: Stores within a single conversation
> Prefix caching: Stores ACROSS conversations, keyed by exact token sequence

If 10,000 users all start with the same system prompt, you compute it ONCE and serve 10,000x from cache. The prompt tokens become free after the first hit.

When to use prefix caching?

✓ Same system prompts across all users (chatbots, agents)
✓ RAG with frequently accessed documents (customer support, docs search)
✓ Multi-turn conversations (context grows but prefix stays same)
✓ Code assistants (same repo/file context)
✓ Few-shot prompting (same examples for every request)

Basically: ANY repetitive context at inference time.

How to design cache key though?

> Naive: Hash the entire prompt string
> Problem: One character change = full cache miss

> Better: Hash the TOKEN SEQUENCE 
> Why: Same text → same tokens → cache hit

> Best: Longest prefix matching
> Example: "You are a helpful..." (cached) + "Answer this: [new]" (compute)

Only the UNIQUE suffix needs prefill. vLLM and SGLang do this automatically.

Common mistakes that kill your hit rate:

❌ Dynamic timestamps in prompts ("Current time: 2:35pm")
❌ Random request IDs in system message 
❌ User-specific info in prefix ("Hello, John!")
❌ Non-deterministic formatting

✓ Move dynamic content to suffix
✓ Standardize system prompts across users
✓ Use template prompts with fixed prefixes
✓ Monitor cache hit rates in production

A 95% hit rate vs 50% hit rate is 2x cost difference.

<img width="800" height="436" alt="image" src="https://github.com/user-attachments/assets/5261695a-4a5f-4718-b17c-5b600173965d" />

