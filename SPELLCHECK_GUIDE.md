# Spellcheck Guide

## Overview

This repository uses automated spellchecking for both markdown file contents and filenames. The system is designed to catch real typos while ignoring valid ML/technical terms.

## How It Works

### 1. **Filename Spellchecking**
- Uses `pyspellchecker` with a comprehensive English dictionary (~100k words)
- Automatically recognizes common ML/technical terms
- Only flags words that have close spelling suggestions (indicating real typos)
- Ignores contractions that get split incorrectly (like "didn't" → "didn")

### 2. **Content Spellchecking**
- Uses GitHub Spellcheck Action with PySpelling
- Checks markdown file contents
- Ignores code blocks, inline code, and math expressions
- Uses custom wordlist for technical terms

## Maintaining the Wordlist

The `.wordlist.txt` file contains technical terms that aren't in standard dictionaries. You should add terms here when:

1. **New ML/DL acronyms** (e.g., new model names, techniques)
2. **Domain-specific terms** (e.g., company names, product names)
3. **Technical compound words** (e.g., "pretrained", "finetuning")

### How to Add Terms

Simply edit `.wordlist.txt` and add one term per line (case-insensitive):

```
# New ML Terms
NewModelName
newtechnique
```

## Common ML Terms Already Included

The system automatically recognizes these common terms:

- **Acronyms**: LLM, CNN, RNN, LSTM, BERT, GPT, RAG, VLM, SGD, BPE, MHA, GQA, QAT, MPT, SFT, GRPO, ELO, MCP, GPU, etc.
- **Technical Terms**: softmax, covariate, overfitting, dataset, logit, resnet, imagenet, cifar, vggnet, etc.
- **Compound Words**: readme, chatbot, workflow, agentic, underperform, searchable, etc.

## What Gets Flagged

The checker will flag:
- ✅ **Real typos** with close suggestions (e.g., "intialization" → "initialization")
- ✅ **Misspellings** in filenames and content

The checker will NOT flag:
- ✅ Valid English words
- ✅ Terms in `.wordlist.txt`
- ✅ Common ML/technical acronyms
- ✅ Contractions that get split (like "didn't" → "didn")

## Examples

### ✅ Will Pass (Valid)
- `Sequence packing instead of zero-padding for variable length prompts.md`
- `How to use Transformer models.md`
- `SGD vs Adam optimization.md`

### ⚠️ Will Flag (Typos)
- `Weight intialization techniques.md` → suggests "initialization"
- `class imabalance in computer vision.md` → suggests "imbalance"
- `Why tranformers win.md` → suggests "transformers"

## Future-Proofing

As new ML terms emerge:

1. **Add to `.wordlist.txt`** - For terms that should always be accepted
2. **The checker is smart** - It uses a real dictionary, so common English words are automatically recognized
3. **Only add technical terms** - You don't need to add every English word, just ML-specific terms

## Workflow

The spellcheck runs automatically on:
- Every push to `main`
- Every pull request
- Manual trigger via GitHub Actions

If errors are found, the workflow will fail and show you exactly which words need attention.
