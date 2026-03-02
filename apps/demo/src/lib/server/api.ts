import { Elysia } from 'elysia';
import { createSvelteKitPlugin, type SvelteKitEvent } from 'elysia-sveltekit-plugin';

interface SvelteKitContext {
	locals: App.Locals;
	platform: App.Platform;
}

export const { sveltekitPlugin, createHandle } = createSvelteKitPlugin<SvelteKitContext>();

export const api = new Elysia({ prefix: '/api' })
	.use(sveltekitPlugin)
	.get('/hello', ({ locals, platform }) => {
		return { message: 'Hello from Elysia SvelteKit Plugin!', locals, platform };
	});

export const handleApi = createHandle({
	app: api,
	pathPrefix: '/api',
	contextBuilder: (event: SvelteKitEvent) => ({
		locals: event.locals as App.Locals,
		platform: (event.platform ?? {}) as App.Platform
	})
});
