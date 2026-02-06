Interview follow up for a Generative AI Engineer role at Cohere.

Interviewer: "Last time you said intelligence is recall with relevance, not context length. So why do systems with memory still fail?"

You: "Because most teams build storage, not memory.
 Saving everything is lazy architecture.
 And a bigger context window is not enough.
 More context just means more chances to retrieve the wrong thing confidently."

Interviewer: "So what actually breaks systems?"

You: "Recall without relevance.
 If everything is retrieved, nothing is trusted."

Interviewer: "How do you fix it?"

You:
 1. Summarize for intent, not completeness and definitely not blindly - keep original source of truth and version summaries.
 2. Retrieve based on task, not similarity alone.
 3. Periodically re-ground critical answers to the original source.

Interviewer: "And if you do not?"

You: "You get semantic drift.
 The model starts learning from its own echoes."

Interviewer: "Final take?"

You: "Context length stores text.
 Memory architecture decides intelligence.
 Recall with relevance always beats recall at scale."
