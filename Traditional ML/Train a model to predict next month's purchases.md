You're in a final round interview for a Machine Learning Engineer role at Walmart. The interviewer sets a trap:

"We have 5 petabytes of transaction history spanning 5 years. Train a model to predict next month's purchases."

90% of candidates walk right into the trap.

They say : "Awesome. More data equals better generalization. I'll ingest the whole 5-year history, feature engineer 𝘙𝘦𝘤𝘦𝘯𝘤𝘺, 𝘍𝘳𝘦𝘲𝘶𝘦𝘯𝘤𝘺, and 𝘔𝘰𝘯𝘦𝘵𝘢𝘳𝘺 𝘷𝘢𝘭𝘶𝘦 (𝘙𝘍𝘔), and train a massive 𝘟𝘎𝘉𝘰𝘰𝘴𝘵 𝘮𝘰𝘥𝘦𝘭."

The interviewer stops writing. They just failed.

Why? Because they assumed the historical logs represent reality. The historical logs don't.

A 5-year transaction log isn't a complete history. It's a list of survivors.

They fell victim to 𝐓𝐡𝐞 𝐒𝐢𝐥𝐞𝐧𝐭 𝐆𝐫𝐚𝐯𝐞𝐲𝐚𝐫𝐝 𝐄𝐟𝐟𝐞𝐜𝐭.

By training only on transaction logs, your dataset systematically excludes every user who got annoyed and churned over the last five years. They stopped transacting, so they vanished from your logs.

Their model is now over-indexing on loyalist behavior and is completely blind to the pre-churn signals of at-risk users. When deployed, it will fail exactly where the business needs it most: retaining wavering customers.

The Senior Engineer knows that "𝘣𝘪𝘨 𝘥𝘢𝘵𝘢" often means  "𝘣𝘪𝘨 𝘣𝘪𝘢𝘴." The fix involves "𝐓𝐢𝐦𝐞-𝐓𝐫𝐚𝐯𝐞𝐥 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐄𝐧𝐠𝐢𝐧𝐞𝐞𝐫𝐢𝐧𝐠":

1️⃣ You don't take the end-state of 5 years.
2️⃣ You take a snapshot at T-minus-2 years.
3️⃣ You identify everyone active then.
4️⃣ You label them based on whether they made a purchase in the following month, regardless of if they exist today.
5️⃣You must force the "failures" back into the training distribution.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:

"Historical logs suffer from severe survivorship bias. To predict future purchasing behavior, we cannot just look at retained users. We must explicitly reconstruct historical states to include the 'ghosts', the users who subsequently churned, otherwise, the model will never learn to spot an exit risk."
