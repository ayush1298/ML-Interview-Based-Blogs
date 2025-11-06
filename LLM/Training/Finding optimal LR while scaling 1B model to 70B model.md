You're in an AI Engineer interview at Google DeepMind and the interviewer asks: 

"Your 1B parameter proxy model trains perfectly with a 1.2e-4 learning rate. You scale the model to 70B, and the training immediately explodes. What's the most 𝘭𝘪𝘬𝘦𝘭𝘺 reason and how do you fix it 𝐰𝐢𝐭𝐡𝐨𝐮𝐭 running a new, expensive hyperparameter sweep?"

Most candidates say: "The model is too big, so the updates are unstable. I'd add gradient clipping and just keep lowering the learning rate manually until it's stable."

Wrong. That's a patch, not a solution. You're just masking the root cause and wasting millions in compute cycles trying to find a new LR.

The reality: This isn't a 𝘵𝘶𝘯𝘪𝘯𝘨 problem, it's a 𝘱𝘢𝘳𝘢𝘮𝘦𝘵𝘦𝘳𝘪𝘻𝘢𝘵𝘪𝘰𝘯 problem.

You're seeing a classic failure of 𝐒𝐭𝐚𝐧𝐝𝐚𝐫𝐝 𝐏𝐚𝐫𝐚𝐦𝐞𝐭𝐞𝐫𝐢𝐳𝐚𝐭𝐢𝐨𝐧 (𝐒𝐏).
In SP models, the optimal learning rate 𝘴𝘩𝘪𝘧𝘵𝘴 as you scale the model's width. The LR that was perfect for your 1B proxy is now catastrophically large for the 70B model because the update dynamics didn't scale uniformly with the parameters.

The fix is to use 𝐌𝐚𝐱𝐢𝐦𝐮𝐦 𝐔𝐩𝐝𝐚𝐭𝐞 𝐏𝐚𝐫𝐚𝐦𝐞𝐭𝐞𝐫𝐢𝐳𝐚𝐭𝐢𝐨𝐧 (𝐌𝐔𝐏).

MUP is 𝘯𝘰𝘵 just another initialization scheme. It's a set of rules that scales both the initializations AND the 𝘱𝘦𝘳-𝘭𝘢𝘺𝘦𝘳 𝘭𝘦𝘢𝘳𝘯𝘪𝘯𝘨 𝘳𝘢𝘵𝘦𝘴 (e.g., scaling them by 1/width ).

This re-parameterization does one magical thing: it makes the optimal hyperparameters, especially the learning rate, scale-invariant.

This means the optimal LR you found on your cheap 1B proxy directly transfers to your 70B monster. No new sweep needed.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝

"With Standard Parameterization, you're forced to find a new, unstable learning rate for every scale.
With MUP, you find the optimal LR once on a small proxy, and it remains optimal at any scale. You don't scale the LR; you build the model to fit the LR."
