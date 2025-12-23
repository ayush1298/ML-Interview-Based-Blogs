You're in a Senior Machine Learning Interview at Google DeepMind. The interviewer sets a trap. They hand you a dataset with 15% missing values in the "Age" column and ask a simple question:

"How do you handle these missing values before we start training?"

90% of candidates walk right into the trap.

The candidate immediately grabs the whiteboard marker.

"Easy. I'll calculate the median of the 'Age' column to handle outliers, then fill the empty cells with that value."

They might even write the Pandas equivalent:
 𝘥𝘧['𝘢𝘨𝘦'] = 𝘥𝘧['𝘢𝘨𝘦'].𝘧𝘪𝘭𝘭𝘯𝘢(𝘥𝘧['𝘢𝘨𝘦'].𝘮𝘦𝘥𝘪𝘢𝘯())

The interviewer nods, smiles, and ends the interview 5 minutes later. They didn't get the job.

Why did they fail? Because they treated data cleaning as a generic "pre-processing" step. By calculating the median on the entire dataset (before splitting), they effectively "snooped" on the test set. Their model learned a distribution that includes data it shouldn't see until inference.

In the real world, they don't have access to tomorrow's data to calculate today's median.

-----
𝐓𝐡𝐞 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧: To pass this bar, you need to treat your pipeline like a time machine. You must protect the "future" (test set) from the "past" (training set).

The engineering reality:
- 𝐒𝐩𝐥𝐢𝐭 𝐅𝐢𝐫𝐬𝐭: Divide your data into Train and Test immediately.
- 𝐅𝐢𝐭 𝐨𝐧 𝐓𝐫𝐚𝐢𝐧: Calculate your statistics (mean, median, std dev) only using the training set.
- 𝐓𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦 𝐁𝐨𝐭𝐡: Apply those specific training values to fill gaps in both the Train AND the Test set.

If your training median is 34 and your test median is 41, you fill the test set holes with 34.

𝐓𝐡𝐞 𝐀𝐧𝐬𝐰𝐞𝐫 𝐓𝐡𝐚𝐭 𝐆𝐞𝐭𝐬 𝐘𝐨𝐮 𝐇𝐢𝐫𝐞𝐝:
"I never calculate global statistics. I fit my imputers on the training set and apply that transformation to the test set to prevent data leakage. My pipeline must emulate the blindness of production."
