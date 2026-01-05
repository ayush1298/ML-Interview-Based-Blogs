You're in a Machine Learning System Design interview at Google. The interviewer sets a trap:

"We have 3 upstream microservices generating features. They write to a central 𝘗𝘰𝘴𝘵𝘨𝘳𝘦𝘴 𝘋𝘉. Your ML Service queries that DB to get the input vector for inference. How do we scale this to 50k requests per second?"

90% of candidates walk right into the trap. They start optimizing the SQL.

They immediately focuses on the database performance. They suggest:
- Adding aggressive Read Replicas to handle the load.
- Implementing complex caching layers (Redis) to offload the DB.
- Sharding the Postgres instance based on UserID.

It feels right. 𝘐𝘧 𝘵𝘩𝘦 𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦 𝘪𝘴 𝘴𝘭𝘰𝘸, 𝘧𝘪𝘹 𝘵𝘩𝘦 𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦, 𝘳𝘪𝘨𝘩𝘵?

But they aren't solving a 𝐐𝐮𝐞𝐫𝐲 𝐎𝐩𝐭𝐢𝐦𝐢𝐳𝐚𝐭𝐢𝐨𝐧 problem. They are solving a 𝐂𝐨𝐮𝐩𝐥𝐢𝐧𝐠 problem.

By forcing the ML service to read from the disk-based persistence layer of the upstream services, you have created a hidden bottleneck. At 50k TPS, they will hit:
- 𝐋𝐨𝐜𝐤 𝐂𝐨𝐧𝐭𝐞𝐧𝐭𝐢𝐨𝐧: The upstream writes block the downstream reads.
- 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧 𝐒𝐚𝐭𝐮𝐫𝐚𝐭𝐢𝐨𝐧: Postgres runs out of open connections long before it runs out of storage space.
- 𝐓𝐡𝐞 𝐅𝐫𝐞𝐬𝐡𝐧𝐞𝐬𝐬 𝐓𝐚𝐱: You are waiting for disk I/O commits just to move data between apps.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To pass the interview, you need to identify that this is the 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞-𝐚𝐬-𝐐𝐮𝐞𝐮𝐞 𝐀𝐧𝐭𝐢-𝐏𝐚𝐭𝐭𝐞𝐫𝐧.

The solution requires a shift I call 𝘛𝘩𝘦 𝘛𝘳𝘢𝘯𝘴𝘱𝘰𝘳𝘵 𝘋𝘦𝘤𝘰𝘶𝘱𝘭𝘪𝘯𝘨.

Instead of writing to disk (DB) to communicate, you use an in-memory event broker (Kafka/RabbitMQ).
1️⃣ Producers: The 3 upstream services "fire and forget" events to a topic.
2️⃣ The Broker: buffers the high-throughput stream in memory.
3️⃣ The Consumer: Your ML service reads from the stream in real-time.

The Database is demoted. It becomes just another consumer for logging history, not the highway for traffic.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Databases are for Persistence (record of truth). Brokers are for Transport (hand-off). Never force your real-time inference path to wait on a disk write."
