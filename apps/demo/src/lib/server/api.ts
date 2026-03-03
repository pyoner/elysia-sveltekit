import { sveltekit } from "elysia-sveltekit";

interface SvelteKitContext {
  locals: App.Locals;
  platform: App.Platform;
}

export const { app, hook: handleApi } = sveltekit<SvelteKitContext, "/api">(
  (event) => ({
    locals: event.locals,
    platform: event.platform ?? {},
  }),
  { prefix: "/api" },
);

export const api = app.get("/hello", (ctx) => {
  const { locals, platform } = ctx;
  return { message: "Hello from Elysia SvelteKit Plugin!", locals, platform };
});
