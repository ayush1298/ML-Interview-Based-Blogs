You're in a Senior ML Engineer interview at Google DeepMind and the interviewer asks:

"You're migrating a legacy continuous prediction model into a multi-class classifier. A junior dev suggests keeping the L2 (MSE) loss for the new Softmax outputs because 𝘦𝘳𝘳𝘰𝘳 𝘪𝘴 𝘦𝘳𝘳𝘰𝘳. Why is this guaranteed to break the optimizer in production?"

Don't say: "Because Cross-Entropy is meant for probabilities and MSE is for regression." ...

Too vague. It shows you memorized the API documentation but don't understand the math under the hood.

𝐓𝐡𝐞 𝐫𝐞𝐚𝐥𝐢𝐭𝐲 𝐢𝐬: It is entirely about the loss topology with respect to your raw logits.

When you slap an L2 loss on top of a Softmax layer, the mathematical marriage is a disaster. Softmax uses exponentials, and MSE squares the difference. 

Trying to optimize that combination is like trying to roll a bowling ball down a warped, bumpy staircase instead of a smooth ramp.

𝐇𝐞𝐫𝐞 𝐢𝐬 𝐞𝐱𝐚𝐜𝐭𝐥𝐲 𝐰𝐡𝐚𝐭 𝐠𝐨𝐞𝐬 𝐰𝐫𝐨𝐧𝐠 𝐢𝐧 𝐩𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧:

1️⃣ 𝘛𝘩𝘦 𝘕𝘰𝘯-𝘊𝘰𝘯𝘷𝘦𝘹𝘪𝘵𝘺: If you plot L2 loss against the pre-softmax affine values (the raw logits), the shape isn’t a nice, easily optimizable bowl. It mutates into a non-convex, wavy surface riddled with flat plateaus. Your optimizer will bounce wildly and trap itself.

2️⃣ 𝘎𝘳𝘢𝘥𝘪𝘦𝘯𝘵 𝘚𝘢𝘵𝘶𝘳𝘢𝘵𝘪𝘰𝘯: If your model makes a highly confident but completely wrong prediction, the derivative of the Softmax function flattens out to near zero. Your gradients vanish. Backpropagation halts. The network literally stops learning precisely when it needs to learn the most.

3️⃣ 𝘛𝘩𝘦 𝘊𝘳𝘰𝘴𝘴-𝘌𝘯𝘵𝘳𝘰𝘱𝘺 𝘙𝘦𝘴𝘤𝘶𝘦: KL Divergence (the core of Cross-Entropy loss) applies a logarithm. That logarithm perfectly neutralizes the Softmax exponentials.

When you pair Softmax with Cross-Entropy, the complex math cancels out, and the derivative w.r.t the logits simplifies beautifully to just 𝘗𝘳𝘦𝘥𝘪𝘤𝘵𝘪𝘰𝘯 - 𝘛𝘢𝘳𝘨𝘦𝘵. You get a pristine, mathematically guaranteed convex bowl. The optimizer takes aggressive steps when it is wildly wrong, and careful, fine-tuned steps when it approaches the correct answer.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"MSE on Softmax outputs creates a non-convex loss landscape with vanishing gradients for highly incorrect predictions. Cross-Entropy mathematically unwraps the Softmax exponentials, guaranteeing a convex optimization space and a stable, linear gradient flow."
