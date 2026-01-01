You're in a Senior AI Engineer interview at Anthropic. The interviewer leans in and asks:

"We're bleeding money on inference. We want to build a 𝐌𝐨𝐝𝐞𝐥 𝐂𝐚𝐬𝐜𝐚𝐝𝐞 (𝐅𝐫𝐮𝐠𝐚𝐥𝐆𝐏𝐓) system, route easy queries to Llama-7B, and only send the hard stuff to GPT-4. What is the actual engineering bottleneck that makes this unreliable in production?"

Don't say: "The latency overhead of calling multiple models." (𝘞𝘩𝘪𝘭𝘦 𝘵𝘳𝘶𝘦, 𝘵𝘩𝘪𝘴 𝘪𝘴 𝘢 𝘴𝘰𝘭𝘷𝘢𝘣𝘭𝘦 𝘪𝘯𝘧𝘳𝘢𝘴𝘵𝘳𝘶𝘤𝘵𝘶𝘳𝘦 𝘱𝘳𝘰𝘣𝘭𝘦𝘮. 𝘐𝘵'𝘴 𝘯𝘰𝘵 𝘵𝘩𝘦 𝘧𝘶𝘯𝘥𝘢𝘮𝘦𝘯𝘵𝘢𝘭 𝘧𝘢𝘪𝘭𝘶𝘳𝘦 𝘮𝘰𝘥𝘦.)

Also don't say: "Building a classifier to predict query difficulty." (𝘛𝘩𝘪𝘴 𝘪𝘴 𝘵𝘩𝘦 𝘫𝘶𝘯𝘪𝘰𝘳 𝘢𝘱𝘱𝘳𝘰𝘢𝘤𝘩. 𝘋𝘪𝘧𝘧𝘪𝘤𝘶𝘭𝘵𝘺 𝘪𝘴 𝘴𝘶𝘣𝘫𝘦𝘤𝘵𝘪𝘷𝘦 𝘢𝘯𝘥 𝘱𝘳𝘰𝘮𝘱𝘵-𝘥𝘦𝘱𝘦𝘯𝘥𝘦𝘯𝘵.)

In a cascade, your cheap model acts as the gatekeeper. Ideally, it should say, "I don't know this, ask the big guy." But if your cheap model is confidently wrong, your cascade breaks immediately. The user gets a hallucination, and the expensive model never even sees the prompt.

The real bottleneck is 𝐑𝐞𝐥𝐢𝐚𝐛𝐥𝐞 𝐂𝐨𝐧𝐟𝐢𝐝𝐞𝐧𝐜𝐞 𝐄𝐬𝐭𝐢𝐦𝐚𝐭𝐢𝐨𝐧.

To build a production-grade cascade (like FrugalGPT), you are essentially solving a meta-problem:

1️⃣ 𝘊𝘢𝘭𝘪𝘣𝘳𝘢𝘵𝘪𝘰𝘯 𝘪𝘴 𝘸𝘦𝘢𝘬: LLMs are notoriously overconfident. A log_prob of 0.99 often means nothing about factual accuracy.

2️⃣ 𝘗𝘳𝘰𝘹𝘺 𝘔𝘰𝘥𝘦𝘭𝘴 𝘢𝘳𝘦 𝘯𝘦𝘦𝘥𝘦𝘥: You can't just trust the model's raw output score. You often need a lightweight "judge" or "verification" head just to decide if the first answer was garbage.

3️⃣ 𝘛𝘩𝘦 𝘛𝘳𝘢𝘥𝘦-𝘰𝘧𝘧: If your verification step is too heavy, you burn all the compute savings you were trying to gain.

It's like trying to save money on a mechanic by asking a random stranger to fix your car first, but you have no way of knowing if they actually fixed it until the engine explodes.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"The bottleneck is failure detection. Without a calibrated confidence score or a lightweight verifier, we can't reliably distinguish easy from hard, meaning we either degrade user trust with bad cheap answers or waste money routing everything to the expensive model anyway."
