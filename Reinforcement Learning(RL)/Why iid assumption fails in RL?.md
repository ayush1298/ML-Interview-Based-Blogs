You're in a Machine Learning Engineer interview at Anthropic, and the interviewer drops this on you:

"In Supervised Learning, we assume data is IID (Independent and Identically Distributed). Why does applying this assumption to a Reinforcement Learning agent, like a coding assistant, cause catastrophic failure?"

Most of candidates say: "It fails because RL data is sequential. The samples are correlated over time (time step t depends on t-1), which technically breaks the Independent part of IID."

𝐖𝐡𝐲 𝐭𝐡𝐢𝐬 𝐟𝐚𝐢𝐥𝐬: It's technically true but academic. It misses the 𝘱𝘳𝘰𝘥𝘶𝘤𝘵𝘪𝘰𝘯 𝘬𝘪𝘭𝘭-switch. It treats the problem like a time-series issue rather than a feedback-loop issue.

The reality is that in 𝐒𝐮𝐩𝐞𝐫𝐯𝐢𝐬𝐞𝐝 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠, the dataset is a static snapshot. In Reinforcement Learning, 𝘵𝘩𝘦 𝘮𝘰𝘥𝘦𝘭 𝘪𝘴 𝘵𝘩𝘦 𝘥𝘢𝘵𝘢𝘴𝘦𝘵 𝘨𝘦𝘯𝘦𝘳𝘢𝘵𝘰𝘳.

The moment your policy (π) updates, the distribution of data it generates changes. If you treat that data as IID, you are optimizing for a world that no longer exists.

𝐓𝐡𝐞 "𝐎𝐮𝐫𝐨𝐛𝐨𝐫𝐨𝐬" 𝐄𝐟𝐟𝐞𝐜𝐭:
- In SL: You map X → Y. The distribution of X is fixed by the dataset creators.
- In RL: You map S → A. But the states S you visit depend entirely on the actions A you took previously.

If your coding assistant learns to fix a specific bug, it stops generating that buggy code. The data distribution shifts. If your training loop assumes stationarity (IID), the agent will 𝘤𝘢𝘵𝘢𝘴𝘵𝘳𝘰𝘱𝘩𝘪𝘤𝘢𝘭𝘭𝘺 “𝘧𝘰𝘳𝘨𝘦𝘵” or 𝘰𝘷𝘦𝘳𝘧𝘪𝘵 𝘵𝘰 𝘰𝘧𝘧-𝘱𝘰𝘭𝘪𝘤𝘺 𝘢𝘳𝘵𝘪𝘧𝘢𝘤𝘵𝘴.

You aren't just fitting a curve; you are hitting a moving target that moves because you hit it.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"In RL, the Policy defines the Data Distribution. Unlike Supervised Learning, the data is Non-Stationary because the agent's own behavior dictates the inputs it sees next. If you ignore this feedback loop, you aren't training an agent, you're overfitting to a ghost."
