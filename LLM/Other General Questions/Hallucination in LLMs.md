Interviewer (for an Applied LLM Scientist role):
"Everyone keeps saying hallucinations are the biggest problem in LLMs. If you had to reduce them, where would you start?"

You: "I'd start by not treating hallucination as the core issue.
 It's not the disease - it's the symptom.
 Hallucinations usually happen when the model is missing one of three things:
 - The right context
 - The right constraints
 - The right confidence boundaries
 Fix those, and hallucination drops dramaticaly."

Interviewer: "Are you saying model behavior isn't the real cause?"

You: "Yep. The model is doing what it's designed to do - generate plausible text.
 The real question is: did we design the system around it well enough?
 Before blaming the model, I always ask:
 - What information did the model have at the moment it hallucinated?
 Most times, the answer is: not enough, or the wrong context altogether."

You pause, then ask: "If you ask a human a question but hide half the facts, would they guess?"

Interviewer: "Of course."

You: "And LLMs do the same.
When retrieval fails or context is noisy, they compensate by inventing answers. Not maliciously - mechanically."

Interviewer: "So grounding fixes hallucination?"

You: "Grounding reduces it - design fixes it.
 The full picture needs:
 1. Retrieval quality - insert the right context, not just any context.
 2. Guardrails - define what the model should decline.
 3. Verification - cross-check facts using tools or structured sources.
 4. Decomposition - break the question into smaller, verifiable steps.
 Hallucination is often a sign of poor orchestration, not poor intelligence."

Interviewer: "What about bigger models? Don't they hallucinate less?"

You: "They do - but not because they're more truthful.
 They're just better at staying consistent with patterns.
 Give even a trillion-parameter model the wrong document and it will hallucinate with confidence."

Interviewer (raising a challenge): "So how do you measure hallucinations?"

You: "You don't just measure outputs - you measure decision pointers.
 I check:
 - Did retrieval fetch relevant chunks?
 - Was the prompt well-scoped?
 - Did the agent attempt a tool call before guessing?
 - Did the system allow a - I don't know fallback?
 Hallucination disappears when the system lets the model admit uncertainty."

Interviewer: "So what's your definition of hallucination?"

You: "It's the model telling a fluent story without a factual spine.
 But the fix isn't demanding truth from the model - it's giving it enough structure so truth is the path of least resistance."
