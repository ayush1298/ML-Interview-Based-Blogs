1 day ago • Visible to anyone on or off LinkedIn
You're in a Senior AI Research Scientist interview at DeepSeek AI and the interviewer asks:

"We have three massive datasets: 𝘎𝘦𝘯𝘦𝘳𝘢𝘭 𝘛𝘦𝘹𝘵, 𝘚𝘰𝘶𝘳𝘤𝘦 𝘊𝘰𝘥𝘦, and 𝘴𝘱𝘦𝘤𝘪𝘢𝘭𝘪𝘻𝘦𝘥 𝘔𝘢𝘵𝘩 𝘱𝘳𝘰𝘣𝘭𝘦𝘮𝘴. To build a State-of-the-Art Math reasoner, in what order do you feed this data during pre-training, and why?"

Most candidates say: "Just shuffle them all together into one big dataset to avoid catastrophic forgetting."

This answer works for general-purpose chatbots, but it caps their ceiling for complex reasoning tasks.

The reality is that data composition is a curriculum, not a soup.

DeepSeek Math experiments proved that a simple "𝐌𝐢𝐱-𝐚𝐥𝐥-𝐚𝐭-𝐨𝐧𝐜𝐞" strategy is suboptimal. The winning formula is a specific multi-stage pipeline: 𝐆𝐞𝐧𝐞𝐫𝐚𝐥 𝐓𝐞𝐱𝐭 → 𝐂𝐨𝐝𝐞 → 𝐌𝐚𝐭𝐡.

Here is the senior-level logic you need to explain:
1️⃣ We don't train on code just so the model can write Python. We train on code because programming languages enforce strict, step-by-step logic and dependency tracking.

2️⃣ Learning to compile code teaches the model to structure its "thoughts" linearly. It acts as a prerequisite for mathematical deduction.

3️⃣ If you skip the Code stage and jump straight to Math, you get a model that has memorized formulas but lacks the execution stack to apply them to novel problems.

Think of it like this:
- General Text teaches the model "Vocabulary."
- Code teaches the model "Grammar of Logic."
- Math applies that logic to "Specific Problems."

If you try to teach Calculus (Math) before you teach Logic (Code), the model will hallucinate the steps.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"We don't treat Code data as a domain task; we treat it as a reasoning primitive. The optimal curriculum is General → Code → Math because the structural rigor learned from code aligns the model’s internal representations, enabling the chain-of-thought capabilities required for high-level mathematics."
