You're in a ML Engineer interview at Microsoft, and the interviewer asks: "How do you evaluate LLM agents in production? What makes agent evaluation different from regular LLM evaluation?"

Here's how you can answer
A. Most candidates fail here because they think agents = chatbots

❌ Wrong. Dead wrong.

Evaluating an LLM agent isn't about measuring "answer quality" or "response time." That's regular LLM evaluation. Agents are autonomous systems that plan, use tools, and make decisions across multiple steps.

✅ Your evaluation framework needs to match that complexity.

A. 𝗘𝗻𝗱-𝘁𝗼-𝗘𝗻𝗱 𝘃𝘀 𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁-𝗟𝗲𝘃𝗲𝗹 𝗘𝘃𝗮𝗹𝘂𝗮𝘁𝗶𝗼𝗻 - The difference that matter
❌ Junior engineers only test end-to-end. ✅ Senior engineers test both layers:
End-to-End: Did the agent complete the task? Treats the system as a black box. Good for catching surface issues.

Component-Level: Which specific component failed? The retriever? The tool call? The reasoning step? Essential for debugging complex agents. LLM Agent Evaluation: Assessing Tool Use, Task ...

Here's the kicker: An agent might have a multi-retriever setup, and end-to-end testing will only tell you "retrieval needs improvement" — but won't tell you if Retriever A or Retriever B is the bottleneck. LLM Agent Evaluation: Assessing Tool Use, Task ...

Component-level testing finds the lowest-hanging fruit.

B. 𝗧𝗼𝗼𝗹-𝗖𝗮𝗹𝗹𝗶𝗻𝗴 𝗘𝘃𝗮𝗹𝘂𝗮tion - The make-or-break metric for Level 2 agents
Your agent has 12 tools available. It needs to book a flight. Instead, it checks the weather, converts currency, THEN searches for flights. LLM Agent Evaluation: Assessing Tool Use, Task ...
Technically correct. Practically unusable.
You need TWO critical metrics:

1. 𝗧𝗼𝗼𝗹 𝗖𝗼𝗿𝗿𝗲𝗰𝘁𝗻𝗲𝘀𝘀 - Did the agent call the RIGHT tools? LLM Agent Evaluation: Assessing Tool Use, Task ...
This breaks into 3 levels of strictness:
✳️ Tool Selection: Were the correct tools chosen?
✳️ Input Parameters: Were the correct arguments passed?
✳️ Output Accuracy: Did the tools return expected results?

Tool Correctness doesn't have to be binary. Order might not matter. Frequency might be flexible. A medical AI agent could query "patient symptom checker" after "medical history database" instead of before — as long as both tools are used correctly. LLM Agent Evaluation: Assessing Tool Use, Task ...

2. 𝗧𝗼𝗼𝗹 𝗘𝗳𝗳𝗶𝗰𝗶𝗲𝗻𝗰𝘆 - Did the agent take the shortest path?
Deterministic methods:
✳️ Redundant Tool Usage: % of unnecessary tool calls
✳️ Tool Frequency: Tools called more than required threshold
But here's the problem: Tool-calling behavior gets branched, nested, and convoluted fast. LLM Agent Evaluation: Assessing Tool Use, Task ...

Better approach? Use an LLM-as-judge to evaluate if the tool trajectory was the most efficient method given available tools.

Evaluation isn't a checkpoint. It's the foundation. LLM Agent Evaluation: Assessing Tool Use, Task ...
