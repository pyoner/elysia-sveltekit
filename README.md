# elysia-sveltekit

> A server hook adapter bridging the Elysia web framework with SvelteKit.

This monorepo contains the source code for `elysia-sveltekit` and a demonstration application.

The adapter provides a factory function that generates an Elysia application instance alongside a native SvelteKit `Handle` hook. This allows developers to seamlessly inject any arbitrary SvelteKit context (such as `locals`, `platform`, session data, etc.) directly into their Elysia endpoints in a strictly type-safe manner without polluting global state.

## Repository Structure

This repository is managed as a **Bun workspace**.

- [`packages/adapter`](./packages/adapter): The core server hook adapter package.
- [`apps/demo`](./apps/demo): A sample SvelteKit application demonstrating the integration and usage of the adapter.

## How to Use

The adapter provides a factory function that creates an Elysia app and a SvelteKit `Handle` hook. Define your context mapping and prefix, then export the hook in `hooks.server.ts`.

```typescript
// src/lib/server/api.ts
import { sveltekit } from "elysia-sveltekit";

export const { app, hook } = sveltekit((event) => ({ locals: event.locals }), { prefix: "/api" });

// Define endpoints using the app object
export const api = app.get("/hello", ({ locals }) => {
  return { message: "Hello from Elysia!", user: locals.user };
});
```

```typescript
// src/hooks.server.ts
import { hook } from "$lib/server/api";

export const handle = hook;
```

For full documentation, see [`packages/adapter/README.md`](./packages/adapter/README.md).

The project strictly uses [Bun](https://bun.sh/).

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Run the demo application**

   ```bash
   cd apps/demo
   bun run dev
   ```

3. **Type checking**
   ```bash
   cd apps/demo
   bun run check
   ```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue.
