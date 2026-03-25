You’re in an Anthropic Applied Research Scientist interview.

The question lands:
"Why do tool-using agents often hallucinate function calls even when APIs are available?"

You think for a second.
It’s not about knowledge - it's about context grounding.

You respond:
Tool use requires the model to reason over two spaces: natural language and structured APIs.

If the schema or examples aren't consistently represented in-context, the model drifts - it imagines tools it's seen elsewhere.

You continue:
 - The LLM's prior biases often dominate retrieval cues.
 - Lack of structured grounding (like JSON schema hints) breaks parsing.
 - And tool latency feedback disrupts the reasoning loop - the model "hallucinates forward."

You add:
"That's why modern agent frameworks use function calling protocols with schema tokens, tool embeddings, and reliable error reflection - to tighten the loop."
