The interview is for an AI Architect role at Microsoft.

Interviewer: "Alright, imagine you've built this fancy multi-agent system. Agents talking to each other, calling tools, passing results aroundand stuff.
But how do you keep all of that secure? Especially the tool calls?"

You: "Before I jump in - 
Is this a setup where agents can directly call tools, or do all tool invocations route through a controller?"

Interviewer: "Assume everything goes through a central orchestrator."

You: "Great. Then the way I secure it is simple:
No agent talks to a tool unless the orchestrator approves it.
And no agent talks to another agent unless the orchestrator shapes the message."

🟦 Part 1 - Let's talk tool access first.

You: "The first rule is:
Agents never know the API keys, endpoints, or secrets behind tools.
They only know:
This tool exists. This is the schema I must use. This is the output I expect.

Everything else stays inside the orchestrator.
So even if Agent A tries to be clever and send something like:
 - Run payroll for all employees in the company
 - The orchestrator asks: Does this agent have permission to call this tool for this user?"

Interviewer: "And how do you define permission?"

You: "A per-agent, per-tool allow-list. And a per-user policy, like RBAC.
Agent A might be allowed to call 'getEmployeeReport', but only for employees in the user's team.
If the user doesn't have access -> request denied."

🟦 Part 2 - Then comes agent-to-agent communication.

Interviewer: "Okay. But what if Agent A tries to leak sensitive info to Agent B?"

You: "That's why we never let agents directly chat with each other.
Every message goes through the orchestrator.
The orchestrator checks:
 - Is this field allowed to be forwarded?
 - Does the receiving agent need this info?
 - Does the user have the right to ultimately see this?
 - Is the schema valid? No extra hidden fields?
If Agent A tries to send:
{ "salary": 250000 }
But Agent B is a 'NarrativeAgent' that shouldn't see raw salaries?
The orchestrator either redacts or blocks it."

🟦 Part 3 - And finally, user-facing safety.

Interviewer: "So even if internally something sensitive was generated, the user shouldn't see it?"

You: "Yes.
No matter what happened inside the agent workflow, the final output is checked again.
Evaluate:
 - Does this violate RBAC?
 - Did an agent accidentally include raw data?
 - Is there tool output that shouldn't be surfaced?
 - Does this leak internal reasoning?
Even summaries get validated.
A summarizer shouldn't re-expose information it never should've seen in the first place."

You (continue): "The models aren't the source of trust.
The orchestrator is.
All security comes from three pillars:
 1. Agents have scoped tool permissions
 2. Agents communicate only through governed channels
 3. Final output is validated before reaching the user

Thats how you keep multi-agent systems powerful and safe - especially in enterprise environments."
