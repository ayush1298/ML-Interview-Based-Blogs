You're in a Senior AI Interview at OpenAI. The interviewer sets a trap:

"Our RAG pipeline has perfect retrieval (Recall@5 > 0.95). The relevant chunks are in the context window. Yet, the model still hallucinates information that isn't in the text. Why?"

90% of candidates walk right into it.

They say: "We need better embeddings."
or "Maybe the chunk size is too small?"
or "Let's fine-tune the model on the data."

They try to fix the retrieval. But the interviewer just told them the retrieval is perfect.

The reality is they aren't fighting 𝘢 𝘥𝘢𝘵𝘢 𝘱𝘳𝘰𝘣𝘭𝘦𝘮. They are fighting 𝘢 𝘗𝘳𝘪𝘰𝘳-𝘉𝘪𝘢𝘴 𝘱𝘳𝘰𝘣𝘭𝘦𝘮.

LLMs are probabilistic, not deterministic. When they provide a context chunk, the model does not treat it as a database constraint. It treats it as a weak suggestion.

If the model's pre-trained weights (its "priors") conflict with their retrieved context, or if the context is slightly ambiguous, the model will prioritize its own internal knowledge (hallucination) over their provided text.

To the model, their RAG context is just noise in the prompt.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: You stop optimizing for Recall and start optimizing for Adherence. You introduce what I call The 𝐂𝐨𝐧𝐬𝐭𝐫𝐚𝐢𝐧𝐭 𝐆𝐚𝐭𝐞.

Instead of hoping the model uses the context, you architecturally force it to:
1️⃣ 𝘚𝘰𝘶𝘳𝘤𝘦-𝘈𝘵𝘵𝘳𝘪𝘣𝘶𝘵𝘪𝘰𝘯 𝘋𝘦𝘤𝘰𝘥𝘪𝘯𝘨: You require the model to output a specific [Span ID] from the retrieved chunk for every claim. No ID = The generation is blocked.

2️⃣ 𝘛𝘰𝘬𝘦𝘯-𝘓𝘦𝘷𝘦𝘭 𝘎𝘶𝘪𝘥𝘢𝘯𝘤𝘦: You use grammar-constrained decoding (like JSON mode) to force the output to adhere to a strict schema that includes a verification_score field.

3️⃣ 𝘕𝘦𝘨𝘢𝘵𝘪𝘷𝘦 𝘗𝘳𝘰𝘮𝘱𝘵𝘪𝘯𝘨 𝘰𝘯 𝘗𝘳𝘪𝘰𝘳𝘴: You explicitly penalize the model for accessing internal knowledge bases for this specific query type.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"Retrieval is only half of RAG. The other half is Alignment. I don't just fetch the truth, I implement decoding constraints that force the model to prefer the retrieved context over its pre-trained hallucinations."
