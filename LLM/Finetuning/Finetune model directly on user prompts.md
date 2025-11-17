You're in a Senior ML Engineer interview at Perplexity and the interviewer asks:

"Your PM wants to fine-tune our new model on a random 1M sample of live user prompts to improve real-world performance. You tell them it's a terrible idea. Why?"

Most candidates say: "Because the data is noisy, has PII, and needs to be cleaned."

This is a weak answer. It's true, but it misses the fundamental problem.

Here's the reality: most of your "real-world" user traffic is garbage.

Fine-tuning on a raw, random sample is a trap. You're not modeling the "real world". You're modeling a low-intent, low-value slice of it.

The problem isn't just noise, it's a distribution mismatch between what users do and what they value.

All prompts are not created equal. You have two distinct distributions:

A) The 'Quizzing' Prompt (90% of traffic):
This is low-stakes, low-intent "testing."
- "What's the capital of France?" (User knows the answer).
- "Write a rap about my dog." (User is just messing around).
- "Can you... [jailbreak attempt]."
This data is cheap and plentiful, but it trains your model to be a toy.

B) The Asking Prompt (10% of traffic):
This is the gold. It's a high-stakes, high-intent user who doesn't know the answer and is relying on your model for a real task.
- "Analyze this Q3 sales data and identify 3 key trends."
- "Refactor this Python code to be more efficient."
- "Draft a firm but professional email to a vendor who missed a deadline."

Fine-tuning on a random sample means you're optimizing for the 90% "quizzing" prompts. You are literally training your model to be useless at the 10% of "asking" prompts that actually create value and drive retention.

It's like training a chef by only having them cook instant noodles, then wondering why they can't handle a Michelin-star dinner service.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:
"The goal isn't to model the average user; it's to model the ideal user. I wouldn't fine-tune on raw traffic. I'd build a data curation pipeline that uses classifiers to aggressively filter for high-intent 'asking' prompts. That's the real signal in the noise."
