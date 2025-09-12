import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    status: 302,
    redirect: '/characters/tundra-karsvaldr/overview'
  } as any;
};

