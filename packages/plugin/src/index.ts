import { Elysia, type ElysiaConfig } from "elysia";

export interface SvelteKitEvent {
  url: URL;
  request: Request;
  [key: string]: any;
}

export type SvelteKitHandle = (input: {
  event: any;
  resolve(event: any, opts?: any): Promise<Response> | Response;
}) => Promise<Response> | Response;

export class ElysiaSvelteKit<
  T extends Record<string, any> = {},
  Prefix extends string = ""
> extends Elysia<Prefix> {
  private sveltekitContext = new WeakMap<Request, T>();
  private contextBuilder: (event: SvelteKitEvent) => T;

  constructor(
    contextBuilder: (event: SvelteKitEvent) => T,
    config?: ElysiaConfig<Prefix>
  ) {
    super(config);
    this.contextBuilder = contextBuilder;
    
    this.derive({ as: "scoped" }, ({ request }) => {
      const context = this.sveltekitContext.get(request);
      if (!context) {
        throw new Error("SvelteKit context not found");
      }
      return context as T;
    });
  }

  public sveltekitHook(pathPrefix = "/api"): SvelteKitHandle {
    return async ({ event, resolve }) => {
      if (event.url.pathname.startsWith(pathPrefix)) {
        this.sveltekitContext.set(event.request, this.contextBuilder(event));
        return this.handle(event.request);
      }
      return resolve(event);
    };
  }
}
