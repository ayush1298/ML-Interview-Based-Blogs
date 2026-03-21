The discussion is for a Gen AI Engineer role at OpenAI.

Interviewer: "Your AI system works perfectly in demos… but breaks in production. Why?"

You: "Because demos test prompts.
Production tests systems.
And most AI systems aren't engineered for reality."

Interviewer: "What do you mean by that?"

You: "In real-world environments, everything is messy.
 - Inputs vary.
 - Dependencies fail.
 - Latency spikes.
 - Models behave unpredictably.
A single prompt tweak won't fix that."

Interviewer: "So what's the missing piece?"

You: "Harness engineering.
It's about building the infrastructure around the model to make it reliable, testable, and scalable."

Interviewer: "Infrastructure? For prompts?"

You: "Not just prompts.
Think of it like this:
 > You don't just run a model.
    You wrap it in a harness that controls how it behaves."

Interviewer: "What does that harness include?"

You:
 1. Structured evaluations - test outputs systematically, not anecdotally.
 2. Observability - trace every request, response, and failure.
 3. Guardrails - enforce constraints so outputs stay within bounds.
 4. Iteration loops - continuously refine prompts, tools, and flows.

Interviewer: "So you're treating LLMs like software systems?"

You: "Exactly.
Because they are.
Probabilistic ones."

Interviewer: "And without this harness?"

You: "You're flying blind.
 - No reproducibility.
 - No debugging.
 - No confidence in outputs."

Interviewer: "So the problem isn't model quality?"

You: "Not usually.
It's everything around the model.
 - The orchestration.
 - The evaluation.
 - The feedback loop."

Interviewer: "So what's the real shift here?"

You: "We're moving from prompt engineering to system engineering.
The winners won't be the ones with the cleverest prompts…
but the ones with the most robust harness."

Interviewer: "So building AI isn't about asking better questions?"

You: "It's about building systems that can handle bad answers."
