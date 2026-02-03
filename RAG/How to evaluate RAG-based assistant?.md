You’re in an ML Engineer interview at Google DeepMind 

“We’re shipping a RAG-based assistant in 3 weeks.
We need an evaluation strategy we can trust.
How do you balance:
 • Manual spot checks
 • Automated evals (LLM-as-judge, metrics)
so we know it’s safe to ship?”

Don’t answer: “We’ll use both manual and automated evals.”

That’s the what, not the why. The real tension is depth vs coverage with limited human time.

𝐌𝐚𝐧𝐮𝐚𝐥 𝐒𝐩𝐨𝐭 𝐂𝐡𝐞𝐜𝐤𝐬 (𝐃𝐞𝐞𝐩, 𝐛𝐮𝐭 𝐧𝐚𝐫𝐫𝐨𝐰)

Humans read real Q&A and judge:
 • Did it solve the user’s problem?
 • Was it grounded in the right evidence?

Manual review gives you nuance and new failure modes (subtle hallucinations, “technically right but useless” answers) and creates a shared definition of “good”.

But it’s slow and doesn’t scale. You can’t run it on every build.

𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐞𝐝 𝐄𝐯𝐚𝐥𝐬 (𝐖𝐢𝐝𝐞, 𝐛𝐮𝐭 𝐚𝐩𝐩𝐫𝐨𝐱𝐢𝐦𝐚𝐭𝐞)

You turn that human judgment into always-on signals:
 • LLM-as-judge for correctness, grounding, completeness, safety
 • RAG metrics: retrieval hit rate, citation use, “I don’t know” rate
 • Product metrics: thumbs, escalations, follow-up rate

Automated evals give you wide coverage, fast feedback on prompt / retrieval / model changes, and regression alerts in CI.

But they’re only as good as the rubric and gold set behind them. Left alone, they drift away from what users actually care about.

𝐓𝐡𝐞 𝐚𝐧𝐬𝐰𝐞𝐫 𝐭𝐡𝐚𝐭 𝐠𝐞𝐭𝐬 𝐲𝐨𝐮 𝐡𝐢𝐫𝐞𝐝:

I’d treat eval as a layered system, not a single score. I’d start with manual deep dives on realistic queries with domain experts to define a simple rubric for what ‘good’ looks like (correct, grounded, safe, useful) and turn that into a small gold set. From there, I’d encode that rubric into automated evals — LLM-as-judge plus RAG- and product-level metrics — that run on every change and block serious regressions. I’d keep a steady trickle of human spot checks across high-, low-, and mid-scoring answers, and whenever human judgment and metrics disagree, we update the rubric and recalibrate the automated evals. Manual eval sets the standard; automation scales it across every build
