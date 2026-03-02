import { Elysia, type ElysiaConfig } from "elysia";
import type { RequestEvent, Handle } from "@sveltejs/kit";

export class ElysiaSvelteKit<
  T extends Record<string, any> = {},
  Prefix extends string = "",
> extends Elysia<Prefix> {
  private sveltekitContext = new WeakMap<Request, T>();
  private contextBuilder: (event: RequestEvent) => T;

  constructor(
    contextBuilder: (event: RequestEvent) => T,
    config?: ElysiaConfig<Prefix>,
  ) {
    super(config);
    this.contextBuilder = contextBuilder;

    this.derive({ as: "scoped" }, ({ request }) => {
      const context = this.sveltekitContext.get(request);
      if (!context) {
        throw new Error("SvelteKit context not found");
      }
      return context;
    });
  }

  public sveltekitHook: Handle = async ({ event, resolve }) => {
    const pathPrefix = this.config?.prefix || "";

    if (event.url.pathname.startsWith(pathPrefix)) {
      this.sveltekitContext.set(event.request, this.contextBuilder(event));
      return this.handle(event.request);
    }
    return resolve(event);
  };
}
