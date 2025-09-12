import type { LayoutLoad } from './$types';
import { getCharacter } from '$lib/data/characters';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ params }) => {
  const slug = params.slug;
  const character = getCharacter(slug);
  if (!character) throw error(404, 'Character not found');
  return { slug, character };
};
