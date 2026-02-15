You’re in an ML Engineer interview at OpenAI and the interviewer asks:

“We’re building two RAG systems:
A customer-facing support chatbot that must be fast and safe.
An internal research assistant where analysts prefer seeing too much rather than too little.
How do these workloads stress the RAG stack differently, and what tradeoff are you managing?”

Don’t answer: “Small top-k for chatbot, big top-k for research.”

That’s the what, not the why. The real bottleneck in RAG is the tension between retrieval noise and context bandwidth.

RAG isn’t one step. It’s two:

𝐓𝐡𝐞 𝐑𝐞𝐭𝐫𝐢𝐞𝐯𝐚𝐥 𝐒𝐭𝐚𝐠𝐞 (𝐖𝐡𝐚𝐭 𝐲𝐨𝐮 𝐜𝐨𝐮𝐥𝐝 𝐚𝐧𝐬𝐰𝐞𝐫)
This is where you fetch candidate chunks from your corpus (vector search, BM25, hybrid, filters).
Here you’re optimizing 𝐑𝐞𝐜𝐚𝐥𝐥: “Did I pull in everything that might be relevant?”
Higher recall means more candidates, looser filters, more diverse signals.

Your research assistant loves this stage being aggressive. Analysts would rather see too much and filter mentally than miss a critical edge case.

𝐓𝐡𝐞 𝐂𝐨𝐧𝐭𝐞𝐱𝐭 𝐀𝐬𝐬𝐞𝐦𝐛𝐥𝐲 𝐒𝐭𝐚𝐠𝐞 (𝐖𝐡𝐚𝐭 𝐭𝐡𝐞 𝐋𝐋𝐌 𝐚𝐜𝐭𝐮𝐚𝐥𝐥𝐲 𝐬𝐞𝐞𝐬)
This is where you decide which chunks actually go into the prompt (reranking, de-dup, chunk merging).
Here you’re constrained by 𝐜𝐨𝐧𝐭𝐞𝐱𝐭 𝐰𝐢𝐧𝐝𝐨𝐰 + 𝐦𝐨𝐝𝐞𝐥 𝐚𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧.
Every extra chunk adds latency and cost, and increases the chance the model locks onto the wrong snippet.

Your customer chatbot is dominated by this stage. Users don’t see how much you retrieved — they only see whether the final answer is grounded and on-topic.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:
“The core tradeoff in RAG is balancing high 𝐫𝐞𝐜𝐚𝐥𝐥 in retrieval against high 𝐩𝐫𝐞𝐜𝐢𝐬𝐢𝐨𝐧 under a limited context budget. For the customer chatbot, I’d optimize context assembly: tight filters, strong reranking, and a small, high-confidence set of passages to minimize hallucinations and latency. 
For the research assistant, I’d bias retrieval toward higher recall with broader queries and more candidates, accepting some noise so analysts see as much relevant evidence as possible. 
I treat retrieval as the lever for how wide I cast the net, and context assembly as the lever for how carefully I pack a scarce context window, then tune each system based on where it should sit on that recall–precision spectrum.”
