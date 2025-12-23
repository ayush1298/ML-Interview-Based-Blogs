You're in a ML Engineer interview at Perplexity, and the interviewer asks: 

"Your RAG system is hallucinating in production. How do you diagnose what's broken - the retriever or the generator?" 

Here's how you can answer:

Most candidates say "check accuracy" or "run more tests." 
Wrong approach. 
RAG systems fail at TWO distinct stages, and you need different metrics for each. 
Generic accuracy won't tell you WHERE the problem is.

The fundamental insight: 
RAG quality = Retriever Performance × Generator Performance
If either component scores zero, your entire system fails. It's multiplication, not addition. 
You can't compensate for bad retrieval with a better LLM.

Retrieval Metrics (Did we get the right context?)
1️⃣ Contextual Relevancy: What % of retrieved chunks actually matter? 
2️⃣ Contextual Recall: Did we retrieve ALL the info needed?
3️⃣ Contextual Precision: Are relevant chunks ranked higher than junk?

Generation Metrics (Did the LLM use context correctly?)

1️⃣ Faithfulness: Is the output contradicting the retrieved facts?
2️⃣ Answer Relevancy: Is the response actually answering the question?
3️⃣ Custom metrics: Does it follow your specific format/style requirements?

btw if you want to receive these bites daily, subscribe my newsletter, and you'll have it in your inbox
https://lnkd.in/g8ZJGsWj now back to post -

Here's the diagnostic framework every senior ML engineer knows:

High faithfulness + Low relevancy = Retrieval problem 
Low faithfulness + High relevancy = Generation problem

Both low = Your entire pipeline is broken 
Both high = Look for edge cases

The metric that catches most production issues: Contextual Recall
Your retriever might find "relevant" content but miss critical details. 
Perfect precision, zero recall = confident wrong answers. 
This is why RAG systems confidently hallucinate. 

"Our RAG has 85% accuracy!"
Interviewer: "What's your contextual precision? Faithfulness score? Are you measuring end-to-end or component-level?"
Vague metrics = You don't understand production RAG systems.

The evaluation workflow that separates juniors from seniors:

❌ Junior: Test everything end-to-end, pray it works 
✅ Senior: Component-level metrics + automated CI/CD evaluation + production monitoring

Know your evaluation targets by use case:

Customer support: Faithfulness >0.9 (no wrong info) Research assistant: Contextual recall >0.8 (comprehensive)

Code completion: Answer relevancy >0.9 (stay on topic) Legal docs: All metrics >0.95 (zero tolerance)

The brutal production reality:

Perfect retrieval + weak prompts = hallucinations 
Perfect LLM + bad chunks = irrelevant answers
Good retrieval + good generation + no monitoring = eventual failure
You need metrics at ALL stages.

Pro tip for the interview: 

Mention LLM-as-a-judge evaluation.
