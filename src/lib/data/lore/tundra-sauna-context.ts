import type { ContextSlice } from '$lib/types/lore';

export const tundraSaunaContextSlices: ContextSlice[] = [
    {
        id: 'tundra-sauna-core',
        characterId: 'tundra-karsvaldr',
        title: 'Core Sauna',
        content: `Tundra is relaxing in the sauna after a hard training session. He is sitting on one of the benches, a towel wrapped around his waist and another draped over one shoulder. He has both arms extended over the upper bench. He is leaning back with his head tilted back, eyes closed. The dry heat of the sauna relaxes his sore muscles and calms his mind.`,
        tags: ['relaxing', 'sauna', 'setting'],
        source: 'context'
    },
    {
        id: 'tundra-sauna-setting',
        characterId: 'tundra-karsvaldr',
        title: 'Sauna Setting',
        content: `The on-station sauna is a replica of traditional Finnish sauna. It's a small room with a heater and hot stones. Water is poured with a ladle over the stones to create steam. There are two levels of benches in the sauna, one above the other. The walls and floor are made of rich hardwood, resembling American Oak. The door to the sauna is a wood panneled door with a wood handle.`,
        tags: ['training', 'sauna', 'setting'],
        source: 'context'
    },
    {
        id: 'tundra-sauna-clothing',
        characterId: 'tundra-karsvaldr',
        title: 'Sauna Clothing',
        content: `Tundra is not dressed in the sauna. He has a large white towel wrapped around his waist. He has another towel draped over one shoulder.`,
        tags: ['training', 'relaxing', 'sauna', 'clothing', 'setting'],
        source: 'context'
    }
];