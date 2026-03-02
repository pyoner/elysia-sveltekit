import { Elysia } from "elysia";

declare global {
  namespace App {
    interface Platform {}
  }
}

export const requestPlatformMap = new WeakMap<Request, App.Platform>();

export const platformPlugin = new Elysia({
  name: "elysia-sveltekit-plugin",
}).derive({ as: "scoped" }, ({ request, status }) => {
  const platform = requestPlatformMap.get(request);
  if (!platform) {
    return status(500, "Platform context not found");
  }
  return { platform };
});
