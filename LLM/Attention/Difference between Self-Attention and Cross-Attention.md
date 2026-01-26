People often get confused between Self-Attention and Cross-Attention.
Here’s the difference:

Self-Attention

- Focus: Each token in a sequence pays attention to all other tokens within the same sequence

- Purpose: Helps the model understand relationships and dependencies between words in the input

- Example: In “The cat sat on the mat,” self-attention helps “sat” understand it relates to “cat”

- Usage: Found in both encoder and decoder blocks of transformers Allows parallel processing and captures long-range dependencies better than RNNs


Cross-Attention

- Focus: Tokens from one sequence pay attention to tokens from a different sequence

- Purpose: Enables the model to align and connect information between two separate inputs

- Example: In translation, cross-attention helps English output words focus on relevant French input words

- Usage: Primarily found in decoder blocks when connecting encoder and decoder Essential for tasks requiring interaction between two different sequences or modalities
