You're debugging why your LLM service keeps losing customers to competitors, and your CTO asks:

"We're processing 10,000 requests per second. Why are users still complaining about slow responses?"

You are a senior ML engineer, you are tasked to solve this !

Production LLM systems live or die by 6 metrics most people ignore.

1. 𝗧𝗧𝗙𝗧: The "blink test" your users judge you by

Time to First Token is the silence before your model speaks.

The psychological reality:

 -> 100ms = feels instant (Google Search standard)
 -> 300ms = acceptable for chat
 -> 1 second = users start questioning if it's working
 -> 2+ seconds = users hit refresh or leave

Here's what shocked me: A medical AI chatbot had 5000 TPS but 3-second TTFT. Know what happened?

Doctors abandoned it mid-conversation. High throughput meant nothing when the experience felt broken.

The counterintuitive part: Document summarization can tolerate 2-3 second TTFT. Users expect processing time for complex tasks.

Same metric. Different SLOs. Know your context.

 2. 𝗧𝗶𝗺𝗲 𝗽𝗲𝗿 𝗢𝘂𝘁𝗽𝘂𝘁 𝗧𝗼𝗸𝗲𝗻 (𝗧𝗣𝗢𝗧): The average time gap between generating each subsequent token (excluding TTFT). A lower TPOT means the model can produce tokens faster, leading to higher tokens per second. 

Time Per Output Token = the rhythm of your streaming response.

Think of it as the heartbeat of your AI.

Human reading speed: ~4 words/second = ~5 tokens/second

Your TPOT sweet spot: 3-5 tokens/sec

Too fast (10+ tokens/sec)? Wasted compute. Users can't read that fast anyway.

Too slow (1-2 tokens/sec)? Feels choppy. Users wonder if their internet is broken.

Real story: An AI coding assistant generated 15 tokens/sec. Engineers requested they SLOW IT DOWN to 6 tokens/sec so they could review code as it appeared.

More isn't always better. Match human cognition speed.

3. 𝗣𝟱𝟬 𝘃𝘀 𝗣𝟵𝟱 𝘃𝘀 𝗣𝟵𝟵: Where systems reveal their true character

Your monitoring shows:

P50 TTFT: 150ms (Looks amazing!)
P95 TTFT: 400ms (Still acceptable)
P99 TTFT: 8 seconds (🚨 DISASTER 🚨)

What this means:

50% of users: Great experience
45% of users: Acceptable experience
5% of users: Absolutely terrible experience

Here's the brutal math: If you serve 1 million users/day, 50,000 people have a terrible experience.

How many bad reviews does it take to tank your app rating?

About 100.

The optimization trap: Most teams optimize for P50 because it makes dashboards look good.

Winners optimize for P99 because that's what determines reputation.

4. 𝗦𝗮𝘁𝘂𝗿𝗮𝘁𝗶𝗼𝗻: The performance cliff nobody sees coming

Here's how most teams scale:

Concurrent users: 10 → TPS: 5,000 → "Great!" Concurrent users: 50 → TPS: 25,000 → "Amazing!" Concurrent users: 100 → TPS: 35,000 → "Wait, what?" Concurrent users: 200 → TPS: 30,000 → "Why is it going DOWN?"

5. 𝗚𝗼𝗼𝗱𝗽𝘂𝘁: Goodput refines the idea of throughput. It measures how many requests per second the LLM successfully completes while meeting your defined service-level objectives (SLOs). 

Your dashboard shows 2000 TPS. Your SRE team is celebrating.

Your SLO says: "P95 latency must be under 500ms."

Actual P95 latency: 2.3 seconds.

Your real throughput (goodput): ZERO.

Because none of those requests met the SLA. You're processing tokens but failing users.

Goodput = Throughput × (% meeting SLO)

Real scenario I witnessed:

Advertised: "5000 TPS inference service!"

Reality: 40% of requests timeout

Actual goodput: 3000 TPS

Customer perception: "This service is unreliable"

Production lesson: High throughput with low goodput is worse than moderate throughput with high goodput.

Reliability beats raw speed.

6. 𝗜𝗻𝘁𝗲𝗿-𝗧𝗼𝗸𝗲𝗻 𝗟𝗮𝘁𝗲𝗻𝗰𝘆 (𝗜𝗧𝗟): The metric that reveals your system's true character. The exact pause between two consecutive tokens. Average ITL is token-weighted, so longer responses (which contribute more total tokens) carry more weight. It's better for measuring overall system throughput and steady-state performance (e.g., aggregate streaming speed).

Here's where most people confuse ITL with TPOT. They're related but measure different things.

ITL = The exact pause between two consecutive tokens appearing

Think of it as the "stutter test" for your streaming response.

The subtle difference that matters:

TPOT averages all tokens equally. Generate 10 tokens? Each counts the same.

ITL is token-weighted. A 1000-token response influences the average 100x more than a 10-token response.

The point where adding load decreases performance.

What's happening under the hood:

🚨GPU memory bandwidth: Maxed out
🚨KV cache: Full, thrashing between requests
🚨Batch scheduler: Making suboptimal decisions
🚨Memory allocation: Fragmented, causing stalls

The warning signs nobody notices:

🍿TPS growth slows before it drops
🍿P95/P99 latency spikes while P50 stays fine
🍿GPU utilization hits 100% but TPS doesn't increase
🍿Memory usage oscillates wildly

The senior engineer move: Load test to find YOUR saturation point BEFORE launch.
