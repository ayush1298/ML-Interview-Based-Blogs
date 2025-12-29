You're in a Senior ML Engineer interview at Google and the interviewer asks:

"We're building a toxicity detection dataset where only 1% of comments are actually toxic. We hired two annotators. Their inter-annotator agreement is 99%. Are we good to go?"

Most candidates smile and say: "Yes! 99% agreement is amazing. The data is clearly high quality."

They just failed the interview since they confused 𝐜𝐨𝐧𝐜𝐮𝐫𝐫𝐞𝐧𝐜𝐞 with 𝐬𝐢𝐠𝐧𝐚𝐥.

The reality? 𝘐𝘯 𝘪𝘮𝘣𝘢𝘭𝘢𝘯𝘤𝘦𝘥 𝘥𝘢𝘵𝘢𝘴𝘦𝘵𝘴, "𝘢𝘤𝘤𝘶𝘳𝘢𝘤𝘺" 𝘪𝘴 𝘢 𝘭𝘪𝘢𝘳.

If your dataset is 99% safe and 1% toxic, an annotator could be asleep at the wheel, mark every single comment as "Safe," and still achieve 99% agreement with another lazy annotator. They found 0% of the toxicity, but on paper, they look perfect.

The Senior Engineer knows you are fighting 𝐂𝐡𝐚𝐧𝐜𝐞 𝐀𝐠𝐫𝐞𝐞𝐦𝐞𝐧𝐭.

When one class dominates (like "Safe" comments), the statistical probability of two people agreeing by accident skyrockets. You aren't measuring quality, you're measuring the class imbalance.

To fix this, you need to normalize for that baseline probability.

You need 𝐂𝐨𝐡𝐞𝐧'𝐬 𝐊𝐚𝐩𝐩𝐚 (or 𝐅𝐥𝐞𝐢𝐬𝐬' 𝐊𝐚𝐩𝐩𝐚 for 3+ annotators).
- Accuracy = (Observed Agreement)
- Kappa = (Observed Agreement - Chance Agreement) / (1 - Chance Agreement)

In our 99% "safe" scenario:
- If both annotators just spam "Safe," their Accuracy is 99%.
- But their Kappa score is 0.0.

A Kappa of 0.0 reveals the truth: Your annotators aren't agreeing on the content, they are just agreeing that the rare class doesn't exist.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"99% agreement on a 1% minority class is meaningless due to chance agreement. I would calculate Cohen's Kappa to penalize the probability of random agreement. If the Kappa is below 0.6, we have a guideline problem, not a high-quality dataset."
