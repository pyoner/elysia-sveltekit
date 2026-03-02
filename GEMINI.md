# Elysia SvelteKit

Server hook adapter bridging the Elysia web framework with SvelteKit on Bun.

## Project Structure
* `packages/elysia-sveltekit`: Core adapter package.
* `apps/demo`: SvelteKit demo application.

## Commands (Bun Monorepo)
* `bun install`: Install dependencies (run at root).
* `cd apps/demo && bun run dev`: Run demo.
* `cd apps/demo && bun run check`: Type check demo.

## Architecture & Conventions
* **Runtime:** Bun.
* **Types:** Always use native `@sveltejs/kit` types (e.g., `RequestEvent`, `Handle`).
* **Factory Pattern:** The `sveltekit()` factory returns `{ app, hook }`. 
  * `app`: The Elysia application.
  * `hook`: The SvelteKit `Handle` function.
* **Encapsulation:** Internal context state is managed via a `WeakMap` within the factory closure to prevent global state leaks.

## Example
```typescript
import { sveltekit } from "elysia-sveltekit";

export const { app, hook } = sveltekit<Context, "/api">(
  (event) => ({ locals: event.locals }),
  { prefix: "/api" }
);
```