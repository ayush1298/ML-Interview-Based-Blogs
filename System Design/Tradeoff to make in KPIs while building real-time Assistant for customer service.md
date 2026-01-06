The interview is for a Gen AI Engineer role at Microsoft Research.

Interviewer: "You're building a real-time GenAI assistant for customer service. Customers demand explainability, low latency, and compliance. What's the first trade-off you'd make?"

You: "Trade-offs are inevitable. The first one I'd make is between latency and depth of reasoning.
 - Real-time UX needs snappy responses; 
 - deep multi-hop reasoning needs time and tokens.
So I'd decide which journeys need depth and which need speed."

Interviewer: "How do you do that?"

You: "By scoring requests and routing them. 
 - Lightweight intents go to a distiled model with deterministic templates.
 - Complex or compliance-sensitive queries enter a longer pipeline: retrieval, reranking, verifiers, and optionally human review."

Interviewer: "What components are non-negotiable in this scenario?"

You: "Observability, audit trails, and a governance plane.
 - Every response must record: model version, retrieval ids, prompt template, verifier score etc.
 - If something goes wrong, you must be able to trace back to the exact evidence and prompt that producd the answer."

Interviewer: "And explainability?"

You: "Explainability is layered: 
 - start with provenance (which documents supported the answer), 
 - then show the reasoning steps (retriever outputs, ranked evidence, and any tool calls).
If the user needs deeper clarity, provide a short, sourced summary plus the raw snippets."

Interviewer: "How do you keep latency low with all that logging and verification?"

You: "I'd make expensive ops conditional:
 - Cache verified responses for high-frequency queries.
 - Use async verification: return a provisional answer labeled 'pending verification', then update when confirmation arrives.
 - Adopt early-exit models: if a distilled model reaches high confidence, skip the heavy pipeline.
The system design should be graceful under load - predictable degradation beats intermittent failure."

Interviewer: "What quick wins deliver trust early in this case?"

You: "Three quick wins:
 - Add provenance footers to every reply so users see sources.
 - Implement conservative fallbacks for low-confidence queries.
 - Instrument a 'why' button that surfaces the top-3 evidence items and the verifier score."

Interviewer: "Okay, how do you justify engineering cost?"

You: "I'd tie trust to business KPIs: reduce escalations, improve first-contact resolution, and lower compliance risk. One prevented incident often justifies weeks of engineering."
