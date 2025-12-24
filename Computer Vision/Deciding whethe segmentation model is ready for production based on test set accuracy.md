You are in a Senior Machine Learning Interview at Google for Health. The interviewer sets a trap:

"Our research team just handed you a gallbladder segmentation model with 99.2% test set accuracy. Is it ready for production?"

90% of candidates walk right into the wall.

The candidate looks at the metrics and nods. They talk about verifying the F1 score on the hold-out set, setting up a canary deployment, and maybe checking inference latency on the T4 GPUs. 
They assume "𝐇𝐢𝐠𝐡 𝐀𝐜𝐜𝐮𝐫𝐚𝐜𝐲" = "𝐇𝐢𝐠𝐡 𝐔𝐧𝐝𝐞𝐫𝐬𝐭𝐚𝐧𝐝𝐢𝐧𝐠."

The interviewer stops you. "We checked all that. We deployed it. And it almost killed a patient."

Why? Because the model didn't learn 𝐚𝐧𝐚𝐭𝐨𝐦𝐲. It learned 𝐚𝐫𝐭𝐢𝐟𝐚𝐜𝐭𝐬.

This is the "𝘊𝘭𝘦𝘷𝘦𝘳 𝘏𝘢𝘯𝘴" effect. The model wasn't detecting the "𝘎𝘰𝘭𝘥𝘦𝘯 𝘛𝘳𝘪𝘢𝘯𝘨𝘭𝘦" (the critical safety view in surgery). It was detecting the presence of a specific surgical tool in the corner of the image that only appears during that phase of the operation.

When the surgeon changed tools, the model's confidence collapsed. The test set didn't catch this because the tool was present in all the "positive" test images too.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To pass this interview, you don't talk about F1 scores. You introduce 𝐓𝐡𝐞 𝐁𝐥𝐚𝐜𝐤 𝐏𝐚𝐭𝐜𝐡 𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥.

You explain that before deployment, you torture the model with "Adversarial Stress Testing" using two specific techniques:

1. 𝐈𝐧𝐯𝐚𝐫𝐢𝐚𝐧𝐜𝐞 𝐓𝐞𝐬𝐭𝐢𝐧𝐠: 
Rotate the input image by 15° or crop the edges. The anatomy hasn't changed, so the prediction shouldn't either. If confidence swings from 0.99 to 0.40 just because you rotated the camera, the model is overfitting on pixel-level noise.

2. 𝐃𝐢𝐫𝐞𝐜𝐭𝐢𝐨𝐧𝐚𝐥 𝐄𝐱𝐩𝐞𝐜𝐭𝐚𝐭𝐢𝐨𝐧 (𝐓𝐡𝐞 "𝐁𝐥𝐚𝐜𝐤 𝐏𝐚𝐭𝐜𝐡"):
Manually black out the actual gallbladder in the image.
- 𝘌𝘹𝘱𝘦𝘤𝘵𝘦𝘥 𝘙𝘦𝘴𝘶𝘭𝘵: The model should scream "No Gallbladder Found."
- 𝘍𝘢𝘵𝘢𝘭 𝘙𝘦𝘴𝘶𝘭𝘵: If the model still predicts "Gallbladder" with 90% confidence, it is looking at the background, not the organ.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"Test set metrics measure correlation, not causality. In high-stakes Computer Vision, I don't validate performance; I validate focus. If the model predicts the target when the target is invisible, it's not a model, it's a random number generator."
