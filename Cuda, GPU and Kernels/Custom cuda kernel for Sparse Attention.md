"𝗪𝗲 𝗮𝗿𝗲 𝘄𝗿𝗶𝘁𝗶𝗻𝗴 𝗮 𝗰𝘂𝘀𝘁𝗼𝗺 𝗖𝗨𝗗𝗔 𝗸𝗲𝗿𝗻𝗲𝗹 𝗳𝗼𝗿 𝘀𝗽𝗮𝗿𝘀𝗲 𝗮𝘁𝘁𝗲𝗻𝘁𝗶𝗼𝗻. 𝗪𝗲 𝗻𝗲𝗲𝗱 𝘁𝗼 𝘀𝗸𝗶𝗽 𝗰𝗮𝗹𝗰𝘂𝗹𝗮𝘁𝗶𝗼𝗻 𝗳𝗼𝗿 𝘁𝗼𝗸𝗲𝗻𝘀 𝘄𝗶𝘁𝗵 𝘇𝗲𝗿𝗼 𝗺𝗮𝘀𝗸𝗶𝗻𝗴."

The Algorithm: 𝚒𝚏 (𝚖𝚊𝚜𝚔[𝚒] != 𝟶) { 𝚌𝚘𝚖𝚙𝚞𝚝𝚎(); } The Junior Engineer thinks this saves time.

🅰️ 𝗢𝗽𝘁𝗶𝗼𝗻 𝗔: 𝗡𝗮𝗶𝘃𝗲 𝗕𝗿𝗮𝗻𝗰𝗵𝗶𝗻𝗴 Write the 𝚒𝚏 statement directly in the CUDA kernel. 𝘛𝘩𝘦 𝘍𝘢𝘪𝘭𝘶𝘳𝘦: 𝗪𝗮𝗿𝗽 𝗗𝗶𝘃𝗲𝗿𝗴𝗲𝗻𝗰𝗲. GPU threads execute in groups of 32 (Warps) in Lock-Step. If 𝘰𝘯𝘦 thread in the warp needs to compute, 𝘢𝘭𝘭 32 threads must wait for it to finish. You saved no time, but you added instruction overhead.

🅱️ 𝗢𝗽𝘁𝗶𝗼𝗻 𝗕: 𝗖𝗣𝗨 𝗦𝗼𝗿𝘁𝗶𝗻𝗴 Sort the data on the CPU so all non-zero elements are together before sending to GPU. 𝘛𝘩𝘦 𝘍𝘢𝘪𝘭𝘶𝘳𝘦: 𝗣𝗖𝗜𝗲 𝗕𝗼𝘁𝘁𝗹𝗲𝗻𝗲𝗰𝗸. Moving data back and forth to sort it is 100x slower than just doing the wasted math.

🔑 𝗧𝗵𝗲 "𝗧𝗵𝗶𝗿𝗱 𝗗𝗼𝗼𝗿" 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻: 𝗦𝘁𝗿𝗲𝗮𝗺 𝗖𝗼𝗺𝗽𝗮𝗰𝘁𝗶𝗼𝗻 (𝗣𝗿𝗲𝗳𝗶𝘅 𝗦𝘂𝗺) We reorganize the data on-chip.

1. We run a parallel "Prefix Sum" (Scan) algorithm to calculate the new index for every valid element.
 
2. We write the valid elements into a dense, contiguous array in Shared Memory.
 
3. We launch a new compute block on this dense array.
 

𝗧𝗵𝗲 𝗢𝘂𝘁𝗰𝗼𝗺𝗲: All threads in the warp are active 100% of the time. We achieve massive speedups for sparse data without leaving the GPU.

📖 𝗧𝗵𝗲 𝗟𝗲𝘀𝘀𝗼𝗻: On a GPU, 𝗠𝗮𝘁𝗵 𝗶𝘀 𝗰𝗵𝗲𝗮𝗽. 𝗖𝗼𝗻𝘁𝗿𝗼𝗹 𝗳𝗹𝗼𝘄 𝗶𝘀 𝗲𝘅𝗽𝗲𝗻𝘀𝗶𝘃𝗲. Never let threads in a warp disagree on where to go.
