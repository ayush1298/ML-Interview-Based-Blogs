You're in an ML Engineer interview at DoorDash. The interviewer sets a trap:

"Product wants to maximize 𝘜𝘴𝘦𝘳 𝘊𝘭𝘪𝘤𝘬𝘴. Sales wants to maximize 𝘏𝘪𝘨𝘩-𝘊𝘰𝘮𝘮𝘪𝘴𝘴𝘪𝘰𝘯 𝘖𝘳𝘥𝘦𝘳𝘴. How do you design the 𝘓𝘰𝘴𝘴 𝘍𝘶𝘯𝘤𝘵𝘪𝘰𝘯 to balance these conflicting goals?"

90% of candidates walk right into the trap. They pick up the marker and start writing a custom Loss Function.

They just failed the interview.

Here is why that approach breaks in production, and the architecture that actually gets you hired.

The intuition is to solve the business problem inside the neural network. The candidate proposes a joint loss function:

𝐋𝐨𝐬𝐬 = α * 𝐋𝐨𝐠𝐋𝐨𝐬𝐬(𝐂𝐥𝐢𝐜𝐤) + β * 𝐌𝐒𝐄(𝐏𝐫𝐨𝐟𝐢𝐭)

They spend 20 minutes explaining how to tune hyperparameter α to find the perfect "𝘴𝘸𝘦𝘦𝘵 𝘴𝘱𝘰𝘵" between user happiness and revenue.

It looks 𝘮𝘢𝘵𝘩𝘦𝘮𝘢𝘵𝘪𝘤𝘢𝘭𝘭𝘺 elegant. It is 𝘰𝘱𝘦𝘳𝘢𝘵𝘪𝘰𝘯𝘢𝘭𝘭𝘺 disastrous.

The moment you hard-code that trade-off into the model weights, you have coupled your engineering infrastructure to quarterly business OKRs.

If the VP of Sales calls you on 𝐁𝐥𝐚𝐜𝐤 𝐅𝐫𝐢𝐝𝐚𝐲 and says, "We need to boost margins by 10% for the next 6 hours," you are helpless.

To change the balance, you have to:
- Retrain the model with new alpha/beta weights.
- Re-validate the offline metrics.
- Canary deploy the new model.

That is a 3-day pipeline for a 3-hour business requirement.

The Solution: 𝐓𝐡𝐞 𝐃𝐞𝐜𝐨𝐮𝐩𝐥𝐞𝐝 𝐎𝐛𝐣𝐞𝐜𝐭𝐢𝐯𝐞 𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥

The Senior Engineer knows that "𝐑𝐞𝐥𝐞𝐯𝐚𝐧𝐜𝐞" is a physics problem (what the user wants), but "𝐏𝐫𝐢𝐨𝐫𝐢𝐭𝐲" is a business problem (what the company wants).
You do not bake business logic into model weights. You solve this at the 𝐒𝐞𝐫𝐯𝐢𝐧𝐠 𝐋𝐚𝐲𝐞𝐫.

- 𝘔𝘰𝘥𝘦𝘭 𝘈 (𝘛𝘩𝘦 𝘉𝘳𝘢𝘪𝘯): Trains purely on P(Click) or P(Conversion). It knows nothing about money.
- 𝘛𝘩𝘦 𝘚𝘪𝘨𝘯𝘢𝘭 (𝘛𝘩𝘦 𝘊𝘰𝘯𝘵𝘦𝘹𝘵): You fetch the Commission_Rate from your feature store.
- 𝘛𝘩𝘦 𝘍𝘶𝘴𝘪𝘰𝘯: You combine them strictly at the final ranking stage using a lightweight algebraic formula:
𝐅𝐢𝐧𝐚𝐥_𝐒𝐜𝐨𝐫𝐞 = (𝐰1 * 𝐌𝐨𝐝𝐞𝐥_𝐏𝐫𝐞𝐝𝐢𝐜𝐭𝐢𝐨𝐧) + (𝐰2 * 𝐂𝐨𝐦𝐦𝐢𝐬𝐬𝐢𝐨𝐧_𝐍𝐨𝐫𝐦𝐚𝐥𝐢𝐳𝐞𝐝)

Now, when business priorities shift, you don't retrain a neural network. You update a single config file in your serving infrastructure: 
w2: 0.2 -> 0.4

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"We don't use ML to learn the trade-off. We use ML to learn the probabilities, and we define the trade-off dynamically at runtime."
