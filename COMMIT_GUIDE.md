# Git Commit Best Practices

## Commit Message Format

Follow the **Conventional Commits** format for consistency:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples:

**Good:**
```
fix(css): correct background image path for GitHub Pages

The background image was not displaying because the CSS path was
relative to the CSS file location. Updated to use absolute path
for GitHub Pages deployment.

Fixes: Background image visibility issue
```

**Better (shorter):**
```
fix(css): use absolute path for background image on GitHub Pages
```

**Your current commits (already good!):**
```
fix: background image path in CSS
fix: background image path with absolute URL for GitHub Pages
```

## Tips for Cleaner Commits

1. **One logical change per commit** - Don't mix unrelated changes
2. **Write clear, concise messages** - First line should be < 50 characters
3. **Use imperative mood** - "Fix bug" not "Fixed bug" or "Fixes bug"
4. **Be specific** - Mention what file/component changed
5. **Group related changes** - Use `git add -p` to stage parts of files

## Squashing Commits (Optional)

If you want to combine multiple related commits:

```bash
# Interactive rebase (last 5 commits)
git rebase -i HEAD~5

# Then change 'pick' to 'squash' or 's' for commits you want to combine
```

## Amending the Last Commit

```bash
# Add more changes to the last commit
git add .
git commit --amend --no-edit

# Or edit the commit message
git commit --amend
```

