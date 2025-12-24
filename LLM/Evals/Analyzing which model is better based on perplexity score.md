You're in a Senior AI Engineer interview at Google and the interviewer drops this on you:

"We ran an eval on a fixed dataset. Llama3 achieved a perplexity of 2.1, while Gemma3 scored 2.4. Which model is the better probability estimator, and which one do we deploy?"

Most candidates say: "Llama3 is better. Perplexity measures how 'confused' the model is, so a lower score means it understands the text distribution better. We should deploy Llama3."

They just fell for the classic 𝐓𝐨𝐤𝐞𝐧𝐢𝐳𝐞𝐫 𝐓𝐫𝐚𝐩. They treated a unit-dependent metric as a universal constant.

Here is the reality: Raw perplexity comparisons between different families of models are statistically meaningless.

Why? Because Perplexity is calculated per token, not per sentence.

PPL = exp(−(1/N) · Σ log P(xᵢ))

The denominator N (number of tokens) is completely dependent on 𝘵𝘩𝘦 𝘵𝘰𝘬𝘦𝘯𝘪𝘻𝘦𝘳'𝘴 𝘷𝘰𝘤𝘢𝘣𝘶𝘭𝘢𝘳𝘺 𝘴𝘪𝘻𝘦 𝘢𝘯𝘥 𝘦𝘧𝘧𝘪𝘤𝘪𝘦𝘯𝘤𝘺.

Imagine Model A has a terrible tokenizer. It splits the word "Unbelievable" into 4 tokens: ["Un", "believ", "a", "ble"]. Model B has a great tokenizer. It treats "Unbelievable" as 1 token.

- Model A divides the total sequence log-probability by 4.
- Model B divides the same total probability by 1.

Mathematically, the model with the less efficient (more verbose) tokenizer will artificially deflate its loss per token, resulting in a "better" (lower) perplexity score, even if the total probability of the sequence is identical.

Comparing them directly is like trying to decide who is faster:
- Runner A: Runs 10 miles in an hour.
- Runner B: Runs 12 kilometers in an hour.
If you don't normalize the units, you're just guessing.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"Raw perplexity is metric hacking. I cannot compare these numbers unless I normalize by character length or byte count (Bits Per Byte). Until we normalize the denominator, the 'lower' score might just be measuring tokenizer inefficiency, not model intelligence."
