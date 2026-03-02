import { Elysia, type ElysiaConfig } from "elysia";

export interface SvelteKitEvent {
  url: URL;
  request: Request;
  [key: string]: any;
}

export class ElysiaSvelteKit<
  T extends Record<string, any> = {},
  Prefix extends string = ""
> extends Elysia<Prefix> {
  private sveltekitContext = new WeakMap<Request, T>();

  constructor(config?: ElysiaConfig<Prefix>) {
    super(config);
    
    this.derive({ as: "scoped" }, ({ request }) => {
      const context = this.sveltekitContext.get(request);
      if (!context) {
        throw new Error("SvelteKit context not found");
      }
      return context as T;
    });
  }

  public sveltekitHook(
    contextBuilder: (event: SvelteKitEvent) => T,
    pathPrefix = "/api"
  ) {
    return async ({
      event,
      resolve,
    }: {
      event: SvelteKitEvent;
      resolve: (event: any) => Promise<Response>;
    }) => {
      if (event.url.pathname.startsWith(pathPrefix)) {
        this.sveltekitContext.set(event.request, contextBuilder(event));
        return this.handle(event.request);
      }
      return resolve(event);
    };
  }
}
