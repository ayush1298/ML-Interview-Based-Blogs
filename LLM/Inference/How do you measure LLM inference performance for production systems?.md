You're in a ML Engineer interview at Microsoft, and the interviewer asks: 

"How do you measure LLM inference performance? What metrics matter most for production systems?" 

Here's how you can answer:

A. Most candidates fumble here because they only know "tokens per second" or TPS. 

Incomplete answer. 

B. There are 4 critical metrics every ML engineer should understand cold.

1. Time to First Token (TTFT) - 

The make-or-break metric.
This is how long users wait before seeing ANY response. 
Gemini? <300ms. 
GPT-4o? ~200ms. 

Your prototype? Probably 2+ seconds.

2. Time Per Output Token (TPOT) - The streaming experience 

Did you ever notice why ChatGPT feels smooth while some AI tools feel choppy? 
TPOT.

Target: ~4 tokens/second (human reading speed). 
Below 2 tokens/sec feels sluggish. 
Above 8 is overkill for most users.

3. Token Generation Time - The streaming duration 

Time between receiving the first and final token. 
This measures how long the model takes to stream out the full response.
Critical for long-form content where users need to see the complete answer.

4. Total Latency (E2EL) - The complete user experience 

Time from sending request to receiving the final token. Here's the key formula:
Total Latency = TTFT + Token Generation Time
Fast TTFT + slow generation = still poor UX!


C. 
Now the interviewer may ask another question: 

"What's the difference between P50 and P99 latency?" 

P50 (median): What half your users experience 
P99: What your WORST 1% experience
P50 TTFT = 100ms? Great! 
P99 TTFT = 10 seconds? Your service is unreliable.

D. Requests Per Second (RPS) vs Tokens Per Second (TPS) 

RPS = How many conversations you handle 
TPS = How many tokens you generate

A system with high RPS but low TPS means you're handling lots of short, simple requests. 

Not impressive for LLM serving.

E. 

The metric that separates junior from senior engineers: Goodput 
Not just "how fast" but "how fast while meeting SLAs"

If your system does 1000 TPS but 20% of requests timeout, your goodput is only 800 TPS.
Production systems care about goodput, not raw throughput.

F. 

The brutal tradeoff every ML engineer faces 

- High throughput = Large batches, shared compute, slower per-user responses 
- Low latency = Small batches, dedicated compute, lower overall throughput

You CANNOT optimize for both. Pick your poison based on use case.

G. 

Know your use case targets 

- Chatbots: TTFT <200ms, E2EL <2s
- Code completion: TTFT <100ms (developers are impatient)
- Deep Research - TTFT can be low
- Document processing: Optimize total throughput

Real-time apps: Balance all metrics carefully

H. 
"Our benchmark shows 1000 TPS!"

Interviewer: "Input or output TPS? What batch size? P99 or mean? Concurrent users?"

Vague metrics = failed interview.
