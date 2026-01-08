The interview is for a Gen AI Engineer role at Microsoft.

Interviewer: "Your RAG pipeline produces accurate answers, but users complain it’s too slow. What do you do?"

You: "That's the classic trade-off between retrieval quality and latency. Most teams over-optimize for accuracy early on, then realize response time kills adoption."

Interviewer: "So where do you start optimizing?"

You: "First, I look at where the delay actually comes from.
Usually, it's one of three things:
1. Vector search latency - embedding model or ANN index not optimized.
2. Document chunking - too many chukns retrieved = more context tokens = higher inference time.
3. LLM context length - longer context means higher cost and slower generation."

Interviewer: "And your quick wins?"

You:
 - Switch to dense retrieval caching for repeated queries.
 - Use re-ranking only for complex questions, not every call.
 - Compress context with summary embeddings or hierarchical retrieval.
 - Use function calling or structured context instead of dumping long passages.

Interviewer: "So you trade off depth for speed?"

You: "Not always. I trade redundant context for useful context.
Most teams think 'more retrieval = better grounding'.
But in practice, fewer, higher-quality chunks -> same accuracy, 3x faster responses."

Interviewer: "How do you know when you've hit the sweet spot?"

You: "When latency < 3s and user trust doesn't drop.
That’s when the system feels 'instant' and grounded."

Interviewer: "So RAG optimization is less about models and more about experience design?"

You: "Yep. The best GenAI systems balance precision, performance, and patience.
Users forgive slight inaccuracy - they never forgive waiting."
