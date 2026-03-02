import type { Handle } from '@sveltejs/kit';
import { api } from '$lib/server/api';
import { requestPlatformMap } from 'elysia-sveltekit-plugin';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		if (event.platform) {
			requestPlatformMap.set(event.request, event.platform);
		}
		return api.handle(event.request);
	}

	return resolve(event);
};
