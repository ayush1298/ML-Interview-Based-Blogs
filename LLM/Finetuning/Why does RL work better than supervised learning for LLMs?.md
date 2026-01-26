You're in a ML Engineer interview at Meta, and the interviewer asks:

"Why does RL work better than supervised learning for LLMs?"

Here's how you answer:

Don't say: "RL is just better" or "It's more advanced." Inappropriate framing.
The real answer isn't about RL being superior - it's about the fundamental difference between copying vs. learning to win.

SFT teaches move-by-move copying. 
RL teaches winning the game.

Training Reality Check:

- SFT = Dense rewards (you know what every token should be)
- RL = Sparse rewards (you only know if you won after 20+ moves)
- SFT ceiling = Quality of your training data
- RL ceiling = Quality of your reward function The chess analogy explains everything.

The counterintuitive truth:

- RL starts weaker but reaches higher.
- SFT copies Magnus Carlsen's moves.
- RL can eventually beat Magnus Carlsen. Why?

Because RL closes the gap between "judging" and "doing."

You can recognize good F1 driving but can't do it. RL bridges that gap.

The infrastructure reality everyone misses:

- SFT = Single forward pass through existing sequence
- RL = Tons of inference (autoregressive, token-by-token) + KV cache + harder to batch + expensive reward models.
- RL costs 10x more compute but unlocks 100x more potential.

The business framework that matters:

Known optimal behavior + Cheap training = SFT wins Unknown optimal behavior + Expensive but scalable = RL wins Human preferences (can't write rules) = RL is your only option Dense feedback available = SFT is sufficient

"But what about reward hacking?"
Interviewer: "How do you prevent the model from gaming the system?" "RL optimizes exactly what you measure, not what you want. Design better rewards or accept that your ceiling is your judging ability."

The evolution path that explains everything:

- Pre-training: Learn the world
- SFT: Learn to follow instructions
- RL: Learn to optimize for outcomes Each step unlocks capabilities the previous couldn't reach. It's not replacement - it's progression.

"RL transforms any judge into a doer. If you can evaluate chess moves but can't play chess, RL makes you a chess player. The magic is in the reward signal - everything else is just gradient optimization."

Why the "expensive" approach wins?
Better training + higher ceiling → Long-term value Cheaper training + lower ceiling → Short-term savings


RL isn't better because it's complex.
It's better because it optimizes for what you actually want, not what's easiest to teach.

RL vs SFT isn't about better vs worse.
It's about ceilings vs floors.
SFT gives you a high floor quickly.
RL gives you a higher ceiling eventually.

Choose based on whether you're optimizing for immediate capability or ultimate performance
