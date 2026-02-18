You're in a Staff AI Engineer interview at Anthropic. The interviewer sets a trap:

"Your autonomous research agent is stuck in an infinite loop. It keeps calling search tools, reading pages, and summarizing, but never decides it's actually 𝘥𝘰𝘯𝘦. How do you fix the termination logic?"

90% of candidates walk right into the trap.

They say:
"I'd set max_iterations = 10 to force a stop."
"I'd update the system prompt to say: 𝘋𝘦𝘤𝘪𝘥𝘦 𝘸𝘩𝘦𝘯 𝘺𝘰𝘶 𝘩𝘢𝘷𝘦 𝘦𝘯𝘰𝘶𝘨𝘩 𝘪𝘯𝘧𝘰𝘳𝘮𝘢𝘵𝘪𝘰𝘯."

The interviewer smiles, writes something down, and they never get the offer.

Why? Because they tried to fix a reasoning failure with a runtime patch.

If an agent doesn't know what "𝘥𝘰𝘯𝘦" looks like, giving it 10 iterations just means it will waste 10 expensive steps instead of infinite ones. It's still failing, you just capped the bill.

The reality is that LLMs are probabilistic engines in a deterministic world. They don't "𝘬𝘯𝘰𝘸" when they are finished, they only know when they predict a stop token.

To fix this, you need to implement The 𝐎𝐮𝐭𝐜𝐨𝐦𝐞 𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐆𝐚𝐭𝐞.

Instead of asking the agent "Are you done?", you architect a separate control layer:
1️⃣ 𝐃𝐞𝐟𝐢𝐧𝐞 𝐃𝐞𝐭𝐞𝐫𝐦𝐢𝐧𝐢𝐬𝐭𝐢𝐜 𝐒𝐮𝐜𝐜𝐞𝐬𝐬: The exit condition is never "when the answer is good." It is "when the output schema contains a non-null final_answer field" or "when the retrieved data covers 3/3 user constraints."
2️⃣ 𝐓𝐡𝐞 "𝐂𝐫𝐢𝐭𝐢𝐜" 𝐋𝐨𝐨𝐩: You deploy a smaller, cheaper model (e.g., GPT-4o-mini or a fine-tuned Llama 3) acting as a Supervisor. Its only job is to look at the Agent's scratchpad and the User's Goal.
- If the goal is met -> Force Termination.
- If not -> Reject the "stop" command and inject specific feedback ("You missed the date of the merger").
3️⃣ 𝐒𝐭𝐚𝐭𝐞-𝐁𝐚𝐬𝐞𝐝 𝐓𝐞𝐫𝐦𝐢𝐧𝐚𝐭𝐢𝐨𝐧: The agent stops when the environment state changes (e.g., a file is written, a test passes), not when the context window fills up.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Autonomy without boundaries isn't intelligence, it's just expensive recursion. I don't trust the model to self-terminate. I build an external Verification Gate that grounds completion in verifiable state changes, not just model vibes."
