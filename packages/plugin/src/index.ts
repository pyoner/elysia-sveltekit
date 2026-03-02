import { Elysia, type ElysiaConfig } from "elysia";
import type { RequestEvent, Handle } from "@sveltejs/kit";

export function sveltekit<
  T extends Record<string, any> = {},
  Prefix extends string = "",
>(
  contextBuilder: (event: RequestEvent) => T,
  config?: ElysiaConfig<Prefix>,
) {
  const sveltekitContext = new WeakMap<Request, T>();

  const app = new Elysia(config).derive({ as: "scoped" }, ({ request }) => {
    const context = sveltekitContext.get(request);
    if (!context) {
      throw new Error("SvelteKit context not found");
    }
    return context as T;
  });

  const hook: Handle = async ({ event, resolve }) => {
    const pathPrefix = config?.prefix || "";

    if (event.url.pathname.startsWith(pathPrefix)) {
      sveltekitContext.set(event.request, contextBuilder(event));
      return app.handle(event.request);
    }
    return resolve(event);
  };

  return { app, hook };
}
