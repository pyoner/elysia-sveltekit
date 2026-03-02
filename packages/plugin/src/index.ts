import { Elysia } from "elysia";

export interface SvelteKitEvent {
  url: URL;
  request: Request;
  [key: string]: any;
}

export const createSvelteKitPlugin = <T extends Record<string, any> = {}>() => {
  const sveltekitContext = new WeakMap<Request, T>();

  const sveltekitPlugin = new Elysia({
    name: "elysia-sveltekit-plugin",
  }).derive({ as: "scoped" }, ({ request, status }) => {
    const context = sveltekitContext.get(request);
    if (!context) {
      return status(500, "SvelteKit context not found");
    }
    return context;
  });

  const createHandle = ({
    app,
    pathPrefix = "/api",
    contextBuilder,
  }: {
    app: { handle: (request: Request) => Promise<Response> | Response };
    pathPrefix?: string;
    contextBuilder: (event: SvelteKitEvent) => T;
  }) => {
    return async ({
      event,
      resolve,
    }: {
      event: SvelteKitEvent;
      resolve: (event: any) => Promise<Response>;
    }) => {
      if (event.url.pathname.startsWith(pathPrefix)) {
        sveltekitContext.set(event.request, contextBuilder(event));
        return app.handle(event.request);
      }
      return resolve(event);
    };
  };

  return {
    sveltekitPlugin,
    sveltekitContext,
    createHandle,
  };
};
