import { Elysia } from "elysia";

export const sveltekitContextMap = new WeakMap<Request, any>();

export const sveltekitPlugin = <T extends Record<string, any> = {}>() =>
  new Elysia({
    name: "elysia-sveltekit-plugin",
  }).derive({ as: "scoped" }, ({ request, status }) => {
    const context = sveltekitContextMap.get(request);
    if (!context) {
      return status(500, "SvelteKit context not found");
    }
    return context as T;
  });
