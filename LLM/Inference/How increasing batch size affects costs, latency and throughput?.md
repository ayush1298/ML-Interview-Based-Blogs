You're in a Senior ML Engineer interview at Anthropic and the interviewer asks:

"Our ops team wants to 8x our batch size to cut costs and improve throughput. Why is this a dangerous move for user experience, and at what point does this strategy stop making sense... before you run out of memory?"

The common answer: "It will increase latency because the batch is bigger."
This is 10% of the answer. It's vague, obvious, and misses the real production bottleneck.

𝐇𝐞𝐫𝐞'𝐬 𝐭𝐡𝐞 𝐫𝐞𝐚𝐥𝐢𝐭𝐲 𝐨𝐟 𝐩𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐢𝐧𝐟𝐞𝐫𝐞𝐧𝐜𝐞.

You're in a constant war between two different clocks:
- Throughput (total tokens/sec for the server)
- Latency (total time/token for the user)

Increasing the batch size (B) is a direct attack on user latency.

Think of it like a ski lift.
- B=1 (a T-bar): Low server throughput. Only one person goes up at a time. But your personal wait time (latency) is almost zero. You arrive, you go.
- B=64 (a high-speed gondola): Massive server throughput. But you must wait for 63 other people to load before the door even closes.

In LLM inference, every user in that 64-person batch has to wait for the entire batch's computation to finish just to get their next token. This is the per-token latency, and it's what makes an app feel slow and sluggish.

𝐁𝐮𝐭 𝐰𝐡𝐲 𝐝𝐨 𝐫𝐞𝐭𝐮𝐫𝐧𝐬 𝐝𝐢𝐦𝐢𝐧𝐢𝐬𝐡?

This is the key. Your throughput doesn't scale linearly with the batch size. It hits a "hump" and then can actually decrease.

Why? Because the per-token latency itself gets slower as the batch grows.

You aren't just processing B users; you're also storing the massive KV Cache for all B users. This means more memory I/O, which slows down the entire step.

Your throughput calculation is Throughput = Batch Size / Latency.
- B=1 -> B=8: Latency barely increases. Throughput flies up. Great!
- B=32 -> B=64: You doubled B, but the sheer size of the combined computation and memory access also doubles your latency.

You've now doubled the work, made 64 users wait longer, and your total throughput... is exactly the same. You've hit the point of diminishing returns.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

"Throughput is a cost metric, but per-token latency is a product metric. We can increase the batch size, but only up to the peak of the throughput-latency curve. After that 'hump', we're just adding latency for zero gain, burning GPU cycles, and killing the user experience."


A good blog on best practises to increase throughput: 
https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices
