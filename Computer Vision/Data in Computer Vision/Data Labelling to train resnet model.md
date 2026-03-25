You're in a Senior Computer Vision interview at Google and the interviewer drops this scenario:

"We trained a high-capacity ResNet on 500k images, but it's still overfitting. My Product Manager wants to spend $20k to label another 500k random images scraped from the same source. Do you approve the budget?"

Don't say: "Yes! Deep learning models are data-hungry. To fix high variance, we just need to feed the beast more data."

That answer is how companies burn millions on compute with zero performance gain.

The reality is that "𝘉𝘪𝘨 𝘋𝘢𝘵𝘢" is often just "𝘙𝘦𝘥𝘶𝘯𝘥𝘢𝘯𝘵 𝘋𝘢𝘵𝘢."

If your model is overfitting, it means it has memorized the training set but fails on the validation set. Adding 500k more images from the exact same distribution (e.g., more sunny highway driving) often provides near-zero 𝐌𝐚𝐫𝐠𝐢𝐧𝐚𝐥 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐆𝐚𝐢𝐧.

You aren't teaching the model new concepts; you're just reinforcing its existing biases.

The production bottleneck isn't 𝘷𝘰𝘭𝘶𝘮𝘦, it's 𝘤𝘰𝘷𝘦𝘳𝘢𝘨𝘦. 

It’s like studying for a calculus exam by memorizing "2+2=4" a thousand times. You have "more data" but you haven't expanded your knowledge manifold.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧:  You need 𝘈𝘤𝘵𝘪𝘷𝘦 𝘓𝘦𝘢𝘳𝘯𝘪𝘯𝘨. Instead of random scraping, run inference on the unlabeled pool and only pay to label the samples where the model's confidence is low or entropy is high.

We don't need more data. We need 𝘏𝘢𝘳𝘥 𝘕𝘦𝘨𝘢𝘵𝘪𝘷𝘦𝘴 and edge cases that push the decision boundary.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"I would reject the budget. We don't need volume, we need variance. I’d use that budget to curate a smaller, higher-entropy dataset that targets the specific classes where the model is currently failing."
