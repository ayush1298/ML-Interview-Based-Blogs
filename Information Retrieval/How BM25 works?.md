Vector search is not always the answer.

A 30-year-old algorithm with zero training, zero embeddings, and zero fine-tuning still powers Elasticsearch, OpenSearch, and most production search systems today.

It's called BM25, and it's worth understanding why it refuses to die.

Let's say you're searching for "transformer attention mechanism" in a library of ML papers.

BM25 scores documents using three core ideas:

1) Word rarity matters more than word frequency

Every paper contains "the" and "is" so those words carry no signal.

But "transformer" is specific and informative, so BM25 gives it a much higher weight. In the formula, this is captured by IDF(qᵢ).

2) Repetition helps, but with diminishing returns

If "attention" appears 10 times in a paper, that's a strong relevance signal. But the jump from 10 to 100 occurrences barely moves the score.

BM25 applies a saturation curve controlled by f(qᵢ, D) and the parameter k₁, preventing keyword stuffing from gaming the results.

3) Document length gets normalized

A 50-page paper will naturally contain more keyword hits than a 5-page paper.

BM25 adjusts for this using |D|/avgdl, controlled by parameter b, so longer documents don't dominate the rankings just because they have more text.

Three ideas. No neural networks. No training data. Just elegant math that has stood the test of time.

Here's the part most people overlook: BM25 excels at exact keyword matching, which is something embeddings genuinely struggle with.

When a user searches for "error code 5012" vector search might return semantically similar error codes. BM25 will surface the exact match every time.

This is exactly why hybrid search has become the default in top RAG systems.

Combining BM25 with vector search gives you semantic understanding AND precise keyword matching in a single pipeline.

So before you throw GPUs at every search problem, consider that BM25 might already solve it, or at the very least, make your semantic search significantly better when the two are combined.

This hybrid search stack I mentioned in the post is actually implemented in this open-source context retrieval layer for agents called Airweave.
