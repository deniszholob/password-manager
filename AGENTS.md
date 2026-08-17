# General Guidelines

DO NOT generate conversation summary or documentation files!!!! like SUMMARY.md etc.

- Any time something didn't work, don't continue to build with junk code:
  - If an attempted change does not improve the target metric, revert it immediately before trying another approach.
  - After each revert, confirm the affected files have no remaining diff from that failed attempt.

IGNORE `.dev/` folder thats scrap code
Reference more instructions in `.github/instructions/*`
Before editing or adding Angular code, read `.github/instructions/angular.instructions.md`

# Ask if developer wants test to be created when fixing bugs:

- When fixing BUGS (not new features), use this workflow only if ASKED:
  - write or update a test to reproduce the bug first
  - confirm the test fails against the broken behavior
  - then fix the buggy code and verify the same test passes/
- When making new features do NOT write tests, so we can iterate faster

# Code Formatting/Lint

When generating new code, always follow the project lint and format settings

# Code check commands

Prioritize using quick commands (as apposed to full rebuilds builds) when checking compilations to save on time such as these:

- `pnpm exec vitest run apps/web/<path/to/spec>.spec.ts --config apps/web/vite.config.mts`
- `pnpm exec tsc -p apps/web/.storybook/tsconfig.json --noEmit`
- `pnpm exec tsc -p apps/web/tsconfig.app.json --noEmit`
- `pnpm run check-circ-deps`

# !IMPORTANT!

When using NX commands like `nx build`

- default to this exact pattern on the first try:
  `NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_WORKSPACE_DATA_DIRECTORY=/tmp/nx-workspace-data-password-manager pnpm exec nx ... --outputStyle=static`
- replace `...` with the real Nx command, for example:
  `NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_WORKSPACE_DATA_DIRECTORY=/tmp/nx-workspace-data-password-manager pnpm exec nx run build:web --outputStyle=static`
- why:
  `NX_DAEMON=false` avoids the frequent `Waiting for graph construction in another process to complete` hang
  `NX_ISOLATE_PLUGINS=false` helps when Nx fails to load default plugins
  `NX_WORKSPACE_DATA_DIRECTORY=/tmp/nx-workspace-data-password-manager` avoids local workspace-data / IPC issues in this repo
  `--outputStyle=static` is more reliable for sandboxed verification runs

# Releasing new versions

- Ensure each component has a corresponding story with filled in inputs and outputs
- Run `pnpm run check-circ-deps`, `pnpm run lint:fix`, `pnpm run format:fix`
- Update the version in [package.json](./package.json)
- Update [changelog](./CHANGELOG.md) to include the version and the changes
  - changelog should include only user facing features/ui/ux etc..
  - changelog should not include any technical behind the scenes changes (upgrading angular, or adding stories, etc...) that dont provide value for user
  - changelog should not include changes that provide value for the developer that information lives in the commits instead.

## Commit Messages

- Use this format:
  - `Commit Message Title`
  - blank line
  - one or more `* Bullet point` lines as needed
- Keep the title short and user-facing.
- Keep bullets short, concise and focused on the actual staged code changes.
- Treat the staged diff as the source of truth for the commit message; use chat history only as context, not as the subject of the bullets.
