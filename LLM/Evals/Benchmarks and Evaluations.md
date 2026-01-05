You're in an Anthropic Research Scientist interview.

The interviewer asks: "Benchmarks keep going up. Real-world failures don't. Why?"

You pause.

Most answers blame outdated datasets.

You shake your head.

"Benchmarks measure capability - not reliability," you say. "They reward pattern completion, not decision robustness."

You continue...

"Static benchmarks are easy to overfit. Models learn the format of evaluation faster than the skill it's supposed to test. And aggregate scores hide brittle behaviour."

The interviewer asks: "So what should we measure instead?"

You: "
 - Distribution shift. 
 - Sensitivity to paraphrasing. 
 - Consistency across equivalent inputs. 
 - And most importantly - how often the model knows when to say 'I don't know.'"

The Interviewer: "Make sense but how do you operationalise that?"

You explain: "Use behavioural evaluations - 
 - Perturb inputs instead of labels. 
 - Track error distributions instead of averages. 
 - Measure failure modes explicitly - not just success cases."

You conclude: 
"Benchmarks tell us how smart a model looks. 
Evaluation tells us how safe it is to deploy."
