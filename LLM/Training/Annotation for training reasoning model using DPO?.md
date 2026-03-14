You’re in a Machine Learning interview at DeepSeek AI and the lead researcher asks:

"We want to train a reasoning model using 𝐃𝐢𝐫𝐞𝐜𝐭 𝐏𝐫𝐞𝐟𝐞𝐫𝐞𝐧𝐜𝐞 𝐎𝐩𝐭𝐢𝐦𝐢𝐳𝐚𝐭𝐢𝐨𝐧 (𝐃𝐏𝐎), but we have zero budget for human annotators. How do we procedurally generate high-quality 𝘞𝘪𝘯𝘯𝘦𝘳 𝘷𝘴. 𝘓𝘰𝘴𝘦𝘳 pairs from the model's own generations?"

Most of candidates say: "We should use a stronger model like GPT-4 to score the outputs and create labels (LLM-as-a-Judge)."

𝐖𝐡𝐲 𝐭𝐡𝐢𝐬 𝐟𝐚𝐢𝐥𝐬: It's expensive, slow, and fundamentally limited by the teacher model's ceiling. You aren't teaching reasoning, you're just distilling bias.
The real bottleneck isn't "who judges the answer," it's how we isolate the error.

You don't need humans. You need 𝐄𝐱𝐞𝐜𝐮𝐭𝐢𝐨𝐧 𝐅𝐞𝐞𝐝𝐛𝐚𝐜𝐤.

In domains like Math or Coding, 𝘎𝘳𝘰𝘶𝘯𝘥 𝘛𝘳𝘶𝘵𝘩 is deterministic (the code runs, or the answer is 8). We leverage this to create 𝐒𝐞𝐥𝐟-𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐏𝐫𝐞𝐟𝐞𝐫𝐞𝐧𝐜𝐞 𝐏𝐚𝐢𝐫𝐬.

Here is the production recipe:
1️⃣ Sample N different solution traces from your current policy π_θ for a single prompt.

2️⃣ Run the code or check the final math answer against the ground truth.
- Winner (y_w): Any trace that reaches the correct final answer.
- Loser (y_l): Any trace that fails or errors out.

3️⃣ The most valuable pairs are those that share the exact same reasoning steps up to a "branching point."
y_w: [Prefix] -> [Step 4: Correct Logic] -> Success
y_l: [Prefix] -> [Step 4: Hallucination] -> Failure

By keeping the prefix identical, DPO forces the gradient to focus purely on the divergence point. It minimizes the likelihood of the spurious step that derailed the logic, effectively solving the credit assignment problem without a single human in the loop.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:
"We replace human preference with Ground Truth Verification. By pairing self-generated correct solutions against incorrect ones, specifically those sharing a common prefix, we turn the model's own failures into the exact gradient signal needed to fix its logic."
