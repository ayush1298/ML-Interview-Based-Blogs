𝙏𝙝𝙚 𝙎𝙩𝙖𝙩𝙞𝙘 𝘽𝙖𝙩𝙘𝙝𝙞𝙣𝙜 𝙎𝙩𝙖𝙡𝙡 𝙏𝙧𝙖𝙥 🔁

You're in a Systems Interview at OpenAI. The interviewer asks:

"𝘞𝘦 𝘢𝘳𝘦 𝘴𝘦𝘳𝘷𝘪𝘯𝘨 𝘢 𝘤𝘩𝘢𝘵𝘣𝘰𝘵. 𝘛𝘰 𝘮𝘢𝘹𝘪𝘮𝘪𝘻𝘦 𝘵𝘩𝘳𝘰𝘶𝘨𝘩𝘱𝘶𝘵, 𝘸𝘦 𝘸𝘢𝘪𝘵 𝘵𝘰 𝘢𝘤𝘤𝘶𝘮𝘶𝘭𝘢𝘵𝘦 𝘢 𝘣𝘢𝘵𝘤𝘩 𝘰𝘧 32 𝘶𝘴𝘦𝘳 𝘳𝘦𝘲𝘶𝘦𝘴𝘵𝘴 𝘣𝘦𝘧𝘰𝘳𝘦 𝘳𝘶𝘯𝘯𝘪𝘯𝘨 𝘪𝘯𝘧𝘦𝘳𝘦𝘯𝘤𝘦. 𝘜𝘴𝘦𝘳𝘴 𝘢𝘳𝘦 𝘤𝘰𝘮𝘱𝘭𝘢𝘪𝘯𝘪𝘯𝘨 𝘢𝘣𝘰𝘶𝘵 𝘳𝘢𝘯𝘥𝘰𝘮 𝘭𝘢𝘵𝘦𝘯𝘤𝘺 𝘴𝘱𝘪𝘬𝘦𝘴. 𝘞𝘩𝘺?"

🕸️ 90% of candidates walk right into the trap.

They say: "𝘛𝘩𝘦 𝘲𝘶𝘦𝘶𝘦 𝘵𝘪𝘮𝘦 𝘪𝘴 𝘵𝘰𝘰 𝘭𝘰𝘯𝘨. 𝘞𝘦 𝘴𝘩𝘰𝘶𝘭𝘥 𝘳𝘦𝘥𝘶𝘤𝘦 𝘵𝘩𝘦 𝘵𝘪𝘮𝘦𝘰𝘶𝘵 𝘰𝘳 𝘵𝘩𝘦 𝘮𝘢𝘹 𝘣𝘢𝘵𝘤𝘩 𝘴𝘪𝘻𝘦 𝘵𝘰 16."

This effectively admits defeat. You are sacrificing throughput to fix latency.

The Reality: They are suffering from 𝗧𝗵𝗲 𝗦𝘁𝗿𝗮𝗴𝗴𝗹𝗲𝗿 𝗘𝗳𝗳𝗲𝗰𝘁.

In a static batch, all requests must finish before the batch returns.

• Request A generates 5 tokens (short).
• Request B generates 500 tokens (long).

Request A finishes instantly, but the GPU sits idle (or masked out) for that slot while it waits for Request B to finish its 500th token. You are coupling the latency of your fastest user to the latency of your slowest user.

✅ The Solution: You must implement Continuous (iteration-Level) Batching.

Instead of batching at the 𝘳𝘦𝘲𝘶𝘦𝘴𝘵 level, you batch at the 𝘪𝘵𝘦𝘳𝘢𝘵𝘪𝘰𝘯 level.

• After every single token generation step, the scheduler checks if a request has finished.
• If Request A finishes, it is immediately evicted.
• The Insertion: A new Request C is immediately inserted into that empty slot 𝘮𝘪𝘥-𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘪𝘰𝘯.
 

The GPU never waits. It is always fully saturated with active tokens.

✍️ 𝗧𝗵𝗲 𝗔𝗻𝘀𝘄𝗲𝗿 𝗧𝗵𝗮𝘁 𝗚𝗲𝘁𝘀 𝗬𝗢𝘂 𝗛𝗶𝗿𝗲𝗱:
"𝘚𝘵𝘢𝘵𝘪𝘤 𝘣𝘢𝘵𝘤𝘩𝘪𝘯𝘨 𝘤𝘰𝘶𝘱𝘭𝘦𝘴 𝘴𝘩𝘰𝘳𝘵 𝘢𝘯𝘥 𝘭𝘰𝘯𝘨 𝘳𝘦𝘲𝘶𝘦𝘴𝘵𝘴, 𝘤𝘢𝘶𝘴𝘪𝘯𝘨 𝘪𝘥𝘭𝘦 𝘵𝘪𝘮𝘦. 𝘐 𝘸𝘰𝘶𝘭𝘥 𝘴𝘸𝘪𝘵𝘤𝘩 𝘵𝘰 𝘊𝘰𝘯𝘵𝘪𝘯𝘶𝘰𝘶𝘴 𝘉𝘢𝘵𝘤𝘩𝘪𝘯𝘨 (𝘭𝘪𝘬𝘦 𝘪𝘯 𝘖𝘳𝘤𝘢 𝘰𝘳 𝘷𝘓𝘓𝘔). 𝘉𝘺 𝘴𝘤𝘩𝘦𝘥𝘶𝘭𝘪𝘯𝘨 𝘢𝘵 𝘵𝘩𝘦 𝘪𝘵𝘦𝘳𝘢𝘵𝘪𝘰𝘯 𝘭𝘦𝘷𝘦𝘭, 𝘸𝘦 𝘤𝘢𝘯 𝘦𝘷𝘪𝘤𝘵 𝘧𝘪𝘯𝘪𝘴𝘩𝘦𝘥 𝘳𝘦𝘲𝘶𝘦𝘴𝘵𝘴 𝘢𝘯𝘥 𝘪𝘯𝘴𝘦𝘳𝘵 𝘯𝘦𝘸 𝘰𝘯𝘦𝘴 𝘪𝘯𝘴𝘵𝘢𝘯𝘵𝘭𝘺, 𝘥𝘦𝘤𝘰𝘶𝘱𝘭𝘪𝘯𝘨 𝘶𝘴𝘦𝘳 𝘭𝘢𝘵𝘦𝘯𝘤𝘺 𝘧𝘳𝘰𝘮 𝘵𝘩𝘦 𝘣𝘢𝘵𝘤𝘩'𝘴 𝘭𝘰𝘯𝘨𝘦𝘴𝘵 𝘴𝘦𝘲𝘶𝘦𝘯𝘤𝘦."
