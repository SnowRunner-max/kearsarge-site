import { error } from '@sveltejs/kit';

import { getCharacterPageData } from '$lib/server/lore/characterRepository';
import type { PageServerLoad } from './$types';

const DEFAULT_CHARACTER_SLUG = 'tundra-karsvaldr';

export const load: PageServerLoad = async () => {
  const character = await getCharacterPageData(DEFAULT_CHARACTER_SLUG);
  if (!character) {
    throw error(404, 'Character not found');
  }

  return {
    character,
    slug: DEFAULT_CHARACTER_SLUG
  };
};
