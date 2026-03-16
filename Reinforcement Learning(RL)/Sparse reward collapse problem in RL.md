You’re in a Senior RL interview at NVIDIA. The interviewer sets a trap:

"We trained a classifier to distinguish 𝘎𝘰𝘢𝘭 𝘙𝘦𝘢𝘤𝘩𝘦𝘥 vs. 𝘍𝘢𝘪𝘭𝘦𝘥 using 50 expert demos. It memorized the training set perfectly (100% Accuracy) in 10 epochs. But when we use this classifier as a reward signal, the robot learns absolutely nothing. Why?"

90% of candidates walk right into the "Generalization" trap.

They say: "It’s classic overfitting. The model has memorized the 50 examples and won't generalize to new states. You need to add Dropout, increase weight decay, or collect more data."

This answer gets them a polite nod and a rejection email.

The reality is they aren't solving a 𝘚𝘶𝘱𝘦𝘳𝘷𝘪𝘴𝘦𝘥 𝘓𝘦𝘢𝘳𝘯𝘪𝘯𝘨 𝘱𝘳𝘰𝘣𝘭𝘦𝘮, they are solving a 𝘚𝘦𝘢𝘳𝘤𝘩 𝘱𝘳𝘰𝘣𝘭𝘦𝘮.

In this architecture, the classifier isn't just a labeler, it is the 𝐑𝐞𝐰𝐚𝐫𝐝 𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧.

If your classifier perfectly "overfits" to the 50 positive examples, it effectively creates a decision boundary that looks like a vertical cliff.

- At the exact goal state: Reward = 1.0
- 0.001mm away from the goal: Reward = 0.0

The RL agent is exploring blindly. It needs a "getting warmer" signal. A perfectly accurate, overfitted classifier provides zero gradients for the agent to follow. It creates a flat landscape with a few invisible needles.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To fix this, you must deliberately make the classifier less discriminative in a specific way. You need to enforce Lipschitz continuity.
By applying techniques like Spectral Normalization or Gradient Penalties (standard in GANs), you force the classifier’s decision boundary to be smooth rather than sharp.
- Sharp (Overfit): "You are 1 pixel off. Score: 0.0." (Agent learns nothing).
- Smooth (Regularized): "You are 1 pixel off. Score: 0.85." (Agent sees a gradient and climbs the hill).

We don't want a binary judge, we want a beacon. We need the classifier to "leak" probability mass to nearby states to create a shapeable reward landscape.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"The problem isn't just overfitting, it's 𝐒𝐩𝐚𝐫𝐬𝐞 𝐑𝐞𝐰𝐚𝐫𝐝 𝐂𝐨𝐥𝐥𝐚𝐩𝐬𝐞. The perfect classifier eliminates the reward gradient. I would apply 𝘚𝘱𝘦𝘤𝘵𝘳𝘢𝘭 𝘕𝘰𝘳𝘮𝘢𝘭𝘪𝘻𝘢𝘵𝘪𝘰𝘯 to constrain the 𝘓𝘪𝘱𝘴𝘤𝘩𝘪𝘵𝘻 𝘤𝘰𝘯𝘴𝘵𝘢𝘯𝘵 of the discriminator, ensuring the reward function provides a dense, climbable gradient slope for states near the goal, rather than a binary step function."
