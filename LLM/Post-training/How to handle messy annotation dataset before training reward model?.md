You're in a Senior Interview at OpenAI. The interviewer hands you a messy dataset:

Annotator 1 says Response A > Response B.
Annotator 2 says Response B > Response C.
Annotator 3 says Response C > Response A.

"How do you clean this data before training your Reward Model?"

90% of candidates walk right into the trap.

They say: "The data is noisy. The annotators are disagreeing, so we have no ground truth. I would run a consensus filter (e.g., majority vote) or just delete these conflicting samples to avoid confusing the model."

Here is why they don't get the job: They just confused 𝘯𝘰𝘪𝘴𝘦 with 𝘯𝘶𝘢𝘯𝘤𝘦.

𝘏𝘶𝘮𝘢𝘯 𝘱𝘳𝘦𝘧𝘦𝘳𝘦𝘯𝘤𝘦𝘴 𝘢𝘳𝘦 𝘢𝘭𝘮𝘰𝘴𝘵 𝘯𝘦𝘷𝘦𝘳 𝘴𝘵𝘳𝘪𝘤𝘵𝘭𝘺 𝘩𝘪𝘦𝘳𝘢𝘳𝘤𝘩𝘪𝘤𝘢𝘭. 𝘛𝘩𝘦𝘺 𝘢𝘳𝘦 𝘰𝘧𝘵𝘦𝘯 𝘪𝘯𝘵𝘳𝘢𝘯𝘴𝘪𝘵𝘪𝘷𝘦 (𝘙𝘰𝘤𝘬 > 𝘗𝘢𝘱𝘦𝘳 > 𝘚𝘤𝘪𝘴𝘴𝘰𝘳𝘴 > 𝘙𝘰𝘤𝘬).

If they "clean" this data, they are forcing a flat, linear ranking onto a complex, cyclic reality. They aren't removing noise, they are removing the signal that tells the model, "These three options are equally valid but distinct."

-----
The Solution: 𝐓𝐡𝐞 𝐁𝐫𝐚𝐝𝐥𝐞𝐲-𝐓𝐞𝐫𝐫𝐲 𝐋𝐨𝐨𝐩

A Senior Engineer knows that a Reward Model (RM) is not a "Truth Machine." It is a probability estimator.

Under the hood, the RM minimizes the negative log likelihood of the preferred output. It uses the Bradley-Terry model, where the probability of A beating B is a sigmoid of their reward difference:

P(A > B) = σ(r_A − r_B) = 1 / (1 + e^(−(r_A − r_B)))

When fed a "Rock-Paper-Scissors" loop (A > B, B > C, C > A), the optimizer doesn't explode. It does something elegant:

- It Compresses the Rewards: To minimize loss across all 3 conflicting pairs, the gradients push r_A ≈ r_B ≈ r_C.
- It Maximizes Entropy: The model converges to predicting a ~50% win rate for any pair in the loop.

This is the correct behavior. It tells the Policy (the LLM) that there is no clear winner here, preserving the ambiguity rather than hallucinating a false hierarchy.

-----
𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝

"Don't filter for consensus. Intransitive data isn't an error, it's a topology. Let the Bradley-Terry loss compress the rewards of cyclic preferences so the model learns the inherent ambiguity of the prompt."
