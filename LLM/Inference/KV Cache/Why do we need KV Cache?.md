You're in a ML Inference Engineer Interview at Meta, and the interviewer asks:

"Why do we need KV cache? Can't we just recompute attention for every new token?"

Here's how you answer:

Don't say: "To make generation faster."
Too shallow. The real answer is the quadratic recomputation problem.
Every token generation requires attention over ALL previous tokens.
No KV cache = O(n²) recomputation for every single token you generate.
That's the difference between 0.1s and 10s per token.

Here's why naive generation fails:

Without KV cache, generating a 100-token response:
- Token 1: compute attention over 1000 context tokens
- Token 2: recompute ALL 1001 tokens 
- Token 100: recompute ALL 1099 tokens

Total: ~55,000 redundant attention computations.

You're recalculating the same Keys and Values thousands of times.

The computational waste is insane:
> Without KV cache: 100 output tokens = 55,000 attention operations
> With KV cache: 100 output tokens = 100 attention operations (550x reduction)
Memory cost? ~2 bytes × layers × heads × hidden_dim per token
For Llama 70B: ~1.2GB for 1000 cached tokens.

You're trading memory for compute. Always worth it.


During generation, the Keys and Values for past tokens NEVER CHANGE.

> Without cache: Recompute K and V matrices for all previous tokens
> With cache: Store computed K,V once, retrieve from memory

Only the Query for the NEW token needs computation.

This is why it's called autoregressive generation.

What actually gets cached:

For each transformer layer:
- Keys: [batch, num_heads, seq_len, head_dim]
- Values: [batch, num_heads, seq_len, head_dim]

NOT cached: Queries (computed fresh each step)

For 32 layers × 32 heads × 128 dim = massive memory, but still cheaper than recomputing.

The speed improvement is dramatic:

Without KV cache:
- 100 token generation = ~30 seconds
- Each token waits for full attention recomputation

With KV cache:
- 100 token generation = ~3 seconds
- Each token only computes new attention scores

That's 10x faster generation. Your users feel this immediately.

Why you can't always cache everything:

> Memory scaling: Linear with sequence length (1000 tokens = ~1GB for big models)
> Batch size impact: Can't fit as many requests in GPU memory
> Context length: 100k context = 100GB of KV cache

The techniques that separate amateurs from pros:

> Multi-Query Attention (MQA): Share Keys/Values across heads (8x memory reduction)
> Grouped-Query Attention (GQA): Middle ground between MQA and MHA
> PagedAttention: Store KV cache in non-contiguous memory blocks
> KV quantization: INT8 or INT4 KV cache (50-75% memory savings)

Modern serving systems use ALL of these.
