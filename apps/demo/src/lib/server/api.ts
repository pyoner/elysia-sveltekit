import { Elysia } from 'elysia';
import { createSvelteKitPlugin } from 'elysia-sveltekit-plugin';

interface SvelteKitContext {
	locals: App.Locals;
	platform: App.Platform;
}

export const { sveltekitPlugin, sveltekitContext } = createSvelteKitPlugin<SvelteKitContext>();

export const api = new Elysia({ prefix: '/api' })
	.use(sveltekitPlugin)
	.get('/hello', ({ locals, platform }) => {
		return { message: 'Hello from Elysia SvelteKit Plugin!', locals, platform };
	});
