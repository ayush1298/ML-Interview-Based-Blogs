# Markdown Formatting Guide

## What is `changed_files.txt`?

`changed_files.txt` is a **temporary file** created during the formatting workflow run. It contains a simple list of markdown file paths that need to be formatted.

### What it contains:
- Just file paths (one per line)
- Example:
  ```
  ./LLM/Attention/Why do we divide by √dₖ instead of √d? .md
  ./Neural Network/Weight initialization techniques in NN.md
  ./README.md
  ```

### What it does NOT contain:
- ❌ The actual formatting changes
- ❌ Before/after comparisons
- ❌ Diff information

## Where to See Actual Formatting Changes

The formatting changes are made **directly to your markdown files**. Here's where you can see them:

### 1. **Git Commit (Best Option)**
When the workflow commits formatting changes, you can see the diff:

```bash
# View the commit
git log --oneline -1

# See what changed
git show HEAD

# See diff for specific file
git diff HEAD~1 HEAD -- path/to/file.md
```

### 2. **GitHub Actions Logs**
In the workflow run, the "Check for changes" step shows:
- `git diff --stat` - Summary of changed files
- Which files were formatted

### 3. **GitHub Commit View**
1. Go to your repository on GitHub
2. Click on the commit "Format markdown files [skip ci]"
3. See the full diff with before/after

### 4. **Local Git Diff**
If you want to see changes locally:
```bash
# Compare with previous commit
git diff HEAD~1 HEAD

# See changes for a specific file
git diff HEAD~1 HEAD -- "LLM/Attention/Why do we divide by √dₖ instead of √d? .md"
```

## What Formatting Changes Are Made?

The `mdformat` tool fixes:
- ✅ Irregular spacing (extra blank lines)
- ✅ Inconsistent line breaks
- ✅ Table formatting
- ✅ List formatting
- ✅ Code block formatting

## Important Notes

- `changed_files.txt` is **temporary** - it's deleted after the workflow runs
- It's now in `.gitignore` so it won't be committed
- The actual changes are in your markdown files, not in this text file
- You can see all changes in the git commit diff
