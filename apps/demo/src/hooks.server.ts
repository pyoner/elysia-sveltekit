import { handleApi } from '$lib/server/api';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = handleApi as unknown as Handle;
