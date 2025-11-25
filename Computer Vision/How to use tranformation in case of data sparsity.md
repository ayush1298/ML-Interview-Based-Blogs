You have 2000 labeled samples of user mouse movements. You need to ship a bot detector by Friday.

The interviewer asks: "What architecture do you choose?"

If you answer "LSTM," "GRU," or "Transformer," you likely just failed the System Design round.

Here is why 90% of candidates walk into this trap.
-------
The candidate looks at the data schema: [timestamp, x_coord, y_coord].
Their brain immediately pattern-matches:
- "This is sequential data."
- "Therefore, I need a Sequence Model."

They start whiteboarding a Bi-Directional LSTM or discussing how to tokenize coordinates for a Transformer. They waste 20 minutes discussing vanishing gradients or attention heads.

The Reality:
With only 2,000 samples, a complex sequence model will strictly memorize noise. You are bringing a Data Center architecture to a spreadsheet-sized problem. You will overfit before the first epoch finishes.

-------
The Senior Engineer doesn't ask: "Which model fits this data type?". 

They ask: "Which representation allows me to use existing knowledge?"

They reframe the problem entirely.

1. The Transformation: Discard the time dimension. Plot the (x, y) coordinates on a 2D white canvas. Connect the dots.
- Bots: Perfect straight lines, sharp 90-degree turns, mathematical curves.
- Humans: Micro-jitters, overshooting, curved arcs, "entropy."

2. The Architecture Shift: Now that you have an image, it is no longer a Time-Series problem. It is a Computer Vision problem.

3. The Leverage: Instead of training an LSTM from scratch (impossible with 2k samples), you grab a ResNet-18 or MobileNet pre-trained on ImageNet.

You freeze the backbone and fine-tune the final dense layer. Because the model already understands "edges," "curves," and "shapes" from millions of ImageNet photos, it can distinguish a "Bot Shape" from a "Human Shape" with 99% accuracy using only a handful of examples.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝

"I have a data scarcity problem, not a modeling problem. I would render the temporal sequences as static images (The Splunk Approach). This allows me to leverage Transfer Learning from pre-trained CNNs, solving the low-data constraint while capturing the geometric nuances of bot behavior that sequence models miss."
