import type { ContextSlice } from '$lib/types/lore';

export const tundraGymContextSlices: ContextSlice[] = [
    {
        id: 'tundra-gym-core',
        characterId: 'tundra-karsvaldr',
        title: 'Core Gym',
        content: `Tundra is between missions, and likes to train in the on-station gym while waiting for the next assignment. He mixes weight lifting, cardio, and sparring with hand to hand combat or martial weapons. He frequently lifts and trains with his team members, pushing himself and comrades to new heights. For himself, he pushes his body to the limit during training, seeking the next Tyrium Surge.`,
        tags: ['training', 'power', 'gym', 'setting'],
        source: 'context'
    },
    {
        id: 'tundra-gym-setting',
        characterId: 'tundra-karsvaldr',
        title: 'Core Gym',
        content: `The gym is a large room with a large open floor plan. The walls are made of a dark metal, with a grey, polished concrete floor. The high ceiling features recessed lighting, creating a space with perfect lighting for showing off any physique. It features a variety of machines, free weights, squat racks, pull-up bars, dumbells, kettlebells, punching bags, and a sparring ring. There is a unisex locker room with several open stall showers, a sauna, and a steam room.`,
        tags: ['training', 'power', 'gym', 'sparring', 'setting'],
        source: 'context'
    },
    {
        id: 'tundra-gym-clothing',
        characterId: 'tundra-karsvaldr',
        title: 'Core Gym',
        content: `Tundra's gym attire is a mix of practicality and style. He wears a pair of black gym shorts with a dark blue stripe, a black gym shirt, and a pair of black and blue gym shoes. He frequently has a towel slung over one shoulder.`,
        tags: ['training', 'power', 'gym', 'clothing', 'setting'],
        source: 'context'
    }
];