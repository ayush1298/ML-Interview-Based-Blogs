You're in a Research Scientist interview at Meta.

The interviewer asks: "How would you implement speculative decoding to improve inference latency? What's the fundamental tradeoff?"

You answer: "I'll use a smaller model to predict tokens ahead of time"

Interview over.

Here's what you missed:

Don't say: "Small model predicts, large model verifies" or "It's parallel token generation."
Too surface-level.

The real answer is the acceptance rate cliff.

Speculative decoding only works when your draft model maintains >60% acceptance rate. Below that, you're slower than baseline.

You're not just "predicting ahead" - you're gambling on draft quality.

Here's why naive speculation fails:

Your mental model: Small draft model → Generate K tokens → Large model verifies → Accept all tokens = K× speedup
Problem: The acceptance rate drops exponentially with K.

- Draft tokens 1-2: 80% acceptance
- Draft tokens 3-4: 50% acceptance
- Draft tokens 5+: 20% acceptance

The acceptance rate math is brutal:
- Expected speedup = (K × acceptance_rate) - verification_overhead
- K=5, accept_rate=40% → 2× speedup (not 5×)
- K=10, accept_rate=15% → 0.5× speedup (you're SLOWER)

One rejection: Entire draft thrown away, start over

You're building a house of cards. One bad token collapses everything.
The failure modes nobody tells you:

> Draft model trained on different data distribution
> Target model updated, draft model stale
> Acceptance rate: 65% → 35% overnight
> Your "optimization" now adds 40% latency


Bad approach:

> Use any small model as draft
> Generate fixed K=10 tokens
> Hope for the best
> Acceptance rate: 20%
> Result: Slower than baseline

Good approach:

> Draft model: Distilled from target model (same distribution)
> Adaptive K: Stop drafting when confidence drops
> Acceptance rate target: >70%
> Tree-based verification: Check multiple branches
> Result: 2-3× speedup, stable

The difference is distribution matching, not model size.

The real performance numbers:
1. Llama-70B baseline: 5.0s per 100 tokens
2. Llama-70B + naive speculation (random draft, K=10): 6.2s (WORSE)
3. Llama-70B + distilled speculation (K=5, adaptive): 2.1s (2.4× better)

The distribution matching IS the feature, not the model size.
