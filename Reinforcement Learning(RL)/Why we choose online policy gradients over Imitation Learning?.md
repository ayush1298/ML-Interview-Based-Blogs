You're in a Machine Learning Engineer interview at NVIDIA and the lead researcher asks:

"We have a massive dataset of human expert demonstrations for this task. Why shouldn’t we just stick with 𝘐𝘮𝘪𝘵𝘢𝘵𝘪𝘰𝘯 𝘓𝘦𝘢𝘳𝘯𝘪𝘯𝘨 (𝘉𝘦𝘩𝘢𝘷𝘪𝘰𝘳 𝘊𝘭𝘰𝘯𝘪𝘯𝘨)? Why take on the instability of 𝘖𝘯𝘭𝘪𝘯𝘦 𝘗𝘰𝘭𝘪𝘤𝘺 𝘎𝘳𝘢𝘥𝘪𝘦𝘯𝘵𝘴?"

Don't say: "Because Reinforcement Learning is just better..." or "Because the model might overfit the training data."

This is too vague and ignores the fundamental mathematical difference.

The reality is that 𝐈𝐦𝐢𝐭𝐚𝐭𝐢𝐨𝐧 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠 (𝐈𝐋) has a hard ceiling. It treats the expert as the "ground truth," meaning your model can, at best, only be as good as the human providing the data.

To explain why we switch to 𝐎𝐧𝐥𝐢𝐧𝐞 𝐏𝐨𝐥𝐢𝐜𝐲 𝐆𝐫𝐚𝐝𝐢𝐞𝐧𝐭𝐬 (𝐏𝐆), you need to hit three specific points:

1️⃣ 𝘛𝘩𝘦 𝘗𝘦𝘳𝘧𝘰𝘳𝘮𝘢𝘯𝘤𝘦 𝘊𝘦𝘪𝘭𝘪𝘯𝘨:
IL maximizes the likelihood of expert actions. It's strictly limited by human capability.
Online PG maximizes the expected sum of rewards. This allows the agent to discover superhuman strategies that the expert never considered.

2️⃣ 𝘛𝘩𝘦 “𝘊𝘰𝘷𝘢𝘳𝘪𝘢𝘵𝘦 𝘚𝘩𝘪𝘧𝘵” 𝘛𝘳𝘢𝘱:
Expert data usually contains only "correct" paths. If your IL model deviates slightly (which it will), it lands in a state it has never seen before and fails catastrophically.
Because it never saw the expert make a mistake, it doesn’t know how to recover. Online RL forces the agent to experience failures and learn recovery policies.

3️⃣ 𝘖𝘱𝘵𝘪𝘮𝘪𝘻𝘢𝘵𝘪𝘰𝘯 𝘷𝘴. 𝘔𝘪𝘮𝘪𝘤𝘳𝘺:
Imitation is trying to paint a picture by tracing over someone else's lines.
Policy Gradients are learning to paint by seeing what actually sells at the gallery.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝: "Imitation Learning minimizes the distance to the expert's behavior. Policy Gradients maximize the distance to failure. If you want to outperform the human, you must stop mimicking them and start optimizing the reward directly."
