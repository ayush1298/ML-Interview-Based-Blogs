You're in an NVIDIA Deep Learning Performance Engineer interview.

The question:
"We are moving from FP16 to INT8, INT4, and even 1.58-bit (Binary) models. Why does decreasing numerical precision often result in almost zero loss in 'intelligence'?"

You pause - most jump to "Models are over-parameterized."

You reply:
 - LLM weights aren't uniformly distributed; they follow a heavy-tailed distribution. Most weights are near zero and contribute little to the final output.
 - High precision (FP32/16) is necessary during training to capture tiny gradient updates. But during inference, the features the model has learned are robust enough that close enough is often perfect.
 - We use 'Outlier-aware Quantization.' We find the 0.1% of feature weights that have huge magnitudes and keep them in high precision, while squashing the rest into 4 bits.

The interviewer probes:
"What is the actual physical bottleneck we are solving here?"

You explain:
 - It's the 'Memory Wall.' - Moving a 16-bit number from VRAM to the CUDA core consumes orders of magnitude more energy and time than the actual multiplication.
 - By moving to 4-bit, we quadruple the effective memory bandwidth. We can fit a 70B parameter model on a single consumer GPU that would otherwise require an enterprise cluster.
 - We also utilize 'Weight-Only Quantization' where we dequantize back to FP16 just for the calculation, saving memory space while maintaining math accuracy.

Finally, you add:
"Intelligence is about the topology of the high-dimensional space, not the precision of the coordinates. Quantization is just finding a more efficient way to map that."
