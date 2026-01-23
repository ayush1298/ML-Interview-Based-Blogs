You're in a Principal GenAI Engineer interview at Microsoft, and the interviewer asks:
"Our production RAG system has a 200K token context window. Why is it still failing on complex queries?"

Here's how you can answer:
A. Most candidates say "bigger context = better performance." Dead wrong.
B. There are 4 critical context hygiene failures that kill even GPT-5.

𝟭. 𝗖𝗼𝗻𝘁𝗲𝘅𝘁 𝗗𝗶𝘀𝘁𝗿𝗮𝗰𝘁𝗶𝗼𝗻 - 𝗧𝗵𝗲 𝗽𝗮𝘀𝘁 𝗯𝗲𝗰𝗼𝗺𝗲𝘀 𝗮 𝗽𝗿𝗶𝘀𝗼𝗻
The agent becomes BURDENED by too much history.
What happens:

Tool outputs from 50 interactions ago still clogging context
Past summaries pile up like digital hoarding
Agent over-relies on repeating past behavior instead of reasoning fresh

𝟮. 𝗖𝗼𝗻𝘁𝗲𝘅𝘁 𝗖𝗼𝗻𝗳𝘂𝘀𝗶𝗼𝗻 - 𝗧𝗵𝗲 𝘁𝗼𝗼𝗹 𝗱𝘂𝗺𝗽 𝗱𝗶𝘀𝗮𝘀𝘁𝗲𝗿
Irrelevant tools or documents CROWD the context.
What happens:

System prompt includes 40 tool descriptions
Agent gets distracted by weather_api when user asks about payment processing
Wrong tool selection rates spike to 30%+

Production nightmare:
Trading bot has access to news_search, sentiment_analysis, stock_price, portfolio_manager, risk_calculator, order_executor.
User asks: "What's the current price of AAPL?"
Agent calls order_executor instead of stock_price.
Why? Tool descriptions competing for attention in crowded context.
Solution:
Dynamic Tool Selection: Filter and load ONLY relevant tools per query
Tool Routing Agent: Dedicated agent pre-selects applicable tools before main reasoning
Quality Validation: Check whether retrieved information is actually useful

𝟯. 𝗖𝗼𝗻𝘁𝗲𝘅𝘁 𝗖𝗹𝗮𝘀𝗵 - 𝗖𝗼𝗻𝘁𝗿𝗮𝗱𝗶𝗰𝘁𝗼𝗿𝘆 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗽𝗮𝗿𝗮𝗹𝘆𝘀𝗶𝘀
Conflicting information within context MISLEADS the agent.
What happens:

Document A says "Feature X launches Q1 2024"
Document B says "Feature X delayed to Q3 2024"
Agent gets stuck between conflicting assumptions

Source Attribution: Track which chunk came from where
Temporal Awareness: Weight recent information higher

𝟰. 𝗖𝗼𝗻𝘁𝗲𝘅𝘁 𝗣𝗼𝗶𝘀𝗼𝗻𝗶𝗻𝗴 - 𝗧𝗵𝗲 𝗰𝗼𝗺𝗽𝗼𝘂𝗻𝗱𝗶𝗻𝗴 𝗲𝗿𝗿𝗼𝗿 𝗰𝗮𝘁𝗮𝘀𝘁𝗿𝗼𝗽𝗵𝗲
Incorrect or hallucinated information ENTERS the context.
What happens:

Agent hallucinates "User's API key is abc123" (wrong)
Stores this in memory
REUSES this wrong key in 47 subsequent interactions
Each failure reinforces the bad data

Human-in-the-Loop: Critical decisions require confirmation
Self-Correction: Agent periodically validates its own stored memories
Fact-Checking Layer: Cross-reference with authoritative sources

𝗪𝗵𝗲𝗻 𝗲𝗮𝗰𝗵 𝘀𝗼𝗹𝘂𝘁𝗶𝗼𝗻 𝘄𝗶𝗻𝘀:
✅ Context Summarization: Conversational agents with long history
✅ Context Pruning: Agentic systems that accumulate tool outputs
✅ Dynamic Tool Selection: Multi-tool environments (10+ tools)
✅ Quality Validation: Mission-critical applications (finance, healthcare)
✅ Conflict Resolution: Multi-source RAG systems
✅ Fact-Checking: Agents that store and reuse information
