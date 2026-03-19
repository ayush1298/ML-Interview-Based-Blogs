You are in a ML Engineer interview at Anthropic. The interviewer sets a trap:

"We need to scale our RLHF dataset 10x. To maximize variety, we present human labelers with two model outputs generated from different user prompts (e.g., Response A to Prompt X vs. Response B to Prompt Y). We ask them to pick the better response."

"Why is this data mathematically useless?"

95% of candidates start talking about "subjectivity" or "labeler noise." They fail immediately.

The candidate argues that comparing apples to oranges is just "hard for the labeler." They suggest that if we just hire better linguists or create stricter guidelines, we can still learn which model is generally smarter.

They assume the issue is quality, not math.

The problem isn't that the task is hard. The problem is that the preference signal is effectively zero.

In a Bradley-Terry reward model (the standard for RLHF), we model the probability of preference as the difference in rewards:

P(A > B) = σ(r(x, y_A) − r(x, y_B))

Notice the variable x (the prompt). If you change the prompt for each response (x_1 vs x_2), you are no longer measuring the quality of the response. You are measuring the difficulty of the prompt.

If Prompt A is "Write a poem" and Prompt B is "Solve this PDE," and the model fails the PDE, the labeler picks A. The Reward Model doesn't learn "Response A is good." It learns "Poems are easier than PDEs."

You have introduced the 𝐂𝐨𝐧𝐭𝐞𝐱𝐭 𝐂𝐨𝐧𝐟𝐨𝐮𝐧𝐝.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To train a valid Reward Model, the prompt (x) must be the control variable.

You must hold the prompt constant across the pair. The mathematical assumption of the Bradley-Terry model is that we are ranking y given x. Without a shared x, the reward difference Δr loses its anchor, and the gradient updates become noise.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Comparing across different prompts violates the independence assumption of the Bradley-Terry model. We aren't learning reward r(x,y), we're learning a bias toward easier prompts. To fix this, we must enforce 𝘚𝘵𝘳𝘪𝘤𝘵 𝘗𝘳𝘰𝘮𝘱𝘵 𝘊𝘰𝘯𝘴𝘪𝘴𝘵𝘦𝘯𝘤𝘺: P(A > B | x). The prompt is the anchor, without it, the preference bit provides zero information gain."
