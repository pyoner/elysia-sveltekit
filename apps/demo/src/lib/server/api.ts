import { Elysia } from 'elysia';
import { platformPlugin } from 'elysia-sveltekit-plugin';

export const api = new Elysia({ prefix: '/api' })
	.use(platformPlugin)
	.get('/hello', ({ platform }) => {
		return { message: 'Hello from Elysia SvelteKit Plugin!', platform };
	});
