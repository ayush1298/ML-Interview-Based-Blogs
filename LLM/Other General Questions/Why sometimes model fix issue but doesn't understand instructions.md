1 month ago • Visible to anyone on or off LinkedIn

“Please explain, in English, why this code is wrong.”

Opus 4.5: the problem is <wrong explanation> 

Gemini 3: <correct code> 

I don’t get it.

How can Opus be smart enough to fix the issue, yet not understand a simple instruction.

LLMs…

Most people assume LLMs *reason* at inference time.
They don’t.
At inference, an LLM does exactly one thing:
→ predict the next token.

Formally:
The model computes logits for every token in the vocabulary.
Then applies: softmax(logits / temperature)
Then samples.

That’s it.

There is no concept of:

- correctness
- task completion
- instruction satisfaction

Only "token likelihood".

Your prompt contains multiple competing signals:

- explain in English
- identify the bug
- sound confident
- follow formatting

Inference collapses all of this into "one probability distribution".

Sometimes the highest-likelihood continuation is:

- a correct code fix
- but a weak explanation

Because those patterns occur "frequently" in training data.

Code repair is often easier than explanation.
Why?

Because code has:
- tighter syntax
- fewer valid continuations
- stronger local constraints

Natural language explanations are far noisier.

The model didn’t “fail to understand”.

It simply sampled from a region of probability mass
that favored "code patterns over prose patterns".

This is why decoding strategy matters.

- Greedy decoding → safer, literal
- Higher temperature → stronger pattern completion
- Top-p sampling → trades precision for diversity

Same weights.
Different outputs.

LLMs don’t reason at inference.
They resolve probability mass.
Once you internalize this, the behavior stops being weird.
