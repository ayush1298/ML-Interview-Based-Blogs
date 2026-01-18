You are in a Senior Computer Vision interview at OpenAI. The interviewer sets a classic trap:

"In VGGNet, we replace a single 7x7 convolution with a stack of three 3x3 convolutions. Why?"

90% of candidates walk right into the trap.

They grab the whiteboard marker and start doing arithmetic.

They say: "It's about efficiency and parameter reduction. A 7x7 filter has 49 weights (7^2). Three 3x3 filters have 27 weights (3x3^2). So, we get the same 7x7 receptive field with 45% fewer parameters. It’s a memory optimization."

The interviewer nods politely. They didn't get the job.

𝘛𝘩𝘦 𝘳𝘦𝘢𝘭𝘪𝘵𝘺 𝘪𝘴 𝘵𝘩𝘢𝘵 𝘵𝘩𝘦𝘺 𝘢𝘳𝘦𝘯'𝘵 𝘰𝘱𝘵𝘪𝘮𝘪𝘻𝘪𝘯𝘨 𝘧𝘰𝘳 𝘴𝘵𝘰𝘳𝘢𝘨𝘦. 𝘛𝘩𝘦𝘺 𝘢𝘳𝘦 𝘰𝘱𝘵𝘪𝘮𝘪𝘻𝘪𝘯𝘨 𝘧𝘰𝘳 𝘦𝘹𝘱𝘳𝘦𝘴𝘴𝘪𝘷𝘪𝘵𝘺.

If the goal was purely parameter reduction, there are dozen ways to factorize matrices. The answer ignores the single most important component of Deep Learning: 𝐓𝐡𝐞 𝐀𝐜𝐭𝐢𝐯𝐚𝐭𝐢𝐨𝐧 𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧.

A single 7x7 layer applies one linear transformation followed by one ReLU. It can only model a simple linear relationship within that 7x7 pixel patch.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: By stacking three layers, you aren't just covering space, you are injecting non-linearity. You are utilizing 𝐓𝐡𝐞 𝐍𝐨𝐧𝐥𝐢𝐧𝐞𝐚𝐫 𝐈𝐧𝐣𝐞𝐜𝐭𝐢𝐨𝐧 𝐄𝐟𝐟𝐞𝐜𝐭.

By using a stack of three 3x3s, you intersperse three separate ReLU functions into the same effective receptive field.
* Layer 1 (3x3) + ReLU
* Layer 2 (3x3) + ReLU
* Layer 3 (3x3) + ReLU

Instead of a single linear decision boundary, you now have a highly complex, multi-stage discriminator looking at the exact same patch of pixels. You have made the network deeper and more discriminative while simultaneously making it lighter.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"The parameter reduction is a bonus, but the real optimization is discriminative power. Stacking smaller filters allows us to inject three non-linearities (ReLUs) instead of one, enabling the model to learn significantly more complex features within the same receptive field."
