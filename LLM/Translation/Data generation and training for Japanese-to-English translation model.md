You're in a Senior NLP Engineer interview at Google DeepMind and the interviewer asks:

"We need to improve our 𝘑𝘢𝘱𝘢𝘯𝘦𝘴𝘦-𝘵𝘰-𝘌𝘯𝘨𝘭𝘪𝘴𝘩 translation model. We have 10k parallel pairs and 1 billion lines of monolingual English text. To use 𝐁𝐚𝐜𝐤-𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐢𝐨𝐧 effectively, which direction do we generate data, and exactly how do we pair it for training?"

Don't say: "We translate the English data into Japanese to check if the model is consistent."

And also don't say: "We create synthetic English targets so the model has more 'good' outputs to learn from."

𝘐𝘧 𝘺𝘰𝘶 𝘵𝘳𝘢𝘪𝘯 𝘺𝘰𝘶𝘳 𝘮𝘰𝘥𝘦𝘭 𝘵𝘰 𝘰𝘶𝘵𝘱𝘶𝘵 𝘴𝘺𝘯𝘵𝘩𝘦𝘵𝘪𝘤 𝘵𝘦𝘹𝘵, 𝘺𝘰𝘶 𝘢𝘳𝘦 𝘵𝘦𝘢𝘤𝘩𝘪𝘯𝘨 𝘪𝘵 𝘵𝘰 𝘮𝘪𝘮𝘪𝘤 𝘵𝘩𝘦 𝘮𝘪𝘴𝘵𝘢𝘬𝘦𝘴 𝘰𝘧 𝘢 𝘮𝘢𝘤𝘩𝘪𝘯𝘦.

The secret to 𝐁𝐚𝐜𝐤-𝐓𝐫𝐚𝐧𝐬𝐥𝐚𝐭𝐢𝐨𝐧 isn't just "more data", it's about protecting the 𝐃𝐞𝐜𝐨𝐝𝐞𝐫'𝐬 𝐟𝐥𝐮𝐞𝐧𝐜𝐲.

Here is the production-grade architecture you need to describe:
1️⃣ 𝘛𝘩𝘦 "𝘙𝘦𝘷𝘦𝘳𝘴𝘦" 𝘎𝘦𝘯𝘦𝘳𝘢𝘵𝘪𝘰𝘯:
You take your massive Monolingual English (Target) corpus and use an intermediate model to translate it back into Synthetic Japanese (Source).

2️⃣ 𝘛𝘩𝘦 𝘛𝘳𝘢𝘪𝘯𝘪𝘯𝘨 𝘗𝘢𝘪𝘳:
You train your final model on these pairs: (Synthetic Japanese Input, Real English Output).

𝐖𝐡𝐲 𝐭𝐡𝐢𝐬 𝐝𝐢𝐫𝐞𝐜𝐭𝐢𝐨𝐧 𝐦𝐚𝐭𝐭𝐞𝐫𝐬?
- In NMT, the decoder needs to learn the probability distribution of real human language. By keeping the English side "real" (monolingual data), the decoder learns perfect grammar and style.

- The encoder learns to handle noisy, imperfect, or "translationese" Japanese inputs and still map them to clean English.

If you did it the other way (𝘙𝘦𝘢𝘭 𝘑𝘢𝘱𝘢𝘯𝘦𝘴𝘦 -> 𝘚𝘺𝘯𝘵𝘩𝘦𝘵𝘪𝘤 𝘌𝘯𝘨𝘭𝘪𝘴𝘩), your model treats the Synthetic English as the ground truth. It learns to output "𝘔𝘢𝘤𝘩𝘪𝘯𝘦 𝘛𝘳𝘢𝘯𝘴𝘭𝘢𝘵𝘪𝘰𝘯 𝘢𝘳𝘵𝘪𝘧𝘢𝘤𝘵𝘴" rather than human language.

Think of it like this: To teach a chef (the model), you show them a perfect gourmet dish (Real English) and ask them to guess the messy recipe (Synthetic Japanese). You never show them a bad dish and say "cook this."

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"We pair Synthetic Sources with Natural Targets. This forces the model to map potentially noisy inputs to high-quality, fluent outputs, ensuring the decoder learns the true distribution of natural English rather than overfitting to the artifacts of another model."
