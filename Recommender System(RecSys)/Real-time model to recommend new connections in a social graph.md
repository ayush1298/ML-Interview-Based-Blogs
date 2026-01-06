You're in a Senior ML System Design interview at LinkedIn. The interviewer sets a specific trap:

"We have 500 million users in a social graph. We need a real-time model to recommend new connections. Design the architecture."

90% of candidates walk right into the buzzword trap.

The reflex is immediate. "It's a graph structure, so we need a 𝘎𝘳𝘢𝘱𝘩 𝘕𝘦𝘶𝘳𝘢𝘭 𝘕𝘦𝘵𝘸𝘰𝘳𝘬 (𝘎𝘕𝘕). I would implement 𝘎𝘳𝘢𝘱𝘩𝘚𝘈𝘎𝘌 or 𝘎𝘈𝘛 to aggregate neighbor features and capture the non-Euclidean topology."

It feels like the "Textbook" answer. It's theoretically perfect. It's also wrong.

The interviewer looks at you and says:

"Great. You just increased inference latency by 100x and infrastructure costs by 50% compared to our current stack. We need to serve 50k requests per second. Your system is 𝘶𝘯-𝘴𝘩𝘪𝘱𝘱𝘢𝘣𝘭𝘦."

You fell for the SOTA Trap. You optimized for 𝐌𝐨𝐝𝐞𝐥 𝐍𝐨𝐯𝐞𝐥𝐭𝐲 instead of 𝐒𝐲𝐬𝐭𝐞𝐦 𝐔𝐭𝐢𝐥𝐢𝐭𝐲.
------
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: Real-world production systems don't start with Deep Learning; they end there. 

The Senior Engineer avoids The 𝐂𝐨𝐦𝐩𝐥𝐞𝐱𝐢𝐭𝐲 𝐂𝐥𝐢𝐟𝐟 by following a strict value hierarchy:
- 𝘛𝘩𝘦 𝘏𝘦𝘶𝘳𝘪𝘴𝘵𝘪𝘤 𝘍𝘭𝘰𝘰𝘳: Hard-coded rules (e.g., "If users share >50 mutual friends, suggest link"). This covers 60% of the volume with near-zero latency.
- 𝘛𝘩𝘦 𝘛𝘢𝘣𝘶𝘭𝘢𝘳 𝘉𝘳𝘪𝘥𝘨𝘦: Featurize the graph stats (𝐏𝐚𝐠𝐞𝐑𝐚𝐧𝐤, 𝐃𝐞𝐠𝐫𝐞𝐞, 𝐀𝐝𝐚𝐦𝐢𝐜-𝐀𝐝𝐚𝐫 𝐢𝐧𝐝𝐞𝐱) and feed them into a Gradient Boosted Tree (𝐗𝐆𝐁𝐨𝐨𝐬𝐭/𝐋𝐢𝐠𝐡𝐭𝐆𝐁𝐌). This covers the next 25% of cases efficiently.
- 𝘛𝘩𝘦 𝘋𝘦𝘦𝘱 𝘓𝘦𝘢𝘳𝘯𝘪𝘯𝘨 𝘊𝘦𝘪𝘭𝘪𝘯𝘨: You only deploy the GNN for the final, hardest 15% of edge cases where the simpler models fail to capture the signal.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"I will earn the right to build a GNN only after a heuristic baseline and a lightweight tree-based model stop delivering ROI. We don't burn GPU credits on problems we can solve with a GROUP BY statement."
