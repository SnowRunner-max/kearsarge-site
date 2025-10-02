import { error } from '@sveltejs/kit';

import { getCharacterPageData } from '$lib/server/lore/characterRepository';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const slug = params.slug;
  const character = await getCharacterPageData(slug);
  if (!character) {
    throw error(404, 'Character not found');
  }

  return { slug, character };
};
