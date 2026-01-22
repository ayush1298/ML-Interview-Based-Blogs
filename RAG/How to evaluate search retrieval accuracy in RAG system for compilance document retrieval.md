You're in a GenAI Engineer interview at Microsoft, and the interviewer asks:
"We're building a RAG system for compliance document retrieval. How do you evaluate search retrieval accuracy?"
Here's how you can answer:
A. Most candidates fumble here because they only know "Precision@K and Recall@K." Incomplete answer.
B. There are 5 critical dimensions every GenAI engineer should understand cold.

𝟭. 𝗧𝗵𝗲 𝗕𝗶𝗻𝗮𝗿𝘆 𝘃𝘀 𝗥𝗮𝗻𝗸𝗲𝗱 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳 - 𝗧𝗵𝗲 𝗳𝘂𝗻𝗱𝗮𝗺𝗲𝗻𝘁𝗮𝗹 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲
Order-unaware metrics treat all retrieved results equally. Order-aware metrics factor in ranking position.

Precision@K and Recall@K (order-unaware):
Precision@K = Relevant docs in top K / K
Recall@K = Relevant docs in top K / Total relevant docs
Retrieval at rank 1 scores the same as rank K

MRR, MAP, NDCG (order-aware):
MRR evaluates how well the system places relevant results at the top
MAP considers all relevant results across the entire ranking
NDCG weighs relevant items appearing earlier more heavily

𝟮. 𝗧𝗵𝗲 𝗥𝗲𝘁𝗿𝗶𝗲𝘃𝗮𝗹-𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗼𝗻 𝗦𝗽𝗹𝗶𝘁 - 𝗪𝗵𝗲𝗿𝗲 𝟵𝟬% 𝗼𝗳 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀 𝗴𝗼 𝘄𝗿𝗼𝗻𝗴
Most people think "RAG evaluation = end-to-end accuracy."
Wrong move.
RAG quality equals the product, not sum, of retriever and generator performance. If either fails, overall quality drops to zero.
Retrieval Stage:
Contextual Precision: Are docs ranked correctly?
Contextual Recall: Does retrieval contain ALL needed info?
Contextual Relevancy: How relevant is context to input?

𝟯. 𝗧𝗵𝗲 𝗚𝗿𝗼𝘂𝗻𝗱 𝗧𝗿𝘂𝘁𝗵 𝗣𝗿𝗼𝗯𝗹𝗲𝗺 - 𝗧𝗵𝗲 𝗵𝗶𝗱𝗱𝗲𝗻 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗸𝗶𝗹𝗹𝗲𝗿
 - Reference-Based Evaluation:
 Requires labeled dataset with correct answers
 - Perfect for offline testing
 Labor-intensive to create and maintain
 - Reference-Free Evaluation:
 Check faithfulness, relevance, tone without ground truth
 - Uses LLM-as-judge for quality scoring
 Essential for production monitoring

𝟰. 𝗧𝗵𝗲 𝗠𝗲𝘁𝗿𝗶𝗰 𝗦𝗲𝗹𝗲𝗰𝘁𝗶𝗼𝗻 𝗧𝗿𝗮𝗽 - 𝟱𝘅 𝗰𝗼𝗺𝗽𝗹𝗲𝘅𝗶𝘁𝘆, 𝗯𝘂𝘁 𝘄𝗵𝘆?
 - Precision@K: Minimizing irrelevant results
 - Recall@K: Completeness is critical
 - MRR: First result matters most
 - MAP: Multiple relevant results across ranking.
 - NDCG: Graded relevance. 

𝟱. 𝗧𝗵𝗲 𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗥𝗲𝗮𝗹𝗶𝘁𝘆 - 𝗧𝗵𝗲 𝗰𝗼𝘀𝘁 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
 - Offline: Fixed datasets with ground truth. Run before deployment. 
 - Online Monitoring: Track answer relevancy, faithfulness scores, retrieval latency, error rates, user feedback. . 

𝗪𝗵𝗲𝗻 𝗣𝗿𝗲𝗰𝗶𝘀𝗶𝗼𝗻@𝗞 𝘄𝗶𝗻𝘀: 
✅ Single correct answer expected 
✅ Minimizing false positives critical 
✅ User reviews only top-1 result

𝗪𝗵𝗲𝗻 𝗡𝗗𝗖𝗚 𝘄𝗶𝗻𝘀: 
✅ Multiple relevant results needed 
✅ Ranking quality matters 
✅ Graded relevance (0-5 scale) 

𝗪𝗵𝗲𝗻 𝗙𝗮𝗶𝘁𝗵𝗳𝘂𝗹𝗻𝗲𝘀𝘀 𝘄𝗶𝗻𝘀: 
✅ Hallucination risk high 
✅ Production deployment 
✅ No ground truth available

