2 months ago • Edited • Visible to anyone on or off LinkedIn

🔥 You're in a ML Engineer interview at Microsoft, and the interviewer asks:
"Your team manages enterprise LLM infrastructure for 15 engineering teams. You are getting frequent of budget overshoot and inefficient request throttling, How can you build a production-grade multi-tenant LLM platform ? "

🚨 𝗧𝗵𝗲 𝗥𝗲𝗮𝗹 𝗣𝗿𝗼𝗯𝗹𝗲𝗺
Shared LLM infrastructure without governance = chaos: 
💸 No cost visibility → Can't bill teams accurately
⚡ Token free-for-all → Critical apps throttled
🎯 Model sprawl → GPT-4o for everything (even logs)
📊 Zero accountability → Teams overconsume freely

🏗️ 𝗧𝗵𝗲 𝟰-𝗟𝗮𝘆𝗲𝗿 𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗦𝘁𝗮𝗰𝗸
𝟮️⃣ 𝗥𝗮𝘁𝗲 𝗟𝗶𝗺𝗶𝘁𝗶𝗻𝗴: Token Quotas That Actually Work
In LLM systems, not all requests have equal impact—a short prompt to a small model uses minimal resources while long queries to large models consume significant GPU time, requiring rate limits across multiple dimensions beyond just request count.

Multi-dimensional limits:

team_alpha:
 tokens_per_minute: 50K
 requests_per_second: 100
 concurrent_requests: 10
 monthly_quota: 10M tokens
Organizations configure limits tailored by function—for instance, a healthcare system may allow higher throughput for clinical documentation during peak hours. 

𝟮️⃣ 𝗖𝗵𝗮𝗿𝗴𝗲𝗯𝗮𝗰𝗸: Token-Level Cost Attribution
Platform teams implement chargeback by tagging every LLM request with metadata like customer_id, business_unit, or feature_name, enabling precise cost attribution across teams, features, and customers.

Production pattern:

llm_gateway.generate(
 prompt=query,
 metadata={
 "team_id": "data-science",
 "project": "recommender-v2",
 "cost_center": "CC-8472"
 }
)
Track metrics including tokens per request to normalize usage patterns, cost per user/team/feature for showback reporting, cache hit ratio to reveal spend savings, and requests routed to expensive models to shift non-essential traffic.


𝟯️⃣ 𝗠𝗼𝗱𝗲𝗹 𝗔𝗰𝗰𝗲𝘀𝘀 𝗖𝗼𝗻𝘁𝗿𝗼𝗹: Tier-Based Availability
Consider multi-tenant model access when there's no PII, cost efficiency is a priority, no stringent SLAs exist, and rate-limiting mechanisms are required for different tenants.

Deployment tiers:

Shared pool: GPT-3.5, Claude Haiku (all teams)
Premium tier: GPT-4o (approved teams, separate quota)
Experimental: o3-mini (ML team only, isolated budget)

𝟰️⃣ 𝗢𝗯𝘀𝗲𝗿𝘃𝗮𝗯𝗶𝗹𝗶𝘁𝘆: Real-Time Usage Monitoring
Route all inference traffic through an observability-enabled gateway that captures comprehensive data including token usage, request latency, model selection, and cost attribution with metadata tags.

Alert thresholds:

Team approaching 80% monthly quota
Token consumption spike >3σ from baseline
429 throttling errors per team/model
Cost anomaly (team suddenly using premium models)

💬 The Interview Answer (30 seconds)
We deploy an LLM gateway with four governance layers:
📌 Rate limiting
📌 Chargeback
📌 Model Access Control
📌 Observability
