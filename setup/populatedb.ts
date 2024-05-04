import { db } from '@/lib/db';

import populateUsers from './populatusers';

export async function populateDB() {
	const ids = await populateUsers();

    
}
