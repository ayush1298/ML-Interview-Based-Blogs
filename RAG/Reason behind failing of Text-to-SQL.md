𝐘𝐨𝐮𝐫 𝐓𝐞𝐱𝐭-𝐭𝐨-𝐒𝐐𝐋 𝐢𝐬 𝐟𝐚𝐢𝐥𝐢𝐧𝐠 𝐛𝐞𝐜𝐚𝐮𝐬𝐞 𝐨𝐟 𝐨𝐧𝐞 "𝐡𝐢𝐝𝐝𝐞𝐧" 𝐭𝐫𝐚𝐩... 𝐚𝐧𝐝 𝐢𝐭'𝐬 𝐍𝐎𝐓 𝐭𝐡𝐞 𝐋𝐋𝐌'𝐬 𝐟𝐚𝐮𝐥𝐭. 🤯 

If you've ever tried to build a natural language interface for a production database, you know the pain. You ask a simple question, the LLM writes valid-looking SQL, but it returns zero results or throws a join error.

Why? Because most RAG-based SQL tools rely on Vector Search to find tables.

𝐓𝐡𝐞 𝐓𝐫𝐚𝐩: Vector Search is great at semantic matching, but it's "blind" to relational logic. It can find "Publishers" and "Payments," but it misses the "Bridge Table" that connects them because the bridge table's name isn't semantically related to the query.

𝘘𝘶𝘦𝘳𝘺𝘞𝘦𝘢𝘷𝘦𝘳 𝘣𝘺 𝘍𝘢𝘭𝘬𝘰𝘳𝘋𝘉 is the project that finally treats your schema like the web of relationships.

🛠️ 𝐓𝐡𝐞 𝐓𝐞𝐜𝐡𝐧𝐢𝐜𝐚𝐥: 𝐒𝐜𝐡𝐞𝐦𝐚-𝐚𝐬-𝐚-𝐆𝐫𝐚𝐩𝐡
Instead of flattening your metadata into a vector database, 𝘘𝘶𝘦𝘳𝘺𝘞𝘦𝘢𝘷𝘦𝘳 transforms your entire schema into a Graph:
- Tables are Nodes.
- Foreign Keys are Edges.

When a user asks a question, 𝘘𝘶𝘦𝘳𝘺𝘞𝘦𝘢𝘷𝘦𝘳 doesn't just "guess" which tables to use. It uses graph algorithms (like BFS and Shortest Path) to discover the join paths automatically.

📊 𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞 & 𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐆𝐚𝐢𝐧𝐬
- 𝘔𝘶𝘭𝘵𝘪-𝘏𝘰𝘱 𝘙𝘦𝘢𝘴𝘰𝘯𝘪𝘯𝘨: Successfully resolved a 5-hop query on the BIRD benchmark (e.g., jumping from superpower → capability_matrix → stakeholder_registry → resource_requisition → budget_allocation).
- 𝘌𝘧𝘧𝘪𝘤𝘪𝘦𝘯𝘤𝘺: By identifying exactly which "bridge" tables are needed, it reduces context window clutter. No more dumping 50 DDL statements into a prompt and praying.
- 𝘌𝘹𝘵𝘦𝘯𝘴𝘪𝘣𝘭𝘦: Supports Gemini 1.5 Pro, GPT-4, and Claude 3.5 via LiteLLM.

As someone who bridges research and production, here is what to watch out for:
𝘈𝘮𝘣𝘪𝘨𝘶𝘰𝘶𝘴 𝘑𝘰𝘪𝘯 𝘗𝘢𝘵𝘩𝘴. If your database has multiple ways to join two tables (e.g., a "User" linked to "Order" as both a 'Buyer' and a 'Recipient'), the graph needs data sampling to resolve the semantic intent. QueryWeaver handles this by sampling column data to add more context to the nodes, a critical step many open-source tools skip.

𝐑𝐮𝐧 𝐢𝐭 𝐋𝐨𝐜𝐚𝐥𝐥𝐲:
You can spin this up in seconds via Docker:
docker run -p 5000:5000 -it falkordb/queryweaver
