The interview is for a GenAI Engineer role at Amazon.
Interviewer: "Your autonomous agent keeps looping - it never decides it's done. What's happening?"

You: "That's a well-known termination problem.
Agents reason step-by-step, but without clear success conditions, they can drift like an intern who keeps 'researching' forever."

Interviewer: "So it's a reasoning failure?"

You: "Partly.
Agents rely on LLMs to self-evaluate progress.
If the feedback loop isn't grounded. meaning, it doesn't verify against real results - the model assumes it's still mid-task."

Interviewer: "How do you fix it?"

You:
 1. Define completion signals: Use explicit criteria like "stop when file exists" or "when answer confidence > 0.9".
 2. Add external verification: Let another lightweight model or rule set validate if the goal was achieved.
 3. Set reasoning limits: e.g., 5 tool calls or 10 reasoning loops max.
 4. Design a 'reflect' step: After each loop, ask the model, "Have you achieved the goal? If yes, summarize and stop."

Interviewer: "So autonomy still needs boundaries?"

You: "tbh yes.
Autonomy without guardrails isn't intelligence - it's recursion.
A well-designed agent isn't the one that does the most steps - it’s the one that knows when it needs to act and when it's done."
