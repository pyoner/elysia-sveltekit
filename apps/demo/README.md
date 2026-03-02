# SvelteKit Demo App

This is a demonstration application showing how to integrate SvelteKit with Elysia using the `elysia-sveltekit` server hook adapter.

## How it works

1. The Elysia backend is defined in [`src/lib/server/api.ts`](./src/lib/server/api.ts). It uses the `sveltekit` factory function to build the Elysia instance and map the SvelteKit `RequestEvent` context into it.
2. The generated SvelteKit hook (`handleApi`) is exported from [`src/hooks.server.ts`](./src/hooks.server.ts).

## Running Locally

Ensure you have installed the monorepo dependencies from the root directory using `bun install`.

```bash
# Start the development server
bun run dev
```

Once the server is running, you can test the API integration by navigating to:

```
http://localhost:5173/api/hello
```

You should see a JSON response confirming the SvelteKit context (`locals` and `platform`) was successfully injected into the Elysia endpoint.

## Type Checking

To verify the integration is perfectly type-safe:

```bash
bun run check
```
