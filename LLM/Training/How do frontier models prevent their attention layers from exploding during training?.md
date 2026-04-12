How do frontier models prevent their attention layers from exploding during training? 🕵️

Here are the main approaches and their tradeoffs.

QK-Norm is the most common one. The idea is simple: normalize Q and K vectors to unit length before computing attention, which caps how large the dot product can get. Labs implement it slightly differently (Qwen3 does per head + learnable factor, OLMo 2/3 global + learnable, LLaMA 4 Maverick per head without learnable factor). None of the papers explain why they picked their variant, the Qwen3 one makes the most sense to me. The downsides: it kills magnitude information from the dot product, might hurt long context according to a Cohere paper, and most importantly it's not compatible with MLA since you need to materialize K per head, which defeats the whole point of MLA's compressed KV cache.

Softcapping / logit clipping, used in Gemma 2 and C.ai's Kaiju, clamps attention scores before softmax (either hard clamp or smooth tanh). Intuitive and effective, but there's a catch: when raw scores are large and close together (say 500 vs 501), after clamping they all look nearly identical. Attention becomes uniform and the model can't distinguish tokens properly.
QK-Clip from Kimi K2 (used with Muon) is probably my favorite. After each optimizer step, if any head's max attention score exceeds a threshold, you rescale W_Q and W_K for that head by a shrink factor. It keeps magnitude information intact, only runs during training so zero inference cost, and it's fully compatible with MLA. Very elegant solution.

Hidden Z-Loss from LongCat-Flash takes a different angle entirely. Instead of targeting attention logits, it penalizes last-layer hidden state norms. It treats the symptom (exploding activations) rather than the cause (exploding logits), which makes it a good safety net you can combine with any of the above. Easy to plug in, though the λ coefficient needs some tuning.

<img width="1280" height="794" alt="image" src="https://github.com/user-attachments/assets/0b6b7434-ef84-49ae-a4c7-e0a788fde8aa" />
