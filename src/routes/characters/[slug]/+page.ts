import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  return {
    status: 302,
    redirect: `/characters/${params.slug}/overview`
  } as any;
};

