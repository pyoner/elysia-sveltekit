import type { Handle } from '@sveltejs/kit';
import { api, sveltekitContext } from '$lib/server/api';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		sveltekitContext.set(event.request, {
			locals: event.locals,
			platform: event.platform ?? ({} as App.Platform)
		});
		return api.handle(event.request);
	}

	return resolve(event);
};
