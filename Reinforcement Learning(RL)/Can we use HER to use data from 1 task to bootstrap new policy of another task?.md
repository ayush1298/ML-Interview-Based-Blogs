You’re in a Senior AI Engineer interview at NVIDIA. The interviewer sets a quiet trap:

"We have 10k hours of data from a robot walking on concrete. We want to use Hindsight Relabeling (HER) to bootstrap a new policy for walking on sand. Is this a good idea?"

90% of candidates walk right into the trap.

They say: "Absolutely. Data is expensive. Walking is walking. Even if the robot fails on sand, we can treat the concrete data as 𝘢𝘵𝘵𝘦𝘮𝘱𝘵𝘦𝘥 sand walking to warm-start the weights. It’s just data augmentation."

It sounds logical. It sounds efficient. It is also mathematically fatal.

They aren’t just changing the Goal. They are changing the Physics.

In Reinforcement Learning, a task is defined by the MDP tuple (S, A, P, R).
- S, A: State/Action space (Shared)
- R: Reward (Variable)
- P: The Transition Function P(s’|s,a) (The Physics)

Hindsight Relabeling fundamentally assumes that the transition dynamics P are invariant across tasks. You can change what you wanted to do (the goal), but you cannot retroactively change how the world responded to your action.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: This is a violation of 𝐓𝐡𝐞 𝐃𝐲𝐧𝐚𝐦𝐢𝐜𝐬 𝐂𝐨𝐧𝐬𝐞𝐧𝐬𝐮𝐬.
On concrete, applying force F results in forward velocity V. On sand, applying force F results in the foot sinking and velocity V/2.

If you relabel the concrete trajectory as "sand," you are explicitly training your 𝘝𝘢𝘭𝘶𝘦 𝘍𝘶𝘯𝘤𝘵𝘪𝘰𝘯 to believe that sand behaves exactly like concrete. You are feeding the model hallucinated physics.

The moment you deploy, the policy will stomp on the sand (expecting a hard surface) and immediately faceplant.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"No. HER creates counterfactuals about intent, not reality. Since the transition dynamics of sand (slippage, sinking) differ from concrete, relabeling introduces distribution shift in the transition function, poisoning the Q-values. Relabeling only works when the laws of physics stay constant."
