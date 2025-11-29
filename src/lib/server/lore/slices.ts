import type { CharacterPageData } from '$lib/types/character';
import type { ContextSlice } from '$lib/types/lore';

export function buildContextSlices(id: string, data: CharacterPageData): ContextSlice[] {
    const slices: ContextSlice[] = [];
    const { hero, dossier } = data;

    const identificationLines = [
        `Name: ${hero.name}`,
        dossier.identification.aliases.length
            ? `Aliases: ${dossier.identification.aliases.join(', ')}`
            : undefined,
        `Species/Origin: ${dossier.identification.speciesOrigin}`,
        `Gender: ${dossier.identification.gender}`,
        `Height: ${dossier.identification.appearance.height}`,
        `Weight: ${dossier.identification.appearance.weight}`,
        `Build: ${dossier.identification.appearance.build}`,
        `Fur Pattern: ${dossier.identification.appearance.furPattern}`,
        `Augmentations: ${dossier.identification.appearance.augmentations}`,
        `Cybernetics: ${dossier.identification.appearance.cybernetics}`
    ].filter(Boolean) as string[];

    slices.push({
        id: `${id}-dossier-identification`,
        characterId: id,
        source: 'dossier',
        title: 'Identification Summary',
        tags: ['identity', 'profile'],
        content: identificationLines.join('\n')
    });

    const operationalLines = [
        `Combat Class: ${dossier.combatClass}`,
        `Notable Engagements: ${dossier.operational.notableEngagements}`,
        `Specializations: ${dossier.operational.specializations.join(', ')}`,
        `Confirmed Kills: ${dossier.operational.confirmedKills}`,
        `Reputation Markers: ${dossier.operational.reputationMarkers.join(', ')}`
    ];

    slices.push({
        id: `${id}-dossier-operational`,
        characterId: id,
        source: 'dossier',
        title: 'Operational Profile',
        tags: ['combat', 'operations'],
        content: operationalLines.join('\n')
    });

    const psychLines = [
        `Temperament: ${dossier.psych.temperament.join(', ')}`,
        `Motivations: ${dossier.psych.motivations.join(', ')}`,
        `Weaknesses: ${dossier.psych.weaknesses.join(', ')}`,
        `Evaluation: ${dossier.psych.evaluation}`
    ];

    slices.push({
        id: `${id}-dossier-psych`,
        characterId: id,
        source: 'dossier',
        title: 'Psychological Profile',
        tags: ['psychology'],
        content: psychLines.join('\n')
    });

    const threatLines = [
        `Combat Rating: ${dossier.threat.combatRating}`,
        `Risk to Assets: ${dossier.threat.riskToAssets}`,
        `Containment Options: ${dossier.threat.containmentOptions.join(', ')}`,
        `Recommendation: ${dossier.threat.recommendation}`
    ];

    slices.push({
        id: `${id}-dossier-threat`,
        characterId: id,
        source: 'dossier',
        title: 'Threat Assessment',
        tags: ['threat', 'risk'],
        content: threatLines.join('\n')
    });

    data.history.forEach((section, index) => {
        slices.push({
            id: `${id}-history-${index + 1}`,
            characterId: id,
            source: 'history',
            title: section.title,
            tags: ['history'],
            content: section.body.join('\n\n')
        });
    });

    data.logs.slice(0, 6).forEach((log, index) => {
        slices.push({
            id: `${id}-log-${log.id}-${index + 1}`,
            characterId: id,
            source: 'log',
            title: log.title,
            tags: ['log'],
            content: log.body
        });
    });

    return slices;
}
