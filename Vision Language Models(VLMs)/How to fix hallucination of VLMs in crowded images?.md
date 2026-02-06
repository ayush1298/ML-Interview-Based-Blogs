You're in a Senior AI Interview at OpenAI. The interviewer sets a trap:

“Our VLM constantly hallucinates object counts in crowded images. It says 8 people when there are only 5. We have zero budget for new data collection. How do you fix this?”

90% of candidates walk right into the trap.

Most candidates say...
"I'd use Chain-of-Thought (CoT) prompting to make it reason step-by-step,"
or 
"I'd use RAG to retrieve similar examples."

These answers are fine for LLMs. But for VLMs, they are dead wrong. You are trying to solve a vision problem with language tools.

The reality is that text is cheap but pixels are expensive.

When a model outputs the token "8", it is making a statistical guess based on text probability, not visual verification. It has no "skin in the game". To fix the count, you have to force the model to prove its work, spatially.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: You implement 𝐓𝐡𝐞 𝐏𝐨𝐢𝐧𝐭-𝐭𝐨-𝐏𝐫𝐨𝐯𝐞 𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥.

Instead of training on text captions alone ("A photo of 8 people"), you alter the architecture to require Coordinate Grounding.

- 𝘊𝘩𝘢𝘯𝘨𝘦 𝘵𝘩𝘦 𝘖𝘶𝘵𝘱𝘶𝘵 𝘚𝘱𝘢𝘤𝘦: The model must output [x,y] tokens for every object it claims exists.
- 𝘛𝘩𝘦 𝘓𝘰𝘴𝘴 𝘍𝘶𝘯𝘤𝘵𝘪𝘰𝘯: If the model predicts "person" but points to empty space (background), the loss spikes.
- 𝘐𝘯𝘧𝘦𝘳𝘦𝘯𝘤𝘦: The model literally cannot output the count "8" unless it can successfully generate 8 distinct, valid coordinate pairs corresponding to human features.

By forcing the model to "point" at what it counts, you align the linguistic representation with the pixel representation.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"I would modify the objective function to require point-supervision. By forcing the model to output spatial coordinates for every enumerated object, we remove the ambiguity that allows hallucination to hide."
