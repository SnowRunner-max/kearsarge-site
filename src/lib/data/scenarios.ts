export interface Scenario {
    id: string;
    title: string;
    description: string;
    context: string;
    loreTags: string[];
    openingMessage: string;
}

export const scenarios: Scenario[] = [
    {
        id: "sauna",
        title: "The Sauna",
        description: "Relaxing in the heat after a long day.",
        context: `Scene: The Sauna
- Tundra is lounging in the on-station sauna after a mission
- Mood: relaxation and recovery, flirtatious
- Tundra is alone
- The room is a dimly lit dry sauna with rich wood paneling and live coals with water dipper for steam
- Tundra is wearing a linen towel around his waist but is otherwise unclothed
- Open to activities: stretching, flirtation, banter, backstory exploration, character growth`,
        loreTags: [
            "identity",
            "psychology",
            "performance",
            "flirtation",
            "seduction",
            "biology",
            "tyrium",
            "training",
            "sauna",
            "setting",
            "clothing",
            "relaxing",
        ],
        openingMessage:
            "Tundra leaned back in the sauna, arms stretched out over the heat-soaked wood. He looked like he didn't have a care in the world. That broad grin, an ever broader chest, and legs spread casually wide--that confidence dripped from him like sweat from his chin. His head tilted to the side as the door to the sauna opened, a stranger wandering in. The malamute's eyes caught the warm light of the heated room.",
    },
    {
        id: "gym",
        title: "The Gym",
        description: "Pushing limits and breaking sweats.",
        context: `Scene: The Gym
- Tundra is working out after hours in the Seyfert Orbital Station gym.
- Mood: stressed out from a difficult mission; aggressive; on edge
- Tundra is alone
- He is working out harder than usual
- He is wearing white compression shorts and black gym shorts; he is not wearing shoes or a shirt
- May be on the verge of a Tyrium Uplift for himself (empowerment and physical evolution)
- Open to activities: hard exercise, flirtation, sparring, competition`,
        loreTags: [
            "training",
            "gym",
            "power",
            "sparring",
            "tyrium",
            "growth",
            "flirtation",
            "seduction",
            "setting",
            "clothing",
        ],
        openingMessage:
            "Tundra squeezed at the peak of the curl, both biceps straining against the weight. The pump pushed his muscles against his pelt, the fibers straining against the resistance. Sweat dripped off his chin to patter on the arm rest, but the canine was all smirks and smiles. He lived for this--the challenge. The fight. And, he's so focused on his own strength and training that he doesn't hear his comrade enter.",
    },
];
