Here's a common misconception about RAG!

When we talk about RAG, it's usually thought:
→ index the doc → retrieve the same doc.

But indexing ≠ retrieval.

So the data you index doesn't have to be the data you feed the LLM during generation.

Here are 4 smart ways to index data:

1) Chunk Indexing
- The most common approach.
- Split the doc into chunks, embed, and store them in a vector DB.
- At query time, the closest chunks are retrieved directly.

This is simple and effective, but large or noisy chunks can reduce precision.

2) Sub-chunk Indexing
- Take the original chunks and break them down further into sub-chunks.
- Index using these finer-grained pieces.
- Retrieval still gives you the larger chunk for context.

This helps when documents contain multiple concepts in one section, increasing the chances of matching queries accurately.

3) Query Indexing
- Instead of indexing the raw text, generate hypothetical questions that an LLM thinks the chunk can answer.
- Embed those questions and store them.
- During retrieval, real user queries naturally align better with these generated questions.
- A similar idea is also used in HyDE, but there, we match a hypothetical answer to the actual chunks.

This is great for QA-style systems, since it narrows the semantic gap between user queries and stored data.

4) Summary Indexing
- Use an LLM to summarize each chunk into a concise semantic representation.
- Index the summary instead of the raw text.
- Retrieval still returns the full chunk for context.

This is particularly effective for dense or structured data (like CSVs/tables) where embeddings of raw text aren’t meaningful.
