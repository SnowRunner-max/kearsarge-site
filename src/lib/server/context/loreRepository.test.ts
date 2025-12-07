import { describe, expect, it, vi } from 'vitest';
import { getContextSlicesForPrompt } from './loreRepository';
import * as loreModule from '$lib/server/lore';

// Mock getCharacter to avoid DB/File calls and return a valid structure
vi.mock('$lib/server/lore', () => ({
    getCharacter: vi.fn()
}));

describe('getContextSlicesForPrompt', () => {
    const mockCharacter = {
        hero: { name: 'Tundra' },
        dossier: {
            identification: {
                aliases: [],
                speciesOrigin: 'Malamute',
                gender: 'Male',
                appearance: {
                    height: '6ft',
                    weight: '200lbs',
                    build: 'Muscular',
                    furPattern: 'White',
                    augmentations: 'None',
                    cybernetics: 'None'
                }
            },
            combatClass: 'Heavy',
            operational: {
                notableEngagements: 'None',
                specializations: [],
                confirmedKills: 0,
                reputationMarkers: []
            },
            psych: {
                temperament: [],
                motivations: [],
                weaknesses: [],
                evaluation: 'Stable'
            },
            threat: {
                combatRating: 'A',
                riskToAssets: 'Low',
                containmentOptions: [],
                recommendation: 'Monitor'
            }
        },
        history: [],
        logs: []
    };

    it('should return general context slices (base + physical) by default', async () => {
        vi.mocked(loreModule.getCharacter).mockResolvedValue(mockCharacter as any);

        const slices = await getContextSlicesForPrompt({
            characterId: 'tundra-karsvaldr',
            query: '',
            limit: 10,
            tags: []
        });

        const ids = slices.map(s => s.id);

        // From tundra-context.ts
        expect(ids).toContain('tundra-identity-core');
        // From tundra-physical-context.ts (NOT YET IMPLEMENTED)
        expect(ids).toContain('tundra-physical-core');
    });

    it('should return sauna slices when "sauna" tag is present', async () => {
        vi.mocked(loreModule.getCharacter).mockResolvedValue(mockCharacter as any);

        const slices = await getContextSlicesForPrompt({
            characterId: 'tundra-karsvaldr',
            query: '',
            limit: 20,
            tags: ['sauna']
        });

        const ids = slices.map(s => s.id);

        // Should have sauna slices
        expect(ids).toContain('tundra-sauna-core');
        // Should still have general slices
        expect(ids).toContain('tundra-identity-core');
        expect(ids).toContain('tundra-physical-core');
        // Should NOT have gym slices
        expect(ids).not.toContain('tundra-gym-core');
    });

    it('should return gym slices when "gym" tag is present', async () => {
        vi.mocked(loreModule.getCharacter).mockResolvedValue(mockCharacter as any);

        const slices = await getContextSlicesForPrompt({
            characterId: 'tundra-karsvaldr',
            query: '',
            limit: 20,
            tags: ['gym']
        });

        const ids = slices.map(s => s.id);

        // Should have gym slices
        expect(ids).toContain('tundra-gym-core');
        // Should still have general slices
        expect(ids).toContain('tundra-identity-core');
        expect(ids).toContain('tundra-physical-core');
        // Should NOT have sauna slices
        expect(ids).not.toContain('tundra-sauna-core');
    });

    it('should prioritize scenario slices over generic slices when limits are tight', async () => {
        vi.mocked(loreModule.getCharacter).mockResolvedValue(mockCharacter as any);

        // Both sauna and generic physical context might have relevant info.
        // We want to ensure 'tundra-sauna-core' comes before 'tundra-physical-core'
        // provided they are both competing for limited slots.
        const slices = await getContextSlicesForPrompt({
            characterId: 'tundra-karsvaldr',
            query: '', // No query, so relying on static set order
            limit: 1, // Only 1 slot
            tags: ['sauna']
        });

        expect(slices[0].id).toBe('tundra-sauna-core');
    });

    it('should NOT include gym slices when sauna tag is active, even if keywords match', async () => {
        vi.mocked(loreModule.getCharacter).mockResolvedValue(mockCharacter as any);

        // "clothing" is a tag in both gym and sauna
        const slices = await getContextSlicesForPrompt({
            characterId: 'tundra-karsvaldr',
            query: '',
            limit: 10,
            tags: ['sauna'] // Only sauna active
        });

        const ids = slices.map(s => s.id);
        expect(ids).toContain('tundra-sauna-clothing');
        expect(ids).not.toContain('tundra-gym-clothing');
    });

    it('should include global physical context as fallback', async () => {
        vi.mocked(loreModule.getCharacter).mockResolvedValue(mockCharacter as any);

        const slices = await getContextSlicesForPrompt({
            characterId: 'tundra-karsvaldr',
            query: '',
            limit: 10,
            tags: ['sauna']
        });

        const ids = slices.map(s => s.id);
        expect(ids).toContain('tundra-physical-core');
    });
});
