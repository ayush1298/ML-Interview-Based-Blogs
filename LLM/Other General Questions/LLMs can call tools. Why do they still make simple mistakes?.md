You are in an Amazon Applied Scientist interview.

The interviewer asks:
"LLMs can call tools. Why do they still make simple mistakes?"

You pause.

Most answers blame orchestration.

You explain it differently.
"Tools extend capability, but the model still decides when and how to use them. That decision is probabilistic."

You continue.
"The model does not know that a tool is correct. It knows that using the tool often leads to good-looking text."

The interviewer nods.
"So tool use is learned behavior?"

You confirm.
"Yes. If the model misjudges confidence, it may skip the tool. If it overtrusts itself, it guesses."

They ask.
"How do you improve this?"

You respond.
"Teach uncertainty explicitly. Penalize guessing when tools are available. And separate decision-making from execution."

They push further.
"What happens if you do not?"

You answer.
"You get systems that look autonomous but fail silently. They appear capable until precision matters."

You conclude.
"Tools do not make models reliable. Judgment does. And judgment must be trained."
