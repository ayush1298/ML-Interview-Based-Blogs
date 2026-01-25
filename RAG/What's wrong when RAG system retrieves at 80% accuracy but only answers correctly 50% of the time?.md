You're in a ML Engineer interview at Perplexity, and they ask:

"Your RAG system retrieves at 80% accuracy but only answers correctly 50% of the time. What's wrong?"

Here's is how you answer:

Don't say: "Use a reranker"
Too generic.
The real answer starts with understanding what makes RAG reranking different from web search reranking.

Spoiler: It's not just about relevance.

Web search reranking: Optimizes for "which doc will the human click?" → User reads results → picks best one

RAG reranking: Optimizes for "which doc helps the LLM generate the correct answer?" → LLM reads results → generates answer

Traditional rerankers are trained on click data (MS MARCO etc). But your LLM doesn't click - it comprehends. 

Here's the brutal truth about position bias in RAG:
Your LLM with 10 docs at 80% precision = 50% accuracy 
Same LLM with 3 docs at 95% precision = 85% accuracy

Why? LLMs suffer from "lost in the middle" - they ignore positions 4-10.
Your reranker's top-3 matters MORE than your retriever's top-100.

The killer in enterprise RAG: Conflicting information across sources.
> Marketing materials vs product docs
> Q2 notes vs Q1 notes
> Google Drive vs MS Office docs

Instruction-following rerankers let you specify priority: "Prioritize internal sales documents over market analysis. Weight recent documents higher."

This is impossible with traditional rerankers.

So how do you actually build this?

Step 1: Generate RAG-specific training data
- Don't use MS MARCO. Create your own:
- Run your RAG pipeline on real queries
- Collect (query, retrieved_docs, LLM_answer, ground_truth)
- Label which docs the LLM SHOULD have used

This is your gold dataset.

Step 2: The hard negative problem

Bad negative: Random doc about cats (for query about dogs) 
Good negative: "Dogs are popular pets" (for query "How to train dogs?")

Your reranker needs to learn:

- Topically relevant ≠ Answer-containing
- Statistics ≠ Instructions
- Definitions ≠ Procedures

Step 3: Optimize for YOUR LLM's behavior, Run this experiment:
- Same docs, different orders
- Measure answer quality per LLM

Your reranker should optimize for LLM's position bias. This can swing accuracy by ~15%.

Contextual AI solved this exact problem. They built a reranker specifically for RAG that: 

✅ Understands answer containment vs semantic similarity
✅ Enables metadata-based reranking (recency, source, document type) 
✅ Uses synthetic data generation for instruction-following capability
 ✅ Runs in <100ms on 100 docs 
✅ Purpose-built for production RAG pipelines

The cost equation everyone forgets:

Bad reranking 
- Send 100 docs to LLM
- 100 docs × 500 tokens = 50K tokens
- GPT-4o: $0.125 per query 

1M queries: $125K/m

Good reranking 
- Send 15 docs to LLM
- 15 docs × 500 tokens = 7.5K tokens
- GPT-4o: $0.01875 per query 
1M queries: $18.75K/m

Reranking SAVES $106.25K/month in this scenario. 
