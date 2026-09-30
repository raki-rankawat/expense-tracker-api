---
name: commit-msg
description: Generate a Conventional-Commits-style message from staged changes and commit them. Trigger when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Generate a commit message from the staged diff and create the commit.

## Workflow

1. Run `git diff --staged --stat` and `git diff --staged`. If there are **no staged changes**, stop immediately and tell the user to stage their changes first (e.g. `git add <files>`). Do not commit anything.
2. Read the staged diff to understand what changed and why.
3. Compose a commit message in this exact format:

   ```
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   ```

   - **type** must be one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.
   - **scope** is a short area name (e.g. `api`, `db`, `server`); pick it from the files/area touched. Omit `(scope)` if no single scope fits.
   - **subject** must be under 60 characters, imperative mood, no trailing period.
   - Body bullets are optional but encouraged: one bullet for *what* changed, one for *why*.
4. Commit with the generated message using a heredoc to preserve line breaks:

   ```
   git commit -F - <<'EOF'
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   EOF
   ```

## Rules

- **Never** add a `Co-Authored-By` trailer or any other attribution trailer.
- Keep the subject line under 60 characters.
- Do not stage files yourself — only commit what is already staged.
