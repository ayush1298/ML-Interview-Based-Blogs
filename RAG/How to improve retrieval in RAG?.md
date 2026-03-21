You're in an AI/ML Engineer interview at Meta.

Interviewer: "A client has a RAG-based system that isn't giving accurate results. After investigation, you suspect retrieval is failing. How would you improve it?"

This is how you answer...

You: "Before jumping to solutions, I'd first validate where the failure actually is."

Step 0: Clarify the problem space
  - What kind of data are we dealing with: text, code, multimodal?
  - How are we measuring failure: recall@k, answer accuracy, user feedback?
  - Has anything changed recently: data drift, ingestion pipeline, query patterns?
Reason: Retrieval issues are often symptoms, not root causes.

Then I'd approach it in layers:
1. Validate the ground truth (often skipped)
  - Take 20 to 30 failed queries.
  - Check if the correct answer exists in the corpus.
  - Check if it appears in top-K results.

Insight:
   - If the answer is not in top-K, it's a retrieval problem.
   - If it's not in the corpus or poorly extracted, it's a data problem.

2. Audit data quality and preprocessing
- Look for:
  - Duplicate documents
  - Poor OCR or extraction quality
  - Broken or inconsistent chunking
- Validate chunking strategy:
  - Too small -> loss of context
  - Too large -> diluted relevance

Outcome: Fixing chunking and deduplication often gives bigger gains than changing models.

3. Analyze retrieval mechanics
- Evaluate:
  - Embedding quality (generic vs domain-specific)
  - Similarity metric alignment
  - Index type and ANN trade-offs
- Test with benchmark queries and inspect retrieved documents manually.

4. Improve retrieval strategy
  - Hybrid search (dense + sparse)
  - Query rewriting or expansion
  - MMR or diversification to avoid repetitive context
  - Adaptive weighting between retrieval strategies

5. Feedback and continuous evaluation
- Track:
  - recall@k, MRR, nDCG
  - downstream answer quality
- Incorporate:
  - User feedback
  - Generation-based signals
- Re-embed periodically to handle corpus drift

Interviewer: "Sounds thorough. How do you deploy this safely without breaking the system?"

You: "I'd roll this out incrementally with strong observability:
  - Log and compare top-K retrievals before and after changes
  - Run offline benchmarks on fixed datasets
  - A/B test improvements
  - Monitor both retrieval metrics and final answer quality
If retrieval improves, generation quality typically follows."
