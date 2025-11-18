<!-- Auto-generated guidance for AI coding agents working in this repository. -->
# Copilot instructions — smpd-lead-flow

Purpose: give AI coding agents the minimal, actionable context needed to be productive in this repository.

- **Repo facts:** `first-shift-financial/smpd-lead-flow`, default branch `main`, workspace path `/workspaces/smpd-lead-flow`.
- **Environment:** dev container on Ubuntu 24.04.3 LTS, default shell `bash`. Common tools available: `git`, `gh`, `docker`, `curl`, `wget`, `make`.

Quick discovery checklist (what to run first):

- **List top-level files:** `ls -la` — this repo currently contains only `README.md`.
- **Check for common language manifests:** look for `package.json`, `pyproject.toml`, `requirements.txt`, `go.mod`, `Cargo.toml`, `Makefile`, `Dockerfile`, `.devcontainer/`.
- **Check git status and branches:** `git status --porcelain`, `git branch -vv`.

How to interpret repository status here:

- This repository currently has minimal content (only `README.md`). There are no discovered source files, build scripts, or tests to inspect. When the repo lacks language files, do not assume a language — ask the repo owner for guidance before implementing large changes.

If you find existing agent guidance files (e.g., `.github/copilot-instructions.md`, `AGENT.md`, `AGENTS.md`):

- Merge instead of overwrite: preserve any existing sections that describe workflows, build commands, or conventions. Add a short "AI summary" section at the top, then append new, concise actionable cues.

Project-specific patterns and examples (discoverable here):

- `README.md` is present at the repo root and contains the project title and short description: `SMPD Hot Lead Automation Flow` — treat this as the authoritative short description when creating PR titles or summaries.
- Default branch is `main` — open PRs against `main` unless instructed otherwise.

Agent workflow for making changes:

- If the repo contains no build/test files, do the minimal safe change and request human confirmation. Example: create or update documentation, add CI/Makefile scaffolding only after explicit approval.
- Use small commits and clear messages: start messages with an imperative verb and reference the reason, e.g. `Add .github/copilot-instructions.md — initial AI guidance (needs owner review)`.

When you need missing details, ask one targeted question rather than making assumptions. Useful prompts to the repo owner:

- "What language/framework does this project use (Node/Python/Go/Rust)?"
- "Are there any local build or test commands you expect me to run?"
- "Where should I place new source code (e.g., `src/`, `cmd/`, `pkg/`)?"

Where to look for integration points:

- CI/CD: check `.github/workflows/` and `Dockerfile` for deploy/build hooks.
- Scripts: check `scripts/`, `Makefile`, and `tools/` for automation patterns.

Editing guidance and constraints for AI agents:

- Do not add any heavy scaffolding (new frameworks, large dependency manifests) without explicit owner approval.
- Avoid changing repository metadata (branch protections, default branch) — these are owner-managed.
- Keep PRs small and self-contained; include a short summary and testing notes.

If you update this file later, keep it concise (20–50 lines) and include examples referencing discovered files.

---
If anything in this guidance looks incomplete, respond with the exact missing facts (language, build/test commands, expected file layout) and I will iterate.
