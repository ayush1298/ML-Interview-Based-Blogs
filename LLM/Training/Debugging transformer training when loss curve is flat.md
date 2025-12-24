You're in a Senior ML Interview at a OpenAI. The interviewer sets a trap:

"You just implemented a complex Transformer from a new paper. The code runs without errors. The training loop executes. But the loss curve is completely flat. What is your first move?"

90% of candidates walk right into the trap. 

Most candidates immediately jump to optimization.

They start listing hyperparameter fixes:
- "I'd lower the learning rate from 1e-3 to 1e-4."
- "I'd swap AdamW for SGD to stabilize convergence."
- "I'd double-check the data normalization stats."

They treat it like a tuning problem.

This answer fails because you are solving for performance when you should be solving for correctness.

In standard software engineering, a bug throws a 𝘙𝘶𝘯𝘵𝘪𝘮𝘦𝘌𝘳𝘳𝘰𝘳 or a 𝘚𝘦𝘨𝘍𝘢𝘶𝘭𝘵. The code crashes.

In ML Systems, bugs are silent. A broken dataloader, a detached gradient graph, or a silent tensor shape mismatch won't stop the code from running. It just ensures the model learns nothing.

If you start tuning learning rates on a broken implementation, you are polishing a brick.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: The Senior Engineer knows the first step is 𝐓𝐡𝐞 𝐒𝐢𝐧𝐠𝐥𝐞-𝐁𝐚𝐭𝐜𝐡 𝐎𝐯𝐞𝐫𝐟𝐢𝐭.

Before you touch a single hyperparameter, you must prove the architecture is capable of memorization.
- 𝐈𝐬𝐨𝐥𝐚𝐭𝐞: Take exactly ONE batch of data (e.g., 32 samples).
- 𝐒𝐭𝐫𝐢𝐩: Turn off all regularization (Dropout = 0.0, Weight Decay = 0.0, Data Augmentation = Off).
- 𝐅𝐨𝐫𝐜𝐞: Train on that single batch for 1,000 epochs.

If the model implementation is correct, the loss should drive to absolute zero (0.00) and training accuracy should hit 100%. The model should perfectly memorize the inputs.

If it cannot "cheat" and memorize 32 samples, your code is fundamentally broken. No amount of hyperparameter tuning will fix a logic bug.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"I don't tune a model until I prove it can learn. I strip regularization and force the model to overfit a single batch. If it can't memorize the training data, it will never generalize to the test data."
