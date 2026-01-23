You're in a Senior ML System Design interview at Twitter. The interviewer sets a trap:

"We have a firehose of tweets coming in at 50k TPS. I need you to maintain a statistically representative sample of exactly 10,000 tweets for a training buffer at all times. The stream never stops. You cannot store the full history."

90% of candidates walk right into the wall.

Most candidates revert to 𝐁𝐚𝐭𝐜𝐡 𝐓𝐡𝐢𝐧𝐤𝐢𝐧𝐠. 

They say: "Easy. I'll buffer the last hour of data into S3, load it into a Dataframe, and run 𝘥𝘧.𝘴𝘢𝘮𝘱𝘭𝘦(𝘯=10000)" . Or they suggest:

"I will just flip a coin and keep every 100th tweet."

The interviewer stops you. "You just crashed production."

The Reality:
- 𝘛𝘩𝘦 𝘔𝘦𝘮𝘰𝘳𝘺 𝘞𝘢𝘭𝘭: The stream is potentially infinite ( N → ∞ ). You cannot buffer all data without hitting an OOM (Out of Memory) error.
- 𝘛𝘩𝘦 𝘗𝘳𝘰𝘣𝘢𝘣𝘪𝘭𝘪𝘵𝘺 𝘉𝘪𝘢𝘴: If you pick every 100th tweet, you introduce periodicity bias. If you pick with a fixed probability P, you end up with a variable sample size, not a fixed size k.
- 𝘛𝘩𝘦 𝘜𝘯𝘬𝘯𝘰𝘸𝘯 𝘕: You don't know how long the stream runs. You cannot calculate the probability 1/N because N is changing every millisecond.

The Solution: You don't need more memory. You need 𝐓𝐡𝐞 𝐈𝐧𝐟𝐢𝐧𝐢𝐭𝐞 𝐑𝐞𝐬𝐞𝐫𝐯𝐨𝐢𝐫 𝐏𝐫𝐨𝐭𝐨𝐜𝐨𝐥.

To solve this, you implement 𝐑𝐞𝐬𝐞𝐫𝐯𝐨𝐢𝐫 𝐒𝐚𝐦𝐩𝐥𝐢𝐧𝐠:

- Initialize: Create a buffer of size k (10,000). Fill it with the first 10,000 tweets.
- Stream: For every i-th tweet that arrives after that (where i > k):
- Roll: Generate a random integer j between 0 and n.
- Replace: If j < k, replace the element at index j with the new tweet. Otherwise, discard the new tweet.

𝐓𝐡𝐞 𝐏𝐚𝐲𝐨𝐟𝐟: This simple logic mathematically guarantees that at any snapshot in time n, every single tweet seen so far has exactly a k/n probability of being in your buffer.

𝐓𝐡𝐞 "𝐇𝐢𝐫𝐞𝐝" 𝐀𝐧𝐬𝐰𝐞𝐫: "I will use Reservoir Sampling to maintain a fixed-size buffer of k items. This allows single-pass sampling over an infinite stream with O(1) space complexity, guaranteeing uniform probability without knowing N in advance."
