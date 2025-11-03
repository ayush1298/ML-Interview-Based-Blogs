You're in a ML Engineer interview at Citi, and the interviewer asks:
"We're building a production credit risk model. Should we use Bagging or Boosting? Justify your choice."

Here's how you can answer:
A. Most candidates fumble here because they only know "Bagging reduces variance, Boosting reduces bias." Incomplete answer.
B. There are 5 critical factors every ML engineer should understand cold.

𝟭. 𝗧𝗵𝗲 𝗕𝗶𝗮𝘀-𝗩𝗮𝗿𝗶𝗮𝗻𝗰𝗲 𝗧𝗿𝗮𝗱𝗲𝗼𝗳𝗳 - 𝗧𝗵𝗲 𝗳𝘂𝗻𝗱𝗮𝗺𝗲𝗻𝘁𝗮𝗹 𝗱𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝗰𝗲
Bagging (Bootstrap Aggregating) builds INDEPENDENT models in parallel:

Each model trained on random subset with replacement
Final prediction = average/vote across models
Reduces variance WITHOUT increasing bias

Boosting builds SEQUENTIAL models that correct predecessors:

Each model focuses on previous mistakes
Final prediction = weighted combination
Reduces BOTH bias AND variance (but can overfit)

The brutal truth? Boosting outperforms when your base model underfits. Bagging wins when overfitting is your enemy.

𝟮. 𝗧𝗵𝗲 𝗦𝘁𝗮𝗯𝗶𝗹𝗶𝘁𝘆 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻 - 𝗪𝗵𝗲𝗿𝗲 𝟵𝟬% 𝗼𝗳 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝘀 𝗴𝗼 𝘄𝗿𝗼𝗻𝗴
Most people think "more trees = better performance" for both.
Wrong move.
Bagging (Random Forest): Performance plateaus after 100-500 trees. Adding more barely helps. Why? Models are independent - diminishing returns kick in fast.
Boosting (XGBoost/LightGBM): Performance keeps improving up to 1000+ trees. But here's the catch - you WILL overfit without proper regularization (learning rate, max depth, early stopping).


𝟯. 𝗧𝗵𝗲 𝗢𝘂𝘁𝗹𝗶𝗲𝗿 𝗦𝗲𝗻𝘀𝗶𝘁𝗶𝘃𝗶𝘁𝘆 - 𝗧𝗵𝗲 𝗵𝗶𝗱𝗱𝗲𝗻 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗸𝗶𝗹𝗹𝗲𝗿
Here's what separates junior from senior ML engineers:
Boosting is FRAGILE to outliers and label noise.
Each iteration focuses on hard-to-predict samples. Mislabeled data? Boosting will obsess over it, degrading performance.
Bagging is ROBUST to outliers.


𝟰. 𝗧𝗵𝗲 𝗜𝗻𝘁𝗲𝗿𝗽𝗿𝗲𝘁𝗮𝗯𝗶𝗹𝗶𝘁𝘆 𝗧𝗿𝗮𝗱𝗲 - 𝟱𝘅 𝗰𝗼𝗺𝗽𝗹𝗲𝘅𝗶𝘁𝘆, 𝗯𝘂𝘁 𝘄𝗵𝘆?
Bagging: Each tree is shallow and interpretable. Feature importance = average across all trees. Clean and simple.
Boosting: Each tree corrects previous errors. Feature importance depends on ITERATION ORDER. 

𝟱. 𝗧𝗵𝗲 𝗧𝗿𝗮𝗶𝗻𝗶𝗻𝗴 𝗧𝗶𝗺𝗲 𝗥𝗲𝗮𝗹𝗶𝘁𝘆 - 𝗧𝗵𝗲 𝗰𝗼𝘀𝘁 𝗻𝗼𝗯𝗼𝗱𝘆 𝘁𝗮𝗹𝗸𝘀 𝗮𝗯𝗼𝘂𝘁
Bagging trains in PARALLEL:

100 trees = 100x faster with 100 cores
Perfectly parallelizable

Boosting trains SEQUENTIALLY:

Tree 2 can't start until tree 1 finishes
Limited parallelization (only within each tree)

𝗪𝗵𝗲𝗻 𝗕𝗮𝗴𝗴𝗶𝗻𝗴 𝘄𝗶𝗻𝘀:
✅ High-variance base models (deep trees)
✅ Need interpretability

𝗪𝗵𝗲𝗻 𝗕𝗼𝗼𝘀𝘁𝗶𝗻𝗴 𝘄𝗶𝗻𝘀:
✅ High-bias base models (shallow trees)
✅ Accuracy > interpretability
✅ Have time for hyperparameter tuning
✅ Proper regularization in place
