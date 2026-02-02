You are in a Senior AI Interview at Meta. The interviewer sets a trap:

"We are building a Multimodal LLM like LLaVA. We need to feed the frozen CLIP image embeddings into our Language Model. Should we use the final [CLS] token?"

90% of candidates walk right into it.

They say: "Yes, absolutely. The [CLS] token is the global representation of the image. It's a single, efficient vector that minimizes context window usage and captures the 'essence' of the image. It worked for BERT, so it works here."

This answer reveals they understand Classification, but they don't understand Reasoning.

The [CLS] token is trained via a contrastive loss (CLIP) to match a text caption. It is aggressively optimized to be a global summary.

To achieve this "summary", the model collapses all spatial geometry. It knows that there is a dog in the image, but it has mathematically "forgotten" where the dog is to save space.

If they feed this token to an LLM and ask, "Is the dog to the left or right of the car?", the LLM will hallucinate. It literally cannot see the geometry anymore.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:  Instead of the single [CLS] vector, you must extract the grid of feature patches (the token sequence representing the 256 patches of the image).

Furthermore, you shouldn't even use the final layer.

- The Final Layer: Is too overfitted to the text-matching objective (Contrastive Loss).
- The Penultimate Layer: Contains richer, denser spatial information that hasn’t yet been “collapsed” for the final dot product.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"We reject the [CLS] token because it suffers from spatial collapse. Instead, we extract the patch embeddings from the penultimate layer of the vision encoder to preserve the 2D geometry required for spatial reasoning."
