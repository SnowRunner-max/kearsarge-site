
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/characters" | "/characters/[slug]" | "/characters/[slug]/dossier" | "/characters/[slug]/history" | "/characters/[slug]/logs" | "/characters/[slug]/overview" | "/characters/[slug]/profile";
		RouteParams(): {
			"/characters/[slug]": { slug: string };
			"/characters/[slug]/dossier": { slug: string };
			"/characters/[slug]/history": { slug: string };
			"/characters/[slug]/logs": { slug: string };
			"/characters/[slug]/overview": { slug: string };
			"/characters/[slug]/profile": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/characters": { slug?: string };
			"/characters/[slug]": { slug: string };
			"/characters/[slug]/dossier": { slug: string };
			"/characters/[slug]/history": { slug: string };
			"/characters/[slug]/logs": { slug: string };
			"/characters/[slug]/overview": { slug: string };
			"/characters/[slug]/profile": { slug: string }
		};
		Pathname(): "/" | "/characters" | "/characters/" | `/characters/${string}` & {} | `/characters/${string}/` & {} | `/characters/${string}/dossier` & {} | `/characters/${string}/dossier/` & {} | `/characters/${string}/history` & {} | `/characters/${string}/history/` & {} | `/characters/${string}/logs` & {} | `/characters/${string}/logs/` & {} | `/characters/${string}/overview` & {} | `/characters/${string}/overview/` & {} | `/characters/${string}/profile` & {} | `/characters/${string}/profile/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/.gitkeep" | "/images/tundra-karsvaldr.png" | string & {};
	}
}