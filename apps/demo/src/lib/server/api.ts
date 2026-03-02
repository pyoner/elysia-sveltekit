import { Elysia } from 'elysia';
import { sveltekitPlugin } from 'elysia-sveltekit-plugin';

interface SvelteKitContext {
	locals: App.Locals;
	platform: App.Platform;
}

export const api = new Elysia({ prefix: '/api' })
	.use(sveltekitPlugin<SvelteKitContext>())
	.get('/hello', ({ locals, platform }) => {
		return { message: 'Hello from Elysia SvelteKit Plugin!', locals, platform };
	});
