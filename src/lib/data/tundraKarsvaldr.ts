import type { CharacterPageData } from "$lib/types/character";
import { tundraSeyfert } from "$lib/data/tundraSeyfert";

export const tundraKarsvaldr: CharacterPageData = {
  hero: {
    name: "Tundra Karsvaldr",
    tagline: "White Maw. Asset. Weapon. Uncontained.",
  },
  dossier: {
    classificationLevel: "Orange",
    subject: "Independent Agent Operating Beyond Seyfert Int. Jurisdiction",
    fileOrigin: "Seyfert Interplanetary Intelligence - Frontier Assets Division",
    lastUpdate: "2377.25.01-00:07 Rosche Standard",
    identification: {
      aliases: ["Tundra", "Frostbite", "Inversion"],
      speciesOrigin: "Tyrium-uplifted Malamute",
      ageRange: "25-30 years, apparent",
      gender: "Male",
      appearance: {
        height: "228cm",
        weight: "290kg",
        build: "Muscular",
        furPattern:
          "White base fur, dark blue secondary coat, jagged light blue stripes",
        augmentations: "Biological, Tyrium enhancements",
        cybernetics: "No known cybernetic enhancements",
        attire:
          "Duro-carbon breastplate, compression shirt, black fatigues, heavy boots",
      },
    },
    vessel: {
      shipClass: "Light Corvette",
      designation: "Sastrugi",
      registryStatus: "Legitimate, through illegitimate shell corporation",
      capabilities: {
        ftlStatus: "Harpalyke Gate (H-Gate) Enabled",
        weapons: [
          "Twin-linked Railguns (Bow-Mounted)",
          "Point-Defense Laser Array (Turreted)",
          "Missile Pods (2x4 Vertical Launch System)",
          "Torpedo Tube (Dorsal Mount)",
        ],
        systems: ["ECM Suite", "Decoy Drones", "Active/Passive Sensor Array"],
      },
      maintenanceCondition: "Battleworn",
    },
    affiliations: {
      employersOfRecord: ["Seyfert Prototypes Interplanetary"],
      contacts: ["None"],
      factionRelations: [
        { faction: "Seyfert Prototypes Interplanetary", relation: "Hostile" },
        { faction: "Harpalyke Collective", relation: "Neutral" },
        { faction: "Hreshin Empire", relation: "Friendly" },
        { faction: "Skrellin Arc", relation: "Friendly" },
      ],
    },
    operational: {
      notableEngagements:
        "Destruction of [REDACTED] Station, raids of Seyfert property, elimination of Seyfert personnel, destruction of [REDACTED] mining facility",
      specializations: [
        "Ship-to-ship combat",
        "CQC",
        "Assault Tactics",
        "Espionage",
      ],
      confirmedKills: "533 KIA",
      reputationMarkers: ["Aggressive", "lustful", "risky", "power-hungry"],
    },
    psych: {
      temperament: ["Volatile", "passionate", "aggressive", "impetuous"],
      motivations: ["Power", "lust", "revenge", "independence"],
      weaknesses: ["[REDACTED] dependence", "Sex", "Weakness", "Challenge"],
      evaluation:
        'Subject demonstrates high adaptability in uncertain theaters. Promise of power or "insurmountable" challenges are a draw. Use [REDACTED] dependence to corner, as necessary.',
    },
    threat: {
      combatRating: "Extreme",
      riskToAssets: "Severe",
      containmentOptions: ["Direct force", "interdiction"],
      recommendation: "Capture, eliminate",
    },
    additionalNotes:
      '"The subject operates in theaters that promise him the highest opportunity for physical empowerment. Survival and success rates are anomalously high."',
  },
  profile: [
    {
      title: "Origins",
      body:
        "Tundra was born in Draumveil Crater Colony—a place the miners themselves called The Maw, for the way it swallowed lives without pause. His father dragged the family there from a safer agrarian outpost on Kearsarge IV’s temperate belt. Pride drove the decision: he wanted to prove himself in the Tyrium veins, to rise above the endless cycle of wheat, corn, and potatoes. His mother opposed the move, whispering of old superstitions about families marked for ruin by the ore, but her voice was drowned out by her husband’s ambition.\n\nGovernor Alvis Ruun recorded their arrival with a single dry line: “Another eager family chasing fortune. The Maw will sort the worthy from the weak.”\n\nThe gamble failed. His father was nothing more than another Category 2 casualty, bleeding out from marrow collapse before Tundra had learned his letters. Foreman Korr Viklund logged the death with the same indifference he gave to broken tools: “Another one down. Ore takes who it wants. Quota unchanged.”\n\nHis mother—quiet, haunted—hid her own flashes of strength, her Category 4 potential. Despite resistance to Tyrium being a badge of honor, to her it was a curse: a path that ended in separation from her son and a reminder of her husband’s hubris. Handler Jeyna Corval would later write, in a retrospective review: “She stayed small so he could grow.”",
    },
    {
      title: "Childhood in the Maw",
      body:
        "In a colony where half-grown boys were considered full hands, Tundra entered the mines at sixteen. Viklund’s entry in the HR system was grimly brief: “Another boy in the Maw. If he lasts a month, I’ll be surprised.”\n\nBut Tundra was different. Even at that age, he grew broader than the other miners, his pale coat catching the Tyrium lamps with a bluish frost. Viklund’s incident notes shifted from dismissal to unease: “Doesn’t tire, doesn’t stumble. Cart straps barely mark him. Looks carved out of stone. Feels wrong to write him up for being too strong.”\n\nBy seventeen, whispers of his nature spread. Recruiter Daran Solvik, circling like a vulture, filed a “whisper file” for corporate review: “Promising find. If nurtured properly, could yield long-term dividends. If not, the Maw will eat him like the rest. Better Seyfert take the first bite.”\n\nThe miners had already named him. Not “Godborn”—a name too clean for men who lived with dust in their lungs. They called him White Maw. A joke at first, then a warning, then finally something spoken without mockery. To them, he was the proof the crater could spit something back.",
    },
    {
      title: "The Marked Years",
      body:
        "At nineteen, Tundra was reassigned to the First Rift Facility, one of the primary crater mines where Tyrium bled straight from the planetary wounds.\n\nViklund, now Rift overseer, wrote detailed reports with growing dread: “The boy runs longer than he should. Cart loads heavier than three men could shift, and still he doesn’t breathe hard. The air clears around him when he moves. Frost feathers the collars he leans on. Every day he looks less like a worker and more like something the Maw didn’t mean to give us.”\n\nThe miners’ folklore hardened around the name White Maw. Handler Corval compiled their words with a dangerous warmth: “He carries size and presence that doesn’t belong to one so young. Seyfert calls him subject. In truth, he is beautiful, in the way avalanches are beautiful: inevitable, merciless, and impossible not to watch.”\n\nEven the scientists struggled. Dr. Ilsa Myrren’s clinical logs dissolved into awe: “Tyrium does not degrade him. It perfects him. Symmetry balanced, efficient, aesthetically striking. I caution myself to remain clinical—but it is difficult.”",
    },
    {
      title: "The Unmanageable One",
      body:
        "Tundra’s fixation became the Core, the fabled heart of the crater where Tyrium welled pure and alive. To most, the idea of reaching it was suicidal fantasy; to him, it was destiny.\n\nSecurity Chief Malrik Otten logged him as a containment hazard: “He’s not hostile yet. That’s the problem. Hostility we can handle. Belief is harder.”\n\nViklund gave up trying to restrain him: “No chain of command holds. If Seyfert wants him so bad, they can come take him.”\n\nHandler Corval’s own addenda by then were half confession, half desire: “When he passes, the air chills, but I burn hotter for it. I dream of him some nights, and I wake ashamed, knowing Seyfert would never permit it. Still—I can’t look at him without wanting to close the gap.”\n\nSeyfert did take him. Solvik filed the extraction order under the euphemism of “promotion”: “His loss in-field would represent irreparable opportunity cost. Immediate removal required. By the time they notice he’s gone, Seyfert will already own the story, the patents, and the legacy.”\n\nDr. Myrren received him on the orbital facility, her intake record betraying barely restrained hunger: “Not monstrous. Perfected. His body is flawless, balanced, a weapon disguised as a male. Seyfert believes he is under control. They are wrong. Control is a fantasy.”",
    },
    {
      title: "The Official Record",
      body:
        "Archivist Leira Veyl filed the last word, scrubbing the logs into propaganda:\n\n“From miner’s son to Seyfert’s chosen—Tundra embodies the triumph of perseverance and the boundless potential of human advancement. His service ensures the continued prosperity and security of all Seyfert colonies.”\n\nEverything else—Viklund’s warnings, Otten’s risk bulletins, Corval’s forbidden desire, Myrren’s trembling awe—was sealed, redacted, buried.\n\nIn the open record, he was a promising miner elevated to “special duty.”\n\nIn the truth of the logs, he was White Maw. The Maw’s gift. The weapon Seyfert thought it could cage.",
    },
  ],
  logs: tundraSeyfert.logs,
};
