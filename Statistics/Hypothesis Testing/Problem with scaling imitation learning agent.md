You're in a Machine Learning interview at Google DeepMind the interviewer asks:

"We have an imitation learning agent that is underfitting complex human driving data. A junior engineer suggests scaling the backbone network size by 10x to 𝘪𝘯𝘤𝘳𝘦𝘢𝘴𝘦 𝘤𝘢𝘱𝘢𝘤𝘪𝘵𝘺. We are currently using a simple Gaussian output head. Why will scaling the network fail to solve the problem, no matter how much compute you throw at it?"

Most of candiadates say: "The model is underfitting, so the hypothesis space is too small. Increasing the parameter count will allow the network to learn more complex features and better map states to actions."

They just failed the interview since they burned a million dollars in compute to get the exact same failure.

The bottleneck here isn't 𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧 𝐄𝐱𝐩𝐫𝐞𝐬𝐬𝐢𝐯𝐢𝐭𝐲 (𝘩𝘰𝘸 𝘴𝘮𝘢𝘳𝘵 𝘵𝘩𝘦 𝘯𝘦𝘶𝘳𝘢𝘭 𝘯𝘦𝘵 𝘪𝘴), it's 𝐃𝐢𝐬𝐭𝐫𝐢𝐛𝐮𝐭𝐢𝐨𝐧 𝐄𝐱𝐩𝐫𝐞𝐬𝐬𝐢𝐯𝐢𝐭𝐲 (𝘸𝘩𝘢𝘵 𝘵𝘩𝘦 𝘯𝘦𝘶𝘳𝘢𝘭 𝘯𝘦𝘵 𝘪𝘴 𝘢𝘭𝘭𝘰𝘸𝘦𝘥 𝘵𝘰 𝘴𝘢𝘺).

If your output head is 𝐚 𝐬𝐢𝐧𝐠𝐥𝐞 𝐆𝐚𝐮𝐬𝐬𝐢𝐚𝐧 (μ, σ), you are mathematically forcing the model to be 𝘶𝘯𝘪𝘮𝘰𝘥𝘢𝘭.

Here is the reality of production robotics:
- 𝘛𝘩𝘦 𝘋𝘢𝘵𝘢: In a specific scenario, 50% of human drivers go Left. 50% go Right. This is a multimodal distribution.
- 𝘛𝘩𝘦 𝘔𝘰𝘥𝘦𝘭: A Gaussian head cannot represent two peaks. It must find a single mean.
- 𝘛𝘩𝘦 𝘙𝘦𝘴𝘶𝘭𝘵: (Left + Right) / 2 = Straight.

Your 10x larger model will simply become 𝘦𝘹𝘵𝘳𝘦𝘮𝘦𝘭𝘺 𝘤𝘰𝘯𝘧𝘪𝘥𝘦𝘯𝘵 at driving straight into the median divider.

You are trying to describe a fork in the road using a language that only has words for straight lines.

To fix this, you don't scale parameters. You change the output topology:
1️⃣ Gaussian Mixture Models (GMMs): Allow multiple modes.
2️⃣ Discretization: Tokenize the action space (like LLMs).
3️⃣ Diffusion Policies: iteratively denoise to handle complex, non-linear distributions.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

“Scaling the backbone only improves how well you calculate the parameters, but it doesn’t change what the parameters can represent. If the output head suffers from 𝘔𝘦𝘢𝘯 𝘊𝘰𝘭𝘭𝘢𝘱𝘴𝘦 due to unimodal constraints, you need a more expressive distribution class (𝘭𝘪𝘬𝘦 𝘋𝘪𝘧𝘧𝘶𝘴𝘪𝘰𝘯 𝘰𝘳 𝘎𝘔𝘔𝘴), not a bigger network.”
