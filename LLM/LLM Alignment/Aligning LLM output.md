"𝗢𝘂𝗿 𝗰𝗵𝗮𝘁 𝗺𝗼𝗱𝗲𝗹 𝗶𝘀 𝘁𝗲𝗰𝗵𝗻𝗶𝗰𝗮𝗹𝗹𝘆 𝗮𝗰𝗰𝘂𝗿𝗮𝘁𝗲 𝗯𝘂𝘁 𝗿𝘂𝗱𝗲. 𝗪𝗲 𝗻𝗲𝗲𝗱 𝘁𝗼 𝗮𝗹𝗶𝗴𝗻 𝗶𝘁 𝘁𝗼 '𝗛𝗲𝗹𝗽𝗳𝘂𝗹 & 𝗛𝗮𝗿𝗺𝗹𝗲𝘀𝘀' 𝗯𝘆 𝗙𝗿𝗶𝗱𝗮𝘆." 🤯

The Safety Team has 10,000 human preference pairs (A vs B). The Engineering Lead is terrified of RLHF pipelines.

🅰️ 𝗢𝗽𝘁𝗶𝗼𝗻 𝗔: 𝗧𝗵𝗲 𝗣𝗿𝗼𝗺𝗽𝘁 𝗘𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝗶𝗻𝗴 𝗕𝗮𝗻𝗱-𝗔𝗶𝗱 We inject "Be nice and helpful" into the system prompt. 𝘛𝘩𝘦 𝘍𝘢𝘪𝘭𝘶𝘳𝘦: 𝗧𝗵𝗲 𝗪𝗮𝗹𝘂𝗶𝗴𝗶 𝗘𝗳𝗳𝗲𝗰𝘁. A determined user can easily "jailbreak" the persona. System prompts are suggestions, not constraints.

🅱️ 𝗢𝗽𝘁𝗶𝗼𝗻 𝗕: 𝗧𝗵𝗲 𝗙𝘂𝗹𝗹 𝗣𝗣𝗢 (𝗣𝗿𝗼𝘅𝗶𝗺𝗮𝗹 𝗣𝗼𝗹𝗶𝗰𝘆 𝗢𝗽𝘁𝗶𝗺𝗶𝘇𝗮𝘁𝗶𝗼𝗻) We train a Reward Model, then run PPO to optimize the policy. 𝘛𝘩𝘦 𝘍𝘢𝘪𝘭𝘶𝘳𝘦: 𝗧𝗿𝗮𝗶𝗻𝗶𝗻𝗴 𝗜𝗻𝘀𝘁𝗮𝗯𝗶𝗹𝗶𝘁𝘆. PPO is notoriously sensitive to hyperparameters. You need to manage four models in memory (Actor, Critic, Reward, Ref). The cluster runs out of VRAM, and the model collapses into gibberish (mode collapse).

🔑 𝗧𝗵𝗲 "𝗧𝗵𝗶𝗿𝗱 𝗗𝗼𝗼𝗿" 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻: 𝗗𝗣𝗢 (𝗗𝗶𝗿𝗲𝗰𝘁 𝗣𝗿𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗲 𝗢𝗽𝘁𝗶𝗺𝗶𝘇𝗮𝘁𝗶𝗼𝗻) We skip the Reward Model entirely.

1. We treat the preference data as a direct classification problem.
 
2. We implicitly optimize the reward by adjusting the likelihood of the "chosen" response vs. the "rejected" response, weighted by a KL-divergence constraint.
 
3. It's a simple cross-entropy loss calculation, stable as standard fine-tuning.
 

𝗧𝗵𝗲 𝗢𝘂𝘁𝗰𝗼𝗺𝗲: We achieve state-of-the-art alignment performance with 1/4 of the memory footprint and zero Reinforcement Learning headaches.

📖𝗧𝗵𝗲 𝗟𝗲𝘀𝘀𝗼𝗻: If you can mathematically eliminate a model from your pipeline, do it. Simplicity scales.