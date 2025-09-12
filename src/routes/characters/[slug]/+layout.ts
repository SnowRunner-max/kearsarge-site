import type { LayoutLoad } from './$types';
import { getCharacter } from '$lib/data/characters';

export const load: LayoutLoad = async ({ params }) => {
  const slug = params.slug;
  const character = getCharacter(slug);
  if (!character) {
    return {
      status: 404,
      error: new Error('Character not found')
    } as any;
  }
  return { slug, character };
};

