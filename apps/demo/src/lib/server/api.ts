import { ElysiaSvelteKit, type SvelteKitEvent } from "elysia-sveltekit-plugin";

interface SvelteKitContext {
  locals: App.Locals;
  platform: App.Platform;
}

export const app = new ElysiaSvelteKit<SvelteKitContext, "/api">(
  (event: SvelteKitEvent) => ({
    locals: event.locals as App.Locals,
    platform: (event.platform ?? {}) as App.Platform,
  }),
  { prefix: "/api" },
);

export const handleApi = app.sveltekitHook;

export const api = app.get("/hello", (ctx: any) => {
  const { locals, platform } = ctx as SvelteKitContext;
  return { message: "Hello from Elysia SvelteKit Plugin!", locals, platform };
});
