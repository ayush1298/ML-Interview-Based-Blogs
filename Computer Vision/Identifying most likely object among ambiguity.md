You're in a final-round Computer Vision interview at OpenAI. The interviewer pulls up an image of a pair of scissors and draws a single dot on the handle.

"Your user clicks here. What mask does your model output?"

90% of candidates walk right into the trap.

"I'd train the model to output the most likely object, the whole scissors," they say.

Or perhaps, "I'd train it to detect the specific part, the handle, based on the pixel class."

It sounds decisive. It's also fatal for their loss curve.

They are assuming the user's intent is knowable. It isn't.

A single point is mathematically ambiguous. Does the user want the handle? The blade? Or the entire tool?

If they force their model to converge on one "correct" answer during training, they are punishing it for valid hypotheses.

If Image A says "dot on handle = scissors" and Image B says "dot on handle = handle," they create conflicting gradients. The model tries to satisfy both, fails, and converges on a blurry, mediocre average.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: You don't guess. You architect for uncertainty using 𝐓𝐡𝐞 𝐀𝐦𝐛𝐢𝐠𝐮𝐢𝐭𝐲 𝐃𝐞𝐜𝐨𝐮𝐩𝐥𝐢𝐧𝐠.

You design the decoder to output three distinct masks simultaneously for every single prompt (typically corresponding to Whole, Part, and Sub-part).

The production secret lies in the loss function:
1️⃣ You compare all three predictions to the ground truth.
2️⃣ You calculate the loss for all three.
3️⃣ Crucially: You only backpropagate the gradient from the single best match.

You effectively tell the model: "As long as one of your three hypotheses is correct, you win. You are not penalized for the other two being wrong."

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"Ambiguity is inherent to the prompt, not the model. I solve this by predicting multiple valid masks (Whole, Part, Sub-part) and using a 'Minimum-over-N' loss to reward the best hypothesis rather than averaging the error."
