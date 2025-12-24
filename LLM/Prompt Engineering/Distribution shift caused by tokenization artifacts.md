You're in an AI Engineer interview at Meta and the interviewer asks:

"We deployed a Llama-3 based app. We removed a single whitespace in the prompt template, and our benchmark accuracy tanked by 12%. Why is the model so brittle to a simple format change, and why didn't instruction tuning prevent this?"

Don’t say: "The model is confused by the bad grammar."

Too vague. This is the junior answer. The model has read the entire internet, it has seen typos before.

The reality is that LLMs do not read text. They process sequences of integers.
When you delete a whitespace or a colon, you aren't just making a "typo", you are fundamentally altering the 𝐓𝐨𝐤𝐞𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐮𝐧𝐝𝐚𝐫𝐲.

Here is the production-level breakdown:
1️⃣ 𝐓𝐡𝐞 𝐓𝐨𝐤𝐞𝐧𝐢𝐳𝐞𝐫 𝐓𝐫𝐚𝐩: In many tokenizers, " word" (with a leading space) and "word" (without) map to completely different integer IDs. To the model, they are as distinct as "apple" and "orange." You just broke the integer sequence the model optimized for.

2️⃣ 𝐒𝐩𝐮𝐫𝐢𝐨𝐮𝐬 𝐂𝐨𝐫𝐫𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬: The model often relies on "spurious features", shortcuts in the training data. It might have learned that 𝘘𝘶𝘦𝘴𝘵𝘪𝘰𝘯: [𝘊𝘰𝘯𝘵𝘦𝘹𝘵] predicts an answer, but 𝘘𝘶𝘦𝘴𝘵𝘪𝘰𝘯 [𝘊𝘰𝘯𝘵𝘦𝘹𝘵] (no colon) implies a continuation or a grammar correction task.

3️⃣ 𝐓𝐡𝐞 𝐈𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐨𝐧 𝐓𝐮𝐧𝐢𝐧𝐠 𝐅𝐚𝐥𝐥𝐚𝐜𝐲: Theoretically, 𝘐𝘯𝘴𝘵𝘳𝘶𝘤𝘵𝘪𝘰𝘯 𝘛𝘶𝘯𝘪𝘯𝘨 (𝘙𝘓𝘏𝘍/𝘚𝘍𝘛) fixes this by teaching the model to follow intent.
- If the instruction tuning data only used one specific template (e.g., specific XML tags or chat headers), the model overfits to that specific structure.
- By changing the format, you effectively pushed the input Out-Of-Distribution (OOD) for the instruction-tuned head.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"It's not a grammar issue, it's a distribution shift caused by tokenization artifacts. The model latched onto specific formatting tokens as strong features during SFT. To fix this in production, we shouldn't just tweak prompts manually, we need to use 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐞𝐝 𝐏𝐫𝐨𝐦𝐩𝐭 𝐎𝐩𝐭𝐢𝐦𝐢𝐳𝐚𝐭𝐢𝐨𝐧 (𝐀𝐏𝐎) or verify our inputs against the exact chat template the model was fine-tuned on."
