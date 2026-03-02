import type { Handle } from '@sveltejs/kit';
import { api } from '$lib/server/api';
import { sveltekitContextMap } from 'elysia-sveltekit-plugin';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		sveltekitContextMap.set(event.request, {
			locals: event.locals,
			platform: event.platform ?? ({} as App.Platform)
		});
		return api.handle(event.request);
	}

	return resolve(event);
};
