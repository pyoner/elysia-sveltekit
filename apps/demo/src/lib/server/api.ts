import { sveltekit } from "elysia-sveltekit-plugin";
import type { RequestEvent } from "@sveltejs/kit";

interface SvelteKitContext {
  locals: App.Locals;
  platform: App.Platform;
}

export const { app, hook: handleApi } = sveltekit<SvelteKitContext, "/api">(
  (event: RequestEvent) => ({
    locals: event.locals as App.Locals,
    platform: (event.platform ?? {}) as App.Platform,
  }),
  { prefix: "/api" },
);

export const api = app.get("/hello", (ctx) => {
  const { locals, platform } = ctx;
  return { message: "Hello from Elysia SvelteKit Plugin!", locals, platform };
});
