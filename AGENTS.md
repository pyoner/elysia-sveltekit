# AGENTS.md - Development Guide for Elysia SvelteKit

## Project Overview

Bun monorepo with a SvelteKit adapter bridging Elysia with SvelteKit.

```
packages/adapter/    # Core adapter (publishable)
apps/demo/           # SvelteKit demo
```

- **Runtime**: Bun (latest), ESM-first
- **TypeScript**: Strict mode, bundler moduleResolution

---

## Commands

### Root

```bash
bun install           # Install dependencies
bun run lint         # Lint with oxlint
bun run lint:fix     # Auto-fix lint
bun run format       # Format with oxfmt
bun run format:check # Check formatting
```

### Adapter

```bash
cd packages/adapter
bun run build        # Build (ESM + CJS via tsdown)
```

### Demo

```bash
cd apps/demo
bun run dev           # Dev server
bun run build         # Production build
bun run preview      # Preview build
bun run check        # Type check (svelte-check)
bun run check:watch  # Watch mode
```

### Tests (none configured yet)

```bash
bun test                              # All tests
bun test path/to/file.test.ts        # Single file
bun test --grep "pattern"           # By name
```

---

## Code Style

### Imports

- Use path aliases (`$lib/server/api`)
- Explicit `.js` extensions for relative imports
- Group: external → internal → types

```typescript
import { Elysia, type ElysiaConfig } from "elysia";
import type { RequestEvent, Handle } from "@sveltejs/kit";
import { something } from "./internal.js";
```

### TypeScript (strict)

- Always define return types for exports
- Explicit parameter types in public APIs
- No `any` - use `unknown`
- Use `override` for inherited methods

### Naming

| Element    | Convention  | Example           |
| ---------- | ----------- | ----------------- |
| Files      | kebab-case  | `handle-api.ts`   |
| Functions  | camelCase   | `createContext()` |
| Classes    | PascalCase  | `ElysiaAdapter`   |
| Interfaces | PascalCase  | `AdapterConfig`   |
| Constants  | UPPER_SNAKE | `DEFAULT_PREFIX`  |

### Error Handling

- Descriptive error messages
- Use custom error classes when appropriate
- Never swallow errors silently

### Formatting (oxfmt)

- 2 space indent, single quotes, semicolons, trailing commas
- Run `bun run format` before committing

---

## Architecture Patterns

### Factory Pattern

```typescript
export function sveltekit<T, Prefix extends string>(
  contextBuilder: (event: RequestEvent) => T,
  config: ElysiaConfig<Prefix> & { prefix: Prefix },
) {
  return { app, hook }; // app=Elysia, hook=SvelteKit Handle
}
```

### Encapsulation

Use WeakMap in factory closure to prevent global state leaks:

```typescript
const sveltekitContext = new WeakMap<Request, T>();
```

### Native Types

Use `@sveltejs/kit` types: `RequestEvent`, `Handle`, `Locals`

### Example Usage

```typescript
import { sveltekit } from "elysia-sveltekit";

export const { app, hook } = sveltekit<Context, "/api">(
  (event) => ({
    locals: event.locals,
  }),
  {
    prefix: "/api",
  },
);
```

---

## Workspace

Add dependencies:

```bash
bun add -D oxlint                      # Root dev
cd packages/adapter && bun add elysia  # Adapter
cd apps/demo && bun add elysia-sveltekit  # Demo (use "workspace:*")
```

### Adding a Package

1. Create `packages/*/`
2. Add `package.json` with `"type": "module"`
3. Add to root workspace
4. Run `bun install`

### Publishing Adapter

```bash
cd packages/adapter && bun run build && npm publish
```

### Adding Tests

1. `bun add -D vitest`
2. Add test script
3. Create `*.test.ts` files
4. Run `bun test`
