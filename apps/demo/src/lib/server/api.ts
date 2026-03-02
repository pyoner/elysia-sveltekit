import { Elysia } from 'elysia';
import { sveltekit } from 'elysia-sveltekit-plugin';

interface SvelteKitContext {
	locals: App.Locals;
	platform: App.Platform;
}

export const api = new Elysia({ prefix: '/api' })
	.use(sveltekit<SvelteKitContext>())
	.get('/hello', ({ locals, platform }) => {
		return { message: 'Hello from Elysia SvelteKit Plugin!', locals, platform };
	});
