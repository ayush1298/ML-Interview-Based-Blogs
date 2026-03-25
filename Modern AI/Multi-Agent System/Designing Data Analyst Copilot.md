The interview is for an AI Engineering role at Target.

Interviewer: "You pitched a multi-agent system for a data analyst copilot. During tests, agents started contradicting each other. Why?"

You: "Because agents were designed as independent thinkers rather than role-bound workers.
When agents overlap responsibilities, you get divergent reasoning and conflicting outputs."

Interviewer: "How do you prevent that?"

You: "By defining explicit contracts and a controller. 
 - Each agent must have a clear role: one retrieves, one reasons, one validates, one summarizes. 
 - The controller (a lightweight orchestrator) assigns tasks, merges outputs, and enforces consistency."

Interviewer: "Tell me about your memory model."

You: "I'd design a hierarchical memory:
 - Short-term: session context and recent actions.
 - Mid-term: task state and workflows.
 - Long-term: versioned facts, user preferences, and permissions.
Every memory record includes TTL, source provenance, and a confidence score."

Interviewer: "What about drift and stale facts?"

You: "I'd design time-based eviction plus refresh policies. 
 - Facts older than a freshness threshold trigger re-retrieval. 
 - Critical data paths have active validation agents that periodically re-check key facts."

Interviewer: "How does RAG fit in multi-agent setups?"

You: "Retrieval is a shared service. 
 - Agents don't perform ad-hoc retrieval; they request the retrieval service through a contract that specifies filters, freshness, and chunk size. 
 - The retrieval service returns scored passages plus metadata; agents reason over that structured state."

Interviewer: "How do you measure correctness and coherence?"

You: "I'd track:
 - agreement rate (percent of agent outputs matching the verifier), 
 - retrieval relevance (recall@k), and 
 - user-verified correctness via spot checks. 
I'd also monitor drift and surface alerts when agreement drops."
