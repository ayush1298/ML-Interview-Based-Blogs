You’re in a Senoir Machine Learning interview at Google DeepMind. The VP of Engineering sets a trap:

"We are building a massive 𝐌𝐢𝐱𝐭𝐮𝐫𝐞 𝐨𝐟 𝐄𝐱𝐩𝐞𝐫𝐭𝐬 (𝐌𝐨𝐄) model. To maximize training throughput on our H100 clusters, we want to route each token to only the single best expert (k=1). Is this a valid strategy?"

90% of candidates walk right into it. They immediately say: 

"Yes. That's the point of sparse MoE. If Expert A has a gating probability of 0.9 and Expert B is 0.05, calculating Expert B is a waste of FLOPs. Top-1 routing gives us maximum sparsity and speed."

It sounds intuitive. It maximizes throughput.

It also guarantees their model will never converge.

The reality is they aren't optimizing for inference speed yet; they are optimizing for differentiability.

The moment they select only the winner (k=1), they are performing a hard argmax operation. In the backward pass, argmax has zero gradient almost everywhere.

If a token goes to Expert A, Expert B receives zero signal. The router never learns "I should have sent this to B." The unselected experts starve, the gating network freezes, and you end up with a massive, expensive model where only a fraction of the experts are actually trained.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To pass the interview, you need to explain 𝐓𝐡𝐞 𝐀𝐫𝐠𝐦𝐚𝐱 𝐃𝐞𝐚𝐝𝐥𝐨𝐜𝐤.

To fix this, you must train with at least Top-2 gating.

By selecting the top two experts, you create a valid probability distribution between them. This allows gradients to flow back into the gating network, teaching it how to adjust the weights for both the winner and the runner-up.

- Training: Must use k ≥ 2 (or heavy noise injection) to keep the router differentiable.
- Inference: You can sometimes drop to k=1 for speed, but only after the router has learned its job.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝
"Sparsity requires redundancy during learning. I would implement Top-2 routing during training to maintain gradient flow to the gating network, ensuring we don't collapse into a few overused experts, even if it costs us 2x active parameters per forward pass."
