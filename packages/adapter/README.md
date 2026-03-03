# elysia-sveltekit

> A strictly type-safe server hook adapter for bridging the Elysia web framework with SvelteKit.

This adapter allows you to seamlessly integrate an Elysia backend directly into your SvelteKit application's `hooks.server.ts`. It provides a factory function that creates an Elysia app instance and automatically maps SvelteKit's `RequestEvent` context (like `locals` and `platform`) into Elysia's lifecycle.

## Features

- **Type-Safe Context Injection**: Pass SvelteKit's `locals`, `platform`, or any custom data directly into your Elysia endpoints.
- **No Global State**: State is safely encapsulated within a factory closure using a `WeakMap`.
- **Zero Boilerplate**: Returns a native SvelteKit `Handle` function ready to be exported from `hooks.server.ts`.
- **Native Types**: Leverages SvelteKit's native `@sveltejs/kit` types.

## Installation

```bash
bun add elysia elysia-sveltekit
```

## Usage

### 1. Initialize the Adapter & Define your API

Create your Elysia application and define the context mapping. The `sveltekit` factory returns both the Elysia `app` and the SvelteKit `hook`.

```typescript
// src/lib/server/api.ts
import { sveltekit } from "elysia-sveltekit";

// 1. Define the context you want to inject
interface MyContext {
  locals: App.Locals;
  platform: App.Platform;
}

// 2. Initialize the adapter
export const { app, hook: handleApi } = sveltekit<MyContext, "/api">(
  (event) => ({
    locals: event.locals,
    platform: event.platform,
  }),
  { prefix: "/api" }, // The path prefix your Elysia app will listen on
);

// 3. Build your API endpoints
export const api = app.get("/hello", ({ locals, platform }) => {
  return {
    message: "Hello from Elysia!",
    user: locals.user, // Strongly typed!
  };
});
```

### 2. Connect the SvelteKit Hook

In your SvelteKit `hooks.server.ts`, simply export the generated `hook`.

```typescript
// src/hooks.server.ts
import { handleApi } from "$lib/server/api";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = handleApi;
```

## License

MIT
