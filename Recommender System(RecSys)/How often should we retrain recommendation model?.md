You're in a System Design interview at TikTok. The interviewer sets a trap:

"How often should we retrain the core recommendation model?"

95% of candidates walk right into it.

The Instinct: Most engineers default to the standard MLOps playbook. "We should retrain weekly, or maybe nightly if compute allows. This balances cost with managing concept drift."

It sounds reasonable. It's efficient. It's what you learned in bootcamps. It is also wrong.

The Turn: On high-velocity platforms, "nightly" is an eternity. You are treating User Intent as a static variable. It isn't.

If a viral trend explodes at 2:00 PM, and your model was trained at 4:00 AM, your system is statistically blind. You aren't suffering from "Concept Drift" - you are suffering from immediate irrelevance.

The Senior Solution: The best engineers understand the 𝟏𝟎-𝐌𝐢𝐧𝐮𝐭𝐞 𝐇𝐨𝐫𝐢𝐳𝐨𝐧.

Platforms like Weibo and TikTok don't wait for batch jobs. They architect pipelines that update model weights every ~10 minutes.
- The Bottleneck: It's not compute power, it's the feedback loop speed.
- The Mechanism: They use incremental learning or micro-batch updates to ingest user signals (clicks, skips, shares) almost instantly.
- The Reality: If your model is an hour old, it is effectively serving legacy predictions.

𝐓𝐡𝐞 "𝐇𝐢𝐫𝐞𝐝" 𝐀𝐧𝐬𝐰𝐞𝐫:
"In high-velocity consumer apps, Freshness is not a maintenance metric - it is a performance feature. We don't optimize for 'stable' weights; we optimize for 'live' distribution shifts."

Would you pass the TikTok interview?
