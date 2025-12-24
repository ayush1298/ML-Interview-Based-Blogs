You are in a Senior AI Interview at OpenAI. The interviewer sets a quiet trap:

"We need to distill a massive 10-model ensemble into a single small model for low-latency serving. Why is training the student on the ensemble's final output tokens a complete waste of compute?"

90% of candidates walk right into it.

Most candidates say: "It's not a waste. The ensemble is the 'teacher.' If the ensemble predicts Cat with 99% confidence, we should treat Cat as the ground truth and train the student to predict it using standard Cross-Entropy Loss."

Technically correct. Practically useless.

Here is the mental shift: If you only train on the "Hard Target" (the winner), you are throwing away the single most valuable asset the ensemble created.

The ensemble didn't just decide "Cat." It effectively simulated thousands of alternative realities in its probability distribution.

The reality is:
- The ensemble said "Cat" (0.6)
- But it also said "Dog" (0.3)
- And "Truck" (0.0001)

By training on just "Cat," you delete the relationship between Cat and Dog. You tell the student "Dog" is just as wrong as "Truck." But the ensemble knows "Dog" is a plausible error, while "Truck" is a category error.

This is 𝐓𝐡𝐞 𝐃𝐚𝐫𝐤 𝐊𝐧𝐨𝐰𝐥𝐞𝐝𝐠𝐞 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞.

The "𝘋𝘢𝘳𝘬 𝘒𝘯𝘰𝘸𝘭𝘦𝘥𝘨𝘦" resides in the non-winning probabilities (the soft targets). These faint signals describe the exact geometry of the decision boundary. They tell the student not just what the answer is, but how the teacher thinks.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Training on hard targets ignores the ensemble's uncertainty. To maximize performance, I would match the full probability distributions using KL Divergence on temperature-scaled logits. We aren't just copying the output; we are cloning the ensemble's intuition."
