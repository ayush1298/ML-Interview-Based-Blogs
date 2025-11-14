You're in an AI Engineer interview at Google DeepMind and the interviewer asks:

"A new engineer implements RoPE by adding a rotational embedding to the token embeddings at the bottom of the model. The training loss is flat. What fundamental misunderstanding do they have about how and where RoPE is actually applied?"

Don't say: "The position information is getting lost in the residual stream."

It's technically true, but it's a vague. It completely misses the why.

The reality: They're confusing additive absolute position embeddings (like in BERT) with multiplicative relative position embeddings (RoPE).

𝘠𝘰𝘶 𝘕𝘌𝘝𝘌𝘙 𝘢𝘥𝘥 𝘙𝘰𝘗𝘌 𝘵𝘰 𝘵𝘩𝘦 𝘪𝘯𝘱𝘶𝘵 𝘦𝘮𝘣𝘦𝘥𝘥𝘪𝘯𝘨𝘴.

Why? Because the subsequent W_q and W_k linear projections (which are different for every layer) will completely destroy the rotational properties. The model has no way to interpret that rotation after it's been mashed by the first layer's weights.

RoPE's only job is to ensure the attention score qᵀk is a function of the content and the tokens' relative distance (m-n).

To do this, you must apply RoPE inside every single attention block:
- First, you project your input x to get your Query (Q) and Key (K) vectors for that layer.
- Then, you apply the RoPE rotation to the Q and K vectors directly.
- Finally, you compute the dot product of the rotated Q and rotated K.

RoPE isn't "data" you add to the input. It's a dynamic transformation of the queries and keys that enforces relative positional awareness at the moment of comparison.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"RoPE isn't an 'embedding' you add once at the input layer. It's a rotational transformation you must apply to the Q and K vectors inside every single attention layer just before the dot-product. By applying it at the bottom, the W_q and W_k projections are destroying the rotational properties, so the model never learns relative position."
