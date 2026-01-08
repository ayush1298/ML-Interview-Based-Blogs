The interview is for a Gen AI Engineer role at Amex.

Interviewer: "Your RAG pipeline still hallucinates even with solid retrieval. Why?"

You: "Because RAG reduces hallucination - it doesn't eliminate it.
The issue isn't missing data, it's missing discipline in how the LLM uses that data."

Interviewer: "Go on."

You: "The LLM sees retrieved chunks as suggestions, not ground truth.
If the prompt isn't explicitly designed to constrain reasoning, the model will happily 'fill gaps'.
That's why prompt engineering and retrieval engineering must evolve together."

Interviewer: "Umm okay, how do you enforce discipline?"

You:
 - Use source-attribution prompts like: "Only answer using the following passages."
 - Add confidence scoring: if retrieval score < threshold, respond with fallback.
 - Use answer post-validation: cross-check with retrieved text before final output.
 - Train a small verifier model to detect ungrounded claims.

Interviewer: "Isn't that extra complexity?"

You: "Yes - but cheaper than losing trust.
In enterprise settings, one confident wrong answer can collapse adoption."

Interviewer: "So hallucinations aren't model bugs - they’re system design bugs?"

You: "Yep.
You can't prompt your way out of hallucinations.
You design your way out - with retrieval discipline, governance, and human feedback loops."
