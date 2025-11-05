I spent 2 weeks building an eval framework from scratch.

Then I saw how Anthropic and OpenAI actually do evals.

I did literally everything wrong.

My "eval framework" looked like this:

- 50 hardcoded test cases in a JSON file
- Run prompt through model
- Compare output to expected string
- Pass if exact match, fail otherwise
- Print pass rate

Shipped it. Felt smart. 
It broke in production within 3 days.

The bug report: "Model is way worse after the update"
I checked the evals: 94% pass rate. Same as before.
Spent 4 hours debugging. The issue? My eval was testing the WRONG thing.

I was checking if output contained "yes" or "no". Model learned to always say "yes, but actually no..."

My eval said: ✅ Pass
Reality: Completely broken

btw subscribe to my newsletter and never miss my posts -
https://lnkd.in/g8ZJGsWj 

Mistake #1: Static test cases

I had 50 hardcoded examples. Model memorized the patterns.
What the pros do: Generate test cases programmatically. Vary the phrasing, entities, edge cases. Use templates with random substitutions.
Same capability, infinite test variations. Can't memorize your way out.

Mistake #2: Binary pass/fail

Real models don't output exactly what you expect. They paraphrase. Add context. Sometimes they're "partially right."
My framework: "Expected: Paris, Got: Paris, France" → ❌ FAIL
What I should've done: LLM-as-judge to score 0-10. Parse structured outputs. Use semantic similarity for fuzzy matching.

Binary scoring is a lie.

Mistake #3: Not versioning eval results over time
I ran evals once per deployment. Pass rate looked stable at ~95%.
But I wasn't tracking WHICH questions passed. Questions that passed last month started failing. New ones started passing.
Model was shifting capabilities, not improving.

I was flying blind.

Mistake #4: I was measuring outputs, not capabilities

My eval: "Does the model return valid JSON?"
What I should've measured: "Can the model extract structured data from unstructured text?"

Then I read the papers behind Anthropic's evals and OpenAI's Evals framework.

The principles I missed:

- Model-graded evals (LLM judges LLM outputs)
- Factored cognition (break complex tasks into atomic skills)
- Diverse test distributions (not just happy path)
- Contamination detection (did model see this in training?)

Everything clicked.

A production eval framework needs:

- Test case generator (not static JSON files). 
- Multi-dimensional scoring (not binary pass/fail). 
- Baseline comparison across models. 
- Regression tracking per capability. 
- Contamination checks for data leakage. 
- Version control for eval results over time.

My 2-week project was missing all of this.

The hardest lesson: Your evals will be gamed.

Not intentionally. But models find shortcuts. They learn the eval distribution, not the capability.

This is why test case generation matters. Why you need adversarial examples. Why you rotate your eval sets.
