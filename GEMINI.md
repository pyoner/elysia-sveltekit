# Elysia SvelteKit

## Project Overview

`elysia-sveltekit` is an integration adapter bridging the Elysia web framework with SvelteKit. Built to run on **Bun**, it provides a factory function that generates an Elysia application instance alongside a native SvelteKit `Handle` hook. This allows developers to seamlessly inject any arbitrary SvelteKit context (such as `locals`, `platform`, etc.) directly into their Elysia endpoints in a strictly type-safe manner.

### Repository Structure (Monorepo)
*   `packages/elysia-sveltekit`: The core adapter package exposing the `sveltekit()` factory function.
*   `apps/demo`: A sample SvelteKit application demonstrating the integration and usage of the adapter.

## Building and Running

Since this project is a monorepo utilizing Bun workspaces, standard Bun commands apply at the root level:

*   **Install dependencies:** `bun install`
*   **Run SvelteKit demo:** `cd apps/demo && bun run dev`
*   **Type checking:** `cd apps/demo && bun run check`

## Architecture & Integration

*   **Factory Pattern:** The integration is initialized using the `sveltekit()` factory.
*   **Type Injection:** The factory accepts a generic type `<T>` and a `contextBuilder` function to map the SvelteKit `RequestEvent` to your custom context object.
*   **Outputs:** The factory returns an object containing `{ app, hook }`:
    *   `app`: The Elysia application instance, automatically configured to extract the injected context.
    *   `hook`: A native SvelteKit `Handle` function that intercepts requests based on the provided `prefix` and maps the SvelteKit event context into the Elysia lifecycle.

### Example Usage
```typescript
import { sveltekit } from "elysia-sveltekit";
import type { RequestEvent } from "@sveltejs/kit";

interface MyContext {
  locals: App.Locals;
  platform: App.Platform;
}

export const { app, hook: handleApi } = sveltekit<MyContext, "/api">(
  (event: RequestEvent) => ({
    locals: event.locals,
    platform: event.platform ?? {},
  }),
  { prefix: "/api" }
);

export const api = app.get("/hello", ({ locals }) => "Hello World");
```

## Development Conventions

*   **Runtime:** The project strictly uses **Bun**.
*   **Types:** Always use native `@sveltejs/kit` types (e.g., `RequestEvent`, `Handle`) to maintain structural compatibility.
*   **Encapsulation:** Internal context state is managed via a `WeakMap` encapsulated entirely within the factory closure to prevent global state leaks.