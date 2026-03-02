import { Elysia } from 'elysia';

// We use `any` here so it can accept SvelteKit's App.Platform without needing
// SvelteKit as a dependency in the plugin itself.
export const requestPlatformMap = new WeakMap<Request, any>();

export const platformPlugin = new Elysia({ name: 'elysia-sveltekit-plugin' }).derive(
	{ as: 'scoped' },
	({ request, status }) => {
		const platform = requestPlatformMap.get(request);
		if (!platform) {
			return status(500, 'Platform context not found');
		}
		return { platform };
	}
);
