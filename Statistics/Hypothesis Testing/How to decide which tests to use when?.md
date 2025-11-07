Excellent — this is **the heart of hypothesis testing** 👏

Choosing *which test* to use depends on a few clear factors:
→ **Type of data**,
→ **What you’re comparing**, and
→ **What you know about the population (mean, variance, etc.)**

Let’s go step-by-step in an intuitive way.

---

## 🎯 Step 1: Identify Your Goal

| Type of Question                         | Typical Hypothesis Test                                       |
| ---------------------------------------- | ------------------------------------------------------------- |
| Compare **means**                        | t-test or z-test                                              |
| Compare **proportions**                  | z-test for proportions                                        |
| Compare **more than two means**          | ANOVA (Analysis of Variance)                                  |
| Compare **distributions / independence** | Chi-square test                                               |
| Check **relationship / correlation**     | Correlation or regression test (t-test for slope)             |
| Compare **medians / non-normal data**    | Non-parametric tests (Mann–Whitney, Wilcoxon, Kruskal–Wallis) |

---

## ⚙️ Step 2: Key Decision Factors

There are **4 major decision criteria**:

| Factor                             | Why It Matters                             | Options                                                |
| ---------------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| 1️⃣ **Number of samples**          | Determines type of test                    | One-sample, Two-sample, or Paired                      |
| 2️⃣ **Type of variable**           | Different tests for numeric vs categorical | Numerical (mean) or Categorical (proportion/frequency) |
| 3️⃣ **Population variance known?** | Affects choice between z-test and t-test   | Known → z-test, Unknown → t-test                       |
| 4️⃣ **Distribution shape**         | Some tests assume normality                | Normal → parametric tests; Non-normal → non-parametric |

---

## 🧮 Step 3: Quick Decision Table

### 📏 A. When you’re testing **means** (numerical data)

| Scenario                                      | Test                              | Notes                           |
| --------------------------------------------- | --------------------------------- | ------------------------------- |
| 1 sample, variance **known**                  | **One-sample z-test**             | Rare; use when σ known          |
| 1 sample, variance **unknown**                | **One-sample t-test**             | Common                          |
| 2 **independent** samples, equal variances    | **Independent two-sample t-test** | (Student’s t-test)              |
| 2 **independent** samples, unequal variances  | **Welch’s t-test**                | Safer when variances differ     |
| 2 **paired / matched** samples (before–after) | **Paired t-test**                 | Same subjects, two measurements |
| ≥3 samples                                    | **ANOVA**                         | Generalization of t-test        |

---

### 📊 B. When you’re testing **proportions** (categorical data)

| Scenario                           | Test                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| 1 sample proportion vs known value | One-sample **z-test for proportion**                    |
| 2 sample proportions               | Two-sample **z-test for proportions**                   |
| More than 2 categories             | **Chi-square test** for goodness of fit or independence |

---

### 🧩 C. When checking **relationships**

| Scenario                                            | Test                                 | Notes |
| --------------------------------------------------- | ------------------------------------ | ----- |
| Linear relationship between two numerical variables | **Correlation test (Pearson’s r)**   |       |
| Regression slope significance                       | **t-test on regression coefficient** |       |
| Association between two categorical variables       | **Chi-square test for independence** |       |
| Non-linear / rank-based relationship                | **Spearman’s rank correlation**      |       |

---

### 🧭 D. For **non-normal data** or **small samples**

If your data is not normally distributed (or sample size < 30 and you can’t assume normality):

| Parametric Equivalent | Non-parametric Alternative        |
| --------------------- | --------------------------------- |
| One-sample t-test     | **Wilcoxon signed-rank test**     |
| Two-sample t-test     | **Mann–Whitney U test**           |
| Paired t-test         | **Wilcoxon signed-rank (paired)** |
| ANOVA                 | **Kruskal–Wallis test**           |

---

## 🧠 Step 4: Flowchart Summary

```
1. What’s my variable type?
   ├── Numeric → Go to (2)
   └── Categorical → Go to (4)

2. How many samples?
   ├── 1 → One-sample t or z
   ├── 2 independent → Two-sample t (or Welch)
   ├── 2 paired → Paired t
   └── ≥3 → ANOVA

3. Is normality violated?
   └── Use non-parametric equivalent

4. Categorical data:
   ├── 1 sample → Chi-square Goodness of Fit
   ├── 2 samples → z-test for proportions
   └── >2 variables → Chi-square Independence
```

---

## 💡 Example Scenarios

| Scenario                                                  | Correct Test                             |
| --------------------------------------------------------- | ---------------------------------------- |
| You measure average height of boys vs girls               | Two-sample t-test                        |
| You test if a coin is fair                                | Chi-square Goodness of Fit               |
| Before/after training test scores (same students)         | Paired t-test                            |
| You want to compare mean sales across 3 stores            | ANOVA                                    |
| You check if gender and job type are related              | Chi-square test for independence         |
| You want to see if weight and height are linearly related | Pearson correlation or regression t-test |

---

Would you like me to give you a **visual decision tree diagram** (like a flowchart image) that helps you instantly pick the right test next time you face a question?
