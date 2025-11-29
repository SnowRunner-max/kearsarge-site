import { getCharacter } from '$lib/server/lore';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const character = await getCharacter('tundra-karsvaldr');

    if (!character) {
        throw error(404, 'Character not found');
    }

    return {
        character
    };
};
