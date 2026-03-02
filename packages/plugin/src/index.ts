import { Elysia } from "elysia";

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

  return {
    sveltekitPlugin,
    sveltekitContext,
  };
};
