You are in a Uber Applied Scientist interview.

The interviewer asks:
"Why does latency become such a hard problem in GenAI systems?"

You pause.

Most people say models are slow.

You shake your head.
"Models are only part of it. The real cost comes from orchestration."

You explain.
"Real systems do retrieval, filtering, tool calls, validation, and retries. Each step adds delay. Individually small. Collectively painful."

The interviewer nods.
"So where do teams go wrong?"

You continue.
"They optimize the model before optimizing the flow. Or they add guardrails without budgeting time."

They ask.
"How do you design around that?"

You answer.
"Parallelize aggressively. Cache intermediate results. Fail fast on low-confidence paths. And decide upfront which steps are optional."

You pause, then add.
"Latency is not just a performance issue. It shapes product behavior. Users change how they interact when responses slow down."

You conclude.
"GenAI systems are not slow because models are large.
 They are slow because decisions are layered."

Good system design is knowing which layers matter.
