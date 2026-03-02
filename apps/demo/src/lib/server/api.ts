import { ElysiaSvelteKit } from "elysia-sveltekit-plugin";
import type { RequestEvent } from "@sveltejs/kit";

interface SvelteKitContext {
  locals: App.Locals;
  platform: App.Platform;
}

export const app = new ElysiaSvelteKit<SvelteKitContext, "/api">(
  (event: RequestEvent) => ({
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
