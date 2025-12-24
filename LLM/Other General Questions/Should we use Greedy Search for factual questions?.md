You're in a Senior ML Interview at OpenAI. The interviewer sets a trap:

"We need a low-latency geography trivia bot. Since the questions are factual, should we just use 𝘎𝘳𝘦𝘦𝘥𝘺 𝘚𝘦𝘢𝘳𝘤𝘩 to save compute?"

90% of candidates walk right into the "Yes" trap.

They say "Yes. 𝘎𝘳𝘦𝘦𝘥𝘺 𝘚𝘦𝘢𝘳𝘤𝘩 is O(N), extremely fast, and if the model is well-trained, taking the highest probability token at each step (𝘢𝘳𝘨𝘮𝘢𝘹) should logically yield the most probable correct answer."

This fails because they are confusing 𝐋𝐨𝐜𝐚𝐥 𝐎𝐩𝐭𝐢𝐦𝐚 with 𝐆𝐥𝐨𝐛𝐚𝐥 𝐎𝐩𝐭𝐢𝐦𝐚.

Greedy decoding cannot backtrack. Once it commits to a token, it is locked in forever, even if that token leads to a dead end.

Consider the probabilities for the next token in the answer to: "Where is The Liberty Bell located?"
- 𝐏("𝐏𝐞𝐧𝐧𝐬𝐲𝐥𝐯𝐚𝐧𝐢𝐚") = 0.4 (The correct answer)
- 𝐏("𝐍𝐞𝐰") = 0.55 (The start of "New York" or "New Jersey")

𝘎𝘳𝘦𝘦𝘥𝘺 𝘚𝘦𝘢𝘳𝘤𝘩 sees 0.55 > 0.4. It immediately locks in "New".

The correct answer ("Pennsylvania") is now mathematically impossible to reach. Your bot just hallucinated a wrong state because it got distracted by a common, high-probability prefix.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: You need to solve for 𝐓𝐡𝐞 𝐆𝐫𝐞𝐞𝐝𝐲 𝐆𝐚𝐫𝐝𝐞𝐧 𝐏𝐚𝐭𝐡.

You don't need expensive exhaustive search, but you do need 𝘉𝘦𝘢𝘮 𝘚𝘦𝘢𝘳𝘤𝘩 with a narrow width (e.g., k=5).

By keeping the top 5 distinct paths active at every timestamp, you allow the model to "𝘤𝘩𝘢𝘯𝘨𝘦 𝘪𝘵𝘴 𝘮𝘪𝘯𝘥." The model might see that while "New" starts strong, the subsequent tokens drop in probability. Meanwhile, the "Pennsylvania" path, though starting lower, accumulates higher total probability over the full sequence.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Never trade global coherence for local probability. Even for low-latency tasks, a Beam Width of 3-5 is the minimum requirement to prevent the model from locking itself into high-probability errors."
