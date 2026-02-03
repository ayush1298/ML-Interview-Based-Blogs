You’re in an ML Systems interview at Anthropic. The interviewer asks:

“We’re rolling out a customer support AI agent that reads tickets, calls internal tools, issues refunds, and updates accounts.
How would you design an evaluation strategy so we can trust this agent in production, and what tradeoff are you managing?”

Don’t answer: “I’d track accuracy, latency, and CSAT.”

That’s the what, not the why.
Agents aren’t single-turn models; they’re policies interacting with an environment.
You don’t just evaluate outputs — you evaluate trajectories (the whole sequence of actions).

For production support agents, there are two evaluation layers that matter:

Policy-Level Evaluation (How the agent behaves)

Given a ticket, did the agent make good decisions?
 • Right tools? (refunds, lookup, routing)
 • Reasonable step sequence?
 • Recover from tool/API errors?
 • Escalate when unsure or out of policy?

You use:
 • Synthetic scenarios + log replays
 • LLM judges over traces, not just answers
 • Metrics: valid tool-call rate, unnecessary calls, recovery rate, safe escalations

This tells you: Is the policy sane and on-procedure?

System-Level Evaluation (What the customer feels)

End-to-end: did we safely solve the problem?

You track:
 • Task success rate
 • Time-to-resolution
 • Cost per resolved ticket
 • Safety incidents (bad refunds, PII leaks, policy breaks)
 • Escalation rate + QA on escalated cases

You run:
 • Shadow mode
 • Canaries on a small % of traffic
 • A/B tests vs scripted bots or human-only

This tells you: Is the system safe, efficient, and worth scaling?

The answer that gets you hired:

“I don’t evaluate a support agent like a static LLM; I evaluate its behavior over time. I split evaluation into policy-level and system-level.

At the policy level, I build synthetic tasks and log-replay suites where an LLM judge scores full traces: tool choice, sequencing, recovery from errors, and escalation quality. At the system level, I run the agent in shadow and canary modes, tracking task success, time-to-resolution, cost per ticket, and safety incidents.

The core tradeoff is autonomy vs assurance: the more we let the agent touch refunds and accounts directly, the more rigorous and trajectory-aware our evaluations, guardrails, and online monitoring must be to keep customers safe while still getting leverage from automation.”
