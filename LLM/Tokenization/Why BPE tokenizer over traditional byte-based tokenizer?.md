You’re in a AI Engineer interview at OpenAI and the interviewer asks:

“Why don’t we just use a simple byte-based tokenizer? It has a fixed 256-token vocabulary, it’s simple, and it never has an ‘unknown’ token. Why are we still using a complex BPE tokenizer?”

Most candidates say: “Because BPE groups related characters into subwords that have more semantic meaning...”

Wrong approach. That’s a happy side effect, not the production reason.

The reality: It’s not only about semantics. It’s about compute cost.

A byte-based tokenizer has a 1.0 compression ratio. A 1,000-character prompt becomes 1,000 tokens.
A good BPE tokenizer might compress that same prompt to ≈ 250 tokens.

Why does this matter?
- The Transformer’s self-attention mechanism has O(n^2) quadratic complexity.
- The compute (FLOPs) doesn’t scale linearly with sequence length. It explodes.
- That 1,000-token byte sequence isn’t just 4x more expensive than the 250-token BPE sequence. In the attention layers, it’s 4^2 = 16x more expensive.

Using a byte-based tokenizer is like shipping a car one screw at a time. You’re paying for 10,000 tiny, expensive packages instead of one efficient crate.
You would burn your entire multi-million dollar GPU budget on sequence length bloat before you even finished a single epoch.

The answer that gets you hired:
BPE isn’t just about subword semantics, we should start thinking about FLOPs. BPE is an efficiency hack. It’s a compression algorithm we use to dramatically reduce sequence length, which is the single biggest bottleneck for a Transformer’s O(n^2) compute cost.
