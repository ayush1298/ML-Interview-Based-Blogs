You're in a GenAI Engineer interview at Microsoft, and the interviewer asks:
"We need to build a model capable of complex legal reasoning and self-correction. Should we stick to Supervised Fine-Tuning (SFT) or implement Group Relative Policy Optimization (GRPO)? Justify your choice."

Here's how you can answer:

A. Most candidates fumble here because they say "SFT is standard, supervised, GRPO = RL-based.” Incomplete answer.

B. There are 5 critical factors every GenAI engineer should understand cold.


𝟭. 𝗧𝗵𝗲 𝗢𝗯𝗷𝗲𝗰𝘁𝗶𝘃𝗲 𝗗𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲 — 𝗪𝗵𝗮𝘁 𝗽𝗿𝗼𝗯𝗹𝗲𝗺 𝗮𝗿𝗲 𝘆𝗼𝘂 𝗥𝗘𝗔𝗟𝗟𝗬 𝘀𝗼𝗹𝘃𝗶𝗻𝗴?
Supervised Fine Tuning (SFT)

You are teaching the model what to say.
Great for:

 • Instruction following
 • Domain adaptation
 • Style alignment
 • Knowledge grounding

BUT: SFT reinforces imitation, not preference optimization.
It doesn’t enforce long-horizon reasoning quality.

GRPO (Generative Reward Policy Optimization)

You are teaching the model why something is better.
It optimizes preference, reasoning quality, and long-context decision consistency.

Key truth:
SFT shapes behavior.
GRPO shapes judgment.


𝟮. 𝗗𝗮𝘁𝗮 𝗥𝗲𝗾𝘂𝗶𝗿𝗲𝗺𝗲𝗻𝘁𝘀 — 𝗧𝗵𝗲 𝗽𝗼𝗶𝗻𝘁 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
SFT Data: Cheap, abundant, scalable

You can use:

 • Human-annotated Q/A
 • Conversation logs
 • Synthetic data from larger LLMs

GRPO Data: Expensive, specialized, high-quality

Requires preference pairs or reward models that actually capture quality.

Labeling cost: higher
Quality sensitivity: extreme


𝟯. 𝗦𝘁𝗮𝗯𝗶𝗹𝗶𝘁𝘆 & 𝗖𝗼𝗻𝘁𝗿𝗼𝗹 — 𝗪𝗵𝘆 𝗲𝗻𝘁𝗲𝗿𝗽𝗿𝗶𝘀𝗲𝘀 𝗳𝗲𝗮𝗿 𝗥𝗟-𝗯𝗮𝘀𝗲𝗱 𝗺𝗲𝘁𝗵𝗼𝗱𝘀
SFT

 • Stable
 • Deterministic
 • No mode collapse

Typical failure mode:
Model becomes too verbose or too polite.

GRPO

 • Can oscillate
 • Can over-optimize rewards
 • Can hallucinate confidently if reward is misaligned


4. 𝗧𝗵𝗲 𝗖𝗼𝗺𝗽𝘂𝘁𝗲 𝗘𝗰𝗼𝗻𝗼𝗺𝗶𝗰𝘀 - 𝗧𝗵𝗲 𝗵𝗶𝗱𝗱𝗲𝗻 𝘁𝗮𝘅 𝗛𝗲𝗿𝗲 𝗶𝘀 𝘄𝗵𝗮𝘁 𝘀𝗲𝗽𝗮𝗿𝗮𝘁𝗲𝘀 𝗷𝘂𝗻𝗶𝗼𝗿 𝗳𝗿𝗼𝗺 𝘀𝗲𝗻𝗶𝗼𝗿 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀:

SFT: Linear compute cost. One forward/backward pass per token.

GRPO: Massive overhead. GRPO training throughput is 10x-20x lower than SFT

𝟱. 𝗧𝗵𝗲 𝗗𝗲𝗽𝗹𝗼𝘆𝗺𝗲𝗻𝘁 𝗥𝗲𝗮𝗹𝗶𝘁𝘆 - 𝗙𝗼𝗿𝗺𝗮𝘁 𝘃𝘀. 𝗟𝗼𝗴𝗶𝗰

SFT: Wins on strict formatting (JSON, SQL schemas, brand voice).

GRPO: Wins on open-ended problem solving, math, and coding where the "path" isn't fixed.

When to Use What — The production rulebook
When SFT WINS (use SFT):

✅ You’re adapting a base model to a domain
✅ You want consistent formatting or style
✅ You need predictable, controllable outputs
✅ Safety, stability, and low risk are critical


When GRPO WINS (use GRPO):

✅ You need reasoning quality increase
✅ Output quality is subjective or preference-based
✅ Your pipeline tolerates RL instability
✅ You’re optimizing business-critical KPIs
