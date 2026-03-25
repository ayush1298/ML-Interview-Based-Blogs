You're in a Senior Machine Learning interview at OpenAI. The interviewer hands you a marker and asks for a scratch implementation of Softmax Regression.

It feels like a "FizzBuzz" question. It isn't. It's a trap.

90% of candidates walk right into it by writing "clean," modular code.

They write the forward pass like this:
probs = softmax(logits)
loss = -log(probs)

It makes sense logically. You compute the probabilities (the hypothesis), and then you compute the error (the loss). It separates concerns. It looks like "good" software engineering.

-----
𝐓𝐡𝐞 𝐓𝐮𝐫𝐧:
In production, you just killed the training run. Welcome to IEEE 754 floating-point hell.

If your model is confident and pushes a logit to a large negative number (say, -100), the softmax function will mathematically output a very small number 10^(-45).

But your GPU doesn't have infinite precision. It rounds that small number down to hard 0.0 (Underflow). The next line attempts log(0.0).

Result? -inf.

Backprop gradient? NaN.

The model explodes.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:
You need to apply what I call 𝐓𝐡𝐞 𝐋𝐨𝐠𝐒𝐮𝐦𝐄𝐱𝐩 𝐅𝐮𝐬𝐢𝐨𝐧.
Senior Engineers know that you never, ever compute the probability explicitly before the loss if you can avoid it. You must fuse the layers.

Mathematically, the log of a softmax can be simplified:

log( e^{zᵢ} / ∑ e^{zⱼ} ) = zᵢ − log( ∑ e^{zⱼ} )

By calculating the loss directly from the raw logits (z), you bypass the division and the explicit probability calculation. This allows you to use the "𝐋𝐨𝐠-𝐒𝐮𝐦-𝐄𝐱𝐩" 𝐭𝐫𝐢𝐜𝐤, which factors out the largest term to prevent overflow/underflow.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"I don't separate Softmax and Log. I use 𝘤𝘳𝘰𝘴𝘴_𝘦𝘯𝘵𝘳𝘰𝘱𝘺_𝘸𝘪𝘵𝘩_𝘭𝘰𝘨𝘪𝘵𝘴. It fuses the operations to guarantee numerical convexity and prevents NaN explosions during mixed-precision training."
