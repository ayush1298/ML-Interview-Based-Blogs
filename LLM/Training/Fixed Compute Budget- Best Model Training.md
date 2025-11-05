You're in an AI Engineer interview at Anthropic and the interviewer asks:

"We have a fixed compute budget - 32 H100s for two weeks. To get the best possible model, should we train a larger model on less data, or a smaller model on more data? How do you begin to answer this?"

Most candidates freeze. They guess.

"Uh, I'd probably train a smaller model on more data? That seems safer."

Wrong. You're burning the entire budget on a gut feeling.

The reality: at this scale, you never guess. A wrong guess doesn't just waste time; it wastes hundreds of thousands of dollars in compute.

You don't answer with a choice. You answer with a methodology.

The answer is 𝐒𝐜𝐚𝐥𝐢𝐧𝐠 𝐋𝐚𝐰𝐬.

Running the full job is the last step, not the first. Your first step is to use a fraction of that budget to build a predictive model.

𝐇𝐞𝐫𝐞'𝐬 𝐭𝐡𝐞 𝐬𝐞𝐧𝐢𝐨𝐫-𝐥𝐞𝐯𝐞𝐥 𝐚𝐩𝐩𝐫𝐨𝐚𝐜𝐡:
- 𝘋𝘦𝘧𝘪𝘯𝘦 𝘠𝘰𝘶𝘳 𝘔𝘦𝘵𝘳𝘪𝘤: "Best" is vague. Are we optimizing for perplexity? MMLU? Latency? Define the target first.
- 𝘙𝘶𝘯 𝘚𝘮𝘢𝘭𝘭-𝘚𝘤𝘢𝘭𝘦 𝘌𝘹𝘱𝘦𝘳𝘪𝘮𝘦𝘯𝘵𝘴: Use a small part of your budget (e.g., 4 GPUs for 1 day) to run a dozen small training runs. You vary two things: model size (e.g., 100M, 500M, 1B params) and data size (e.g., 2B, 10B, 20B tokens).
- 𝘍𝘪𝘵 𝘵𝘩𝘦 𝘓𝘰𝘴𝘴 𝘊𝘶𝘳𝘷𝘦: You now have data. You plot these [params, tokens, final_loss] points and fit a power-law function to them. This formula predicts your final loss based on model size and data.
- 𝘌𝘹𝘵𝘳𝘢𝘱𝘰𝘭𝘢𝘵𝘦 𝘵𝘰 𝘍𝘪𝘯𝘥 𝘵𝘩𝘦 𝘖𝘱𝘵𝘪𝘮𝘶𝘮: Now you use this formula to answer the interviewer's question. For your full compute budget, you can now predict the (N, D) pair (Model Size, Data Size) that will give you the lowest possible loss.

This is how you find the Chinchilla-optimal balance. You're not guessing; you're using a data-driven model to de-risk a massive engineering investment.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"I wouldn't guess. I'd use 10% of the budget to run a series of small-scale experiments, fit a scaling law to the loss, and then use that predictive model to find the optimal parameter and token allocation for the full 32-H100 run."
