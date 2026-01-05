"Just use Vector Database"

Until you need:
- 100M+ vectors indexed
- <10ms p95 search latency
- $50/month (not $500/month)

Then you build your own vector database.

Here's what that actually means:

Most engineers think vector DB = 
- Install FAISS
- Wrap with Flask
- Add some metadata filtering
- Done

Reality hits around 10M vectors.

You're not building a system to search ONE index for ONE user.

You're building a system that handles THOUSANDS of concurrent searches, with filters, hybrid search, and real-time updates.

Completely different beast.

What you actually need:

> HNSW index builder that doesn't block writes
> Metadata filtering that scales with cardinality
> Distributed sharding across index size
> Real-time upsert pipeline without rebuild

And that's just the foundation.
Your <10ms p95 search breaks down as:

- Network: 2-3ms (fixed)
- Metadata pre-filter: 1-3ms (explodes with complex filters)
- ANN search: 3-8ms (depends on ef_search)
- Post-filtering: 1-2ms

You have 0-2ms buffer. "Just scale horizontally" doesn't work.

Index memory is the silent killer.
- 100M vectors × 768 dims × 4 bytes = 307GB just for vectors.
- HNSW graph adds 2-3x that.
- You're at 900GB memory for ONE index.

And you have 20 different embedding models.

"We need hybrid search with BM25 + vector + metadata filters"

Now your platform needs:
- Inverted index alongside HNSW
- Score fusion that doesn't kill latency
- Query planning for filter pushdown
- Cross-encoder reranking in <5ms

This is where 80% of custom vector DBs fail.

Use Managed DB when you're under 10M vectors, using standard embeddings, can tolerate 50ms+ latency, and cost per query is 100x raw compute.

Build your own when you have 50M+ vectors, custom embeddings, need sub-15ms p95, or when you're spending $500+/month.

Let's do the math:

> Managed DB at $70/million vectors/month + $0.10 per 1K queries:
> 100M vectors + 10M queries/month = $7,000 + $1,000 = $8,000

Your self-hosted setup with 2TB RAM machine at $1,000/month:
= $1,000 compute

But add $80K engineering, $5K/month maintenance, 8 month break-even.

Production vector DBs have four layers:

> Query parsing (filter optimization, query planning, type checking).
> Search execution (HNSW navigator, hybrid fusion, distributed scatter-gather).
> Index management (real-time updates, compaction, shard rebalancing).
> Observability (latency per component, recall metrics, memory pressure).

Most build layer 2 only.

That's it.

Building a vector db is a 8-month project with memory costs everywhere.

But at 100M+ vectors? Pays for itself in 3 months.
