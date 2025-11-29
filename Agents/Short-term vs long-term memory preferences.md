You're in a GenAI Engineer interview at Morgan Stanley, and the interviewer asks:
"We're building an agentic trading assistant that needs to remember client preferences, track portfolio decisions, and adapt strategy over months. Should we use short-term or long-term memory? Justify your architecture."

Here's how you can answer:
A. Most candidates fumble here because they only know "agents need memory." Incomplete answer.
B. There are 4 critical factors every GenAI engineer should understand cold.

𝟭. 𝗧𝗵𝗲 𝗖𝗼𝗻𝘁𝗲𝘅𝘁 𝗪𝗶𝗻𝗱𝗼𝘄 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳 - 𝗧𝗵𝗲 𝗳𝘂𝗻𝗱𝗮𝗺𝗲𝗻𝘁𝗮𝗹 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲
Short-term memory (STM) operates ENTIRELY within the context window:

Duration: Seconds to minutes (single conversation session)
Storage: In-prompt, ephemeral state management
Capacity: Limited by token budget (8K-200K tokens typical)

Long-term memory (LTM) persists ACROSS sessions and conversations:

Duration: Days to years (persistent across sessions)
Storage: External databases (vector stores, knowledge graphs)
Capacity: Virtually unlimited (millions of entities, relationships)

The brutal truth? STM is real-time coherence. LTM is actual intelligence.

𝟮. 𝗧𝗵𝗲 𝗖𝗼𝘀𝘁 𝗙𝗼𝗼𝘁𝗽𝗿𝗶𝗻𝘁 - 𝗪𝗵𝗲𝗿𝗲 𝟵𝟬% 𝗼𝗳 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀 𝗴𝗼 𝘄𝗿𝗼𝗻𝗴
Most people think "just stuff everything in the context window."
Wrong move.
STM token costs compound with EVERY turn
LTM has fixed retrieval costs

But here's the catch - you STILL need both working together.
Real-world production costs? Hybrid STM+LTM cuts token usage 60-80% while improving quality.

3. 𝗧𝗵𝗲 𝗦𝘁𝗮𝘁𝗲 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗧𝗿𝗮𝗱𝗲 - 𝟱𝘅 𝗰𝗼𝗺𝗽𝗹𝗲𝘅𝗶𝘁𝘆, 𝗯𝘂𝘁 𝘄𝗵𝘆?
STM: Zero infrastructure overhead
Pass conversation history in every API call

LTM: Production engineering required
 - Memory extraction: Which facts are worth storing?
 - Memory consolidation: Update vs. append strategies
 - Memory retrieval: Relevance scoring and ranking
 - Memory decay: When to forget outdated information

4. 𝗧𝗵𝗲 𝗗𝗲𝗽𝗹𝗼𝘆𝗺𝗲𝗻𝘁 𝗥𝗲𝗮𝗹𝗶𝘁𝘆 - 𝗧𝗵𝗲 𝗰𝗼𝘀𝘁 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
STM: Simple but brittle
LTM: Complex but scalable


𝗪𝗵𝗲𝗻 𝗦𝗵𝗼𝗿𝘁-𝗧𝗲𝗿𝗺 𝗠𝗲𝗺𝗼𝗿𝘆 𝘄𝗶𝗻𝘀:
✅ Single-session tasks (document Q&A, one-time code generation)
✅ Simple chatbots with no personalization requirements
✅ Prototyping and demos
✅ No compliance requirements for data persistence

𝗪𝗵𝗲𝗻 𝗟𝗼𝗻𝗴-𝗧𝗲𝗿𝗺 𝗠𝗲𝗺𝗼𝗿𝘆 𝘄𝗶𝗻𝘀:
✅ Multi-session workflows (customer support, personal assistants)
✅ Personalization is critical (user preferences, behavioral patterns)
✅ Temporal reasoning required (tracking changes over time)
✅ Complex relationship modeling (enterprise knowledge graphs)


The Final Answer for Your Interview:
"For a production trading assistant, I'd implement a hybrid memory architecture:
Short-term memory handles the current conversation flow.
Long-term memory captures client profiles, portfolio decisions, and strategy patterns. "
