4 must-know LLM text generation strategies:

(a popular LLM interview question)

Every time you prompt an LLM, it doesn’t “know” the whole sentence in advance. Instead, it predicts the next token step by step.

But here’s the catch: predicting probabilities is not enough because we still need a strategy to pick which token to use at each step.

And different strategies lead to very different styles of output.

Here are the 4 most common strategies for text generation:

> Approach 1: Greedy strategy
The naive approach greedily chooses the word with the highest probability from the probability vector, and autoregresses. This is often not ideal since it leads to repetitive sentences.

> Approach 2: Multinomial sampling strategy
Instead of always picking the top token, we can sample from the probability distribution available in the probability vector.

The temperature parameter controls the randomness in the generation.

> Approach 3: Beam search
Both approach 1 and approach 2 have a problem. They only focus on the most immediate token to be generated. Ideally, we care about maximizing the probability of the whole sequence, not just the next token.

P(sequence|prompt) = P(token1|prompt)*P(token2|token1+prompt)*...

To maximize this product, you’d need to know all future conditionals (what comes after each candidate).

But when decoding, we only know probabilities for the next step, not the downstream continuation.

Beam search tries to approximate the true global maximization:
- At each step, it expands the top k partial sequences (the beam).
- Some beams may have started with less probable tokens initially, but lead to much higher-probability completions.
- By keeping alternatives alive, beam search explores more of the probability tree.

This is widely used in tasks like machine translation, where correctness matters more than creativity.

> Approach 4: Contrastive search

This is a newer method that balances fluency with diversity.

Essentially, it penalizes repetitive continuations by checking how similar a candidate token is to what’s already been generated to have more diversity in the output.

- At each step, the model considers candidate tokens.
- Applies a penalty if the token is too similar to what’s already been generated.
- Selects the token that balances probability and diversity.

This way, it also prevents “stuck in a loop” problems while keeping coherence high.

It’s especially effective for longer generations like stories, where repetition can easily creep in.
