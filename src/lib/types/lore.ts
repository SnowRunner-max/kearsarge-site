import type { CharacterPageData } from './character';

export type ContextSlice = {
  id: string;
  characterId: string;
  title: string;
  content: string;
  tags: string[];
  source: 'dossier' | 'history' | 'timeline' | 'log';
};

export type CharacterLoreBundle = {
  id: string;
  character: CharacterPageData;
  contextSlices: ContextSlice[];
};
