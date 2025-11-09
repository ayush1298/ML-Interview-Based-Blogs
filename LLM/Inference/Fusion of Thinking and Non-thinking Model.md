You're in an interview for a Senior ML Engineer role at Google DeepMind. The interviewer asks: 

"Our new reasoning model is great, but it uses a 2000 token Chain of Thought even for simple questions like 'What is 2+2?'. This is killing our inference budget. How do you fix this without sacrificing its ability to solve complex problems?"

Most candidates say: "I'd train two models, a small, fast one for simple queries and our large reasoning model for hard ones."

Wrong approach. Now you have a complex routing problem, double the hosting costs, and a maintenance nightmare.

The reality: You don't need two models. 𝐘𝐨𝐮 𝐧𝐞𝐞𝐝 𝐨𝐧𝐞 𝐦𝐨𝐝𝐞𝐥 𝐰𝐢𝐭𝐡 𝐭𝐰𝐨 𝐦𝐨𝐝𝐞𝐬.

Your reasoning model 𝘢𝘭𝘳𝘦𝘢𝘥𝘺 knows '2+2=4'. It's just been trained to always show its work, like an over-eager student. You just need to teach it when not to.

This isn't an RL problem. This is a production-level SFT problem.

The solution is "𝐓𝐡𝐢𝐧𝐤𝐢𝐧𝐠 𝐌𝐨𝐝𝐞 𝐅𝐮𝐬𝐢𝐨𝐧":
Step 1. Take your final, fully-trained reasoning model.
Step 2. Create a new fine-tuning dataset with special instruction tags.
Step 3. For hard problems, format it: <𝘵𝘩𝘪𝘯𝘬> [𝘘𝘜𝘌𝘚𝘛𝘐𝘖𝘕] <𝘊𝘰𝘛> ... [𝘈𝘕𝘚𝘞𝘌𝘙]
Step 4. For simple problems, format it: <𝘯𝘰_𝘵𝘩𝘪𝘯𝘬> [𝘘𝘜𝘌𝘚𝘛𝘐𝘖𝘕] [𝘋𝘐𝘙𝘌𝘊𝘛 𝘈𝘕𝘚𝘞𝘌𝘙]

You fine-tune the 𝘴𝘪𝘯𝘨𝘭𝘦 model on this mixed dataset.

Now, your inference-time logic is trivial. For simple queries, just add the <𝘯𝘰_𝘵𝘩𝘪𝘯𝘬> tag to the prompt. The model will suppress its Chain of Thought and answer directly.

No routing, no extra VRAM, same set of weights.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝: 

"Don't build a multi-model routing system - build a single, controllable fusion model. Routing adds cost and complexity.
Fusion adds control and capability. With 𝐓𝐡𝐢𝐧𝐤𝐢𝐧𝐠 𝐌𝐨𝐝𝐞 𝐅𝐮𝐬𝐢𝐨𝐧 you teach one model to decide when to think and when to act.
