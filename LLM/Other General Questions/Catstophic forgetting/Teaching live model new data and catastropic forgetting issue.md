You're in a AI Research Engineer interview at OpenAI and the lead researcher drops this scenario.

"We deleted our original training dataset for GDPR compliance. We need to teach the live model a new class of data today. How do you do it?"

Most candidates say...
"Easy. I'll load the latest model checkpoint and fine-tune it on the new data. Maybe I'll lower the learning rate to be safe."

Wrong. They just lobotomized their model.

By fine-tuning exclusively on new data without the old data present, they have triggered 𝐂𝐚𝐭𝐚𝐬𝐭𝐫𝐨𝐩𝐡𝐢𝐜 𝐅𝐨𝐫𝐠𝐞𝐭𝐭𝐢𝐧𝐠. 

The model optimizes for the new task by overwriting the weights that were critical for the old tasks. You didn't "add" a feature, you traded one skill for another.

------
𝐓𝐡𝐞 𝐑𝐞𝐚𝐥𝐢𝐭𝐲: This isn't a training problem; it is a 𝐏𝐥𝐚𝐬𝐭𝐢𝐜𝐢𝐭𝐲-𝐒𝐭𝐚𝐛𝐢𝐥𝐢𝐭𝐲 𝐃𝐢𝐥𝐞𝐦𝐦𝐚.

You need a way to tell the model: "Learn this new thing (Plasticity), but do not touch the specific neurons that are holding up the old logic (Stability)."

Since you cannot use 𝐑𝐞𝐡𝐞𝐚𝐫𝐬𝐚𝐥 (mixing in old data), you must use 𝐄𝐥𝐚𝐬𝐭𝐢𝐜 𝐖𝐞𝐢𝐠𝐡𝐭 𝐂𝐨𝐧𝐬𝐨𝐥𝐢𝐝𝐚𝐭𝐢𝐨𝐧 (𝐄𝐖𝐂).

Think of the model's weights like a crowded room. 
- Standard Fine-Tuning lets the new data push everyone around indiscriminately.
- EWC calculates the Fisher Information Matrix to identify which weights are critical for the previous tasks.
- It then adds a quadratic penalty to the loss function. If the model tries to change a "critical" weight, the cost skyrockets. If it changes a "non-critical" weight, the cost is low.

You are mathematically forcing the model to learn only in the "free space" of the neural network.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"I wouldn't just fine-tune. That guarantees 𝐂𝐚𝐭𝐚𝐬𝐭𝐫𝐨𝐩𝐡𝐢𝐜 𝐅𝐨𝐫𝐠𝐞𝐭𝐭𝐢𝐧𝐠. Since we're data-constrained, I would implement 𝐄𝐥𝐚𝐬𝐭𝐢𝐜 𝐖𝐞𝐢𝐠𝐡𝐭 𝐂𝐨𝐧𝐬𝐨𝐥𝐢𝐝𝐚𝐭𝐢𝐨𝐧 (𝐄𝐖𝐂) to penalize changes to high-importance weights from the previous task, allowing us to learn the new class while mathematically locking in the prior knowledge."
