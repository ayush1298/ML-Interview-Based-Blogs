𝙏𝙝𝙚 𝙎𝙩𝙧𝙞𝙙𝙚𝙙 𝘼𝙘𝙘𝙚𝙨𝙨 𝙏𝙧𝙖𝙥 🚪

You're in a High-Performance Computing interview at NVIDIA. The interviewer shows you a CUDA kernel for matrix manipulation.

"𝘞𝘦 𝘭𝘢𝘶𝘯𝘤𝘩 1024 𝘵𝘩𝘳𝘦𝘢𝘥𝘴. 𝘛𝘩𝘳𝘦𝘢𝘥 𝘪 𝘳𝘦𝘢𝘥𝘴 𝘤𝘰𝘭𝘶𝘮𝘯 𝘪 𝘰𝘧 𝘵𝘩𝘦 𝘮𝘢𝘵𝘳𝘪𝘹 𝘧𝘳𝘰𝘮 𝘨𝘭𝘰𝘣𝘢𝘭 𝘮𝘦𝘮𝘰𝘳𝘺. 𝘛𝘩𝘦 𝘤𝘰𝘥𝘦 𝘪𝘴 𝘭𝘰𝘨𝘪𝘤𝘢𝘭𝘭𝘺 𝘤𝘰𝘳𝘳𝘦𝘤𝘵, 𝘣𝘶𝘵 𝘵𝘩𝘦 𝘮𝘦𝘮𝘰𝘳𝘺 𝘣𝘢𝘯𝘥𝘸𝘪𝘥𝘵𝘩 𝘪𝘴 10𝘹 𝘭𝘰𝘸𝘦𝘳 𝘵𝘩𝘢𝘯 𝘵𝘩𝘦 𝘴𝘱𝘦𝘤. 𝘞𝘩𝘺?"

🗣️ 90% of candidates walk right into the trap.

They say: "𝘔𝘢𝘺𝘣𝘦 𝘸𝘦 𝘩𝘢𝘷𝘦 𝘣𝘢𝘯𝘬 𝘤𝘰𝘯𝘧𝘭𝘪𝘤𝘵𝘴 𝘪𝘯 𝘚𝘩𝘢𝘳𝘦𝘥 𝘔𝘦𝘮𝘰𝘳𝘺?"

Wrong memory. We aren't even in Shared Memory yet.

The Reality: They are killing performance with 𝗨𝗻𝗰𝗼𝗮𝗹𝗲𝘀𝗰𝗲𝗱 𝗔𝗰𝗰𝗲𝘀𝘀.

DRAM is not accessed byte-by-byte. It is accessed in "transactions" (typically 32 or 128 bytes). If Thread 0 reads Address 0, and Thread 1 reads Address 100 (column-major stride), the GPU cannot bundle these requests.

• For Thread 0, it fetches 128 bytes just to use 4 bytes.
• For Thread 1, it fetches 𝘢𝘯𝘰𝘵𝘩𝘦𝘳 128 bytes just to use 4 bytes.
 

You are wasting ~90% of your memory bandwidth transferring data you don't need.

✅ The Solution: You need 𝗠𝗲𝗺𝗼𝗿𝘆 𝗖𝗼𝗮𝗹𝗲𝘀𝗰𝗶𝗻𝗴.

You must ensure that consecutive threads read consecutive memory addresses. If the algorithm requires column access (which is strided):

1. 𝗟𝗼𝗮𝗱 𝗖𝗼𝗮𝗹𝗲𝘀𝗰𝗲𝗱: Have threads read 𝘳𝘰𝘸𝘴 (contiguous data) into a Shared Memory tile first.
 
2. 𝗦𝘆𝗻𝗰: __𝚜𝚢𝚗𝚌𝚝𝚑𝚛𝚎𝚊𝚍𝚜().
 
3. 𝗥𝗲𝗮𝗱 𝗦𝘁𝗿𝗶𝗱𝗲𝗱: Have threads read from the Shared Memory (which is fast random access) in column order to perform the math.
 

✍️ 𝗧𝗵𝗲 𝗔𝗻𝘀𝘄𝗲𝗿 𝗧𝗵𝗮𝘁 𝗚𝗲𝘁𝘀 𝗬𝗼𝘂 𝗛𝗶𝗿𝗲𝗱: 
"𝘛𝘩𝘦 𝘵𝘩𝘳𝘦𝘢𝘥𝘴 𝘢𝘳𝘦 𝘢𝘤𝘤𝘦𝘴𝘴𝘪𝘯𝘨 𝘨𝘭𝘰𝘣𝘢𝘭 𝘮𝘦𝘮𝘰𝘳𝘺 𝘸𝘪𝘵𝘩 𝘢 𝘭𝘢𝘳𝘨𝘦 𝘴𝘵𝘳𝘪𝘥𝘦, 𝘣𝘳𝘦𝘢𝘬𝘪𝘯𝘨 𝘔𝘦𝘮𝘰𝘳𝘺 𝘊𝘰𝘢𝘭𝘦𝘴𝘤𝘪𝘯𝘨. 𝘛𝘩𝘦 𝘎𝘗𝘜 𝘪𝘴 𝘧𝘦𝘵𝘤𝘩𝘪𝘯𝘨 𝘧𝘶𝘭𝘭 𝘤𝘢𝘤𝘩𝘦 𝘭𝘪𝘯𝘦𝘴 𝘧𝘰𝘳 𝘴𝘪𝘯𝘨𝘭𝘦 4-𝘣𝘺𝘵𝘦 𝘸𝘰𝘳𝘥𝘴. 𝘐 𝘸𝘰𝘶𝘭𝘥 𝘪𝘮𝘱𝘭𝘦𝘮𝘦𝘯𝘵 𝘚𝘩𝘢𝘳𝘦𝘥 𝘔𝘦𝘮𝘰𝘳𝘺 𝘛𝘪𝘭𝘪𝘯𝘨: 𝘭𝘰𝘢𝘥 𝘢 𝘵𝘪𝘭𝘦 𝘧𝘳𝘰𝘮 𝘨𝘭𝘰𝘣𝘢𝘭 𝘮𝘦𝘮𝘰𝘳𝘺 𝘤𝘰𝘯𝘵𝘪𝘨𝘶𝘰𝘶𝘴𝘭𝘺 (𝘤𝘰𝘢𝘭𝘦𝘴𝘤𝘦𝘥), 𝘢𝘯𝘥 𝘵𝘩𝘦𝘯 𝘩𝘢𝘷𝘦 𝘵𝘩𝘳𝘦𝘢𝘥𝘴 𝘢𝘤𝘤𝘦𝘴𝘴 𝘤𝘰𝘭𝘶𝘮𝘯𝘴 𝘧𝘳𝘰𝘮 𝘵𝘩𝘦 𝘭𝘰𝘸-𝘭𝘢𝘵𝘦𝘯𝘤𝘺 𝘚𝘩𝘢𝘳𝘦𝘥 𝘔𝘦𝘮𝘰𝘳𝘺."
