# Spellcheck Guide

## Overview

This repository uses automated spellchecking for markdown files and filenames. The system catches real typos while ignoring valid ML/technical terms. **Spellcheck failures do NOT block deployment** - they're warnings only.

## How It Works

### Filename Spellchecking
- Uses `pyspellchecker` with English dictionary (~100k words)
- Recognizes common ML/technical terms automatically
- Only flags words with close spelling suggestions (real typos)
- Ignores contractions split incorrectly (e.g., "didn't" → "didn")

### Content Spellchecking
- Uses GitHub Spellcheck Action with PySpelling
- Checks markdown file contents
- Ignores code blocks, inline code, and math expressions
- Uses custom wordlist for technical terms

## Deployment Impact

**✅ Spellcheck does NOT affect:**
- GitHub Pages deployment
- Catalog generation
- Adding new markdown files
- Website updates

The workflow uses `continue-on-error: true`, so failures show as **warnings** (yellow icon) not errors (red icon).

## Handling False Positives

If spellcheck flags a word that's actually correct:

### Add to Wordlist (Recommended)
Edit `.wordlist.txt` and add the term (one per line, lowercase):
```
# New ML Terms
yourflaggedword
newtechnique
```

### Ignore the Warning
Since spellcheck doesn't block deployment, you can:
- Review warnings in GitHub Actions
- Add false positives to wordlist when convenient
- Fix real typos

## Maintaining the Wordlist

Add terms to `.wordlist.txt` for:
- **New ML/DL acronyms** (model names, techniques)
- **Domain-specific terms** (company names, products)
- **Technical compound words** (pretrained, finetuning)

**You don't need to add:**
- Common English words (auto-recognized)
- Terms already in the built-in ML terms list

## Common ML Terms Already Included

**Acronyms**: LLM, CNN, RNN, LSTM, BERT, GPT, RAG, VLM, SGD, BPE, MHA, GQA, QAT, MPT, SFT, GRPO, ELO, MCP, GPU, etc.

**Technical Terms**: softmax, covariate, overfitting, dataset, logit, resnet, imagenet, cifar, vggnet, readme, chatbot, workflow, agentic, etc.

## Examples

### ✅ Will Pass (Valid)
- `Sequence packing instead of zero-padding for variable length prompts.md`
- `How to use Transformer models.md`
- `SGD vs Adam optimization.md`

### ⚠️ Will Flag (Typos)
- `Weight intialization techniques.md` → suggests "initialization"
- `class imabalance in computer vision.md` → suggests "imbalance"
- `Why tranformers win.md` → suggests "transformers"

## Quick Reference

**If spellcheck flags a word:**
1. **Real typo?** → Fix the filename/content
2. **Valid technical term?** → Add to `.wordlist.txt`
3. **Want to ignore?** → Leave it (just a warning)

**Check spellcheck status:**
1. Go to GitHub repository → Actions tab
2. Find "Spellcheck" workflow run
3. Review warnings in logs

## Best Practices

1. **Review warnings regularly** - Catch real typos early
2. **Add technical terms proactively** - When adding new ML terms, add them to wordlist
3. **Fix real typos** - If it's a genuine spelling mistake, fix it
4. **Don't worry about false positives** - They're warnings, not blockers

## Troubleshooting

If spellcheck keeps flagging a word that's definitely correct:

1. Check if it's in `.wordlist.txt` (case-insensitive)
2. Check if it's a common English word (should be auto-recognized)
3. Check if it's in the built-in ML terms list
4. If none of the above, add it to `.wordlist.txt`
