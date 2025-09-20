import type { CharacterPageData } from "$lib/types/character";

const paragraphs = (text: string): string[] => text.trim().split(/\n\n+/);

export const tundraKarsvaldr: CharacterPageData = {
  hero: {
    name: "Tundra Karsvaldr",
    tagline: "White Maw. Asset. Weapon. Uncontained.",
  },
  dossier: {
    classificationLevel: "Orange",
    subject: "Independent Agent Operating Beyond Seyfert Int. Jurisdiction",
    fileOrigin: "Seyfert Systems Intelligence - Frontier Assets Division",
    lastUpdate: "2377.25.01-00:07 Rosche Standard",
    combatClass: "Close Quarters Cryo-kinetic",
    identification: {
      aliases: ["Tundra", "Frostbite", "Midwinter"],
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
    currentStatus: {
      status: "At Large",
      classification: "Orange",
      region: "Draumveil"
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
      employersOfRecord: ["Seyfert Systems"],
      contacts: ["None"],
      factionRelations: [
        { faction: "Seyfert Systems", relation: "Hostile" },
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
      reputationMarkers: ["Aggressive", "Lustful", "Risky", "Power-hungry"],
    },
    psych: {
      temperament: ["Volatile", "Passionate", "Aggressive", "Impetuous"],
      motivations: ["Power", "Lust", "Revenge", "Independence"],
      weaknesses: ["[REDACTED] dependence", "Sex", "Weakness", "Challenge"],
      evaluation:
        'Subject demonstrates high adaptability in uncertain theaters. Promise of power or "insurmountable" challenges are a draw. Use [REDACTED] dependence to corner, as necessary.',
    },
    threat: {
      combatRating: "Extreme",
      riskToAssets: "Severe",
      containmentOptions: ["Direct force", "Interdiction"],
      recommendation: "Capture, eliminate",
    },
    additionalNotes:
      '"The subject operates in theaters that promise him the highest opportunity for physical empowerment. Survival and success rates are anomalously high."',
  },
  history: [
    {
      title: "Origins",
      body: paragraphs(
        `The Maw's Gift: Private Notes of J. Corval.

Tundra Karsvaldr was born in Draumveil Crater Colony, the place miners call The Maw. His father dragged the family there from an agrarian outpost on Kearsarge IV. He wanted to prove himself in the veins, to win something more than dirt and wheat. The governor's office logged their arrival like it logs all arrivals: another family for the machine.

The Maw had no patience for pride. His father died young, marrow collapse before Tundra learned to read. I've seen dozens of such men--bodies emptied, spines bowed, eyes gone gray. But I wonder if the boy remembers his father at all, or if he remembers only absence.

His mother, Elin, lived on. Stronger than she let on. I've reviewed enough witness notes to know she was likely Cat-4, but she hid it. Avoided testing, kept to low-risk duties. People whispered, but whispers die in the Maw faster than men do. She carried the boy as best she could, quiet and steady, as if refusing to be noticed could shield him from the same fate.`
      ),
    },
    {
      title: "Childhood in the Maw",
      body: paragraphs(
        `At sixteen, he entered the shafts. It was inevitable; half-grown boys are pressed into full-grown work when quotas loom. Foreman Viklund wrote that he wouldn't last a month. The Maw eats boys like him.

But Tundra thrived. I've read the records a dozen times. He worked shifts that broke older men. Hauled double loads, lungs clear in vapor that sent others to their knees. His coat--pale, faintly blue under Tyrium lamps--earned him the first name the miners gave him: White Maw. At first a joke, then something heavier. A mark.

Even then, there was something uncanny. Vapor bending around him, dust clearing as though the air itself bent to his frame. Miners avoid the strange--they mock it, then they fear it. With him, fear took root quickly.

I tell myself I study these things professionally. That's why I pore over the early notes. But when I picture him at sixteen--already broadening, already different from the others--I find myself lingering too long. My pen drags. I shouldn't.`
      ),
    },
    {
      title: "The Marked Years",
      body: paragraphs(
        `By seventeen, the recruiters circled. Solvik wrote his oily little assessments, all "asset" and "dividends," as if Tundra were a number on a ledger. He recommended Rift Facility transfer. I should have felt relief--someone else's responsibility. But when the miners began speaking his name like a prayer, I leaned closer to their words.

White Maw. Not Cat-5, not anomaly. White Maw.

Viklund's reports from the Rift show the truth of it: Tundra worked longer, carried more, grew larger each week. Tools bent in his hands. Frost feathered steel where he braced. Crews followed him into the shafts, convinced his shadow protected them. Others fled his presence, muttering that he "stole their air."

I was assigned his handler then. Officially, I was to catalog rumors, keep a human ledger of what the data couldn't show. Unofficially--I began to watch him. And watching became something else.

He was taller than the Cat-4s, broader through the shoulders. Their strength looked swollen, unbalanced. His looked... natural. Beautiful. I use that word in my own notes, here, where no one will read it. His movements were clean, unhurried. He carried loads that should have left him staggering, and yet he moved with grace.

I began writing lines I deleted from the official files. "Not monstrous--perfected." "Balanced. A weapon disguised as a man." My hand shakes as I admit it, but it wasn't only fascination. It was hunger.`
      ),
    },
    {
      title: "The Unmanageable One",
      body: paragraphs(
        `At nineteen, he began asking for the Core. Not asking--demanding with silence, by stepping deeper than rules allowed, ignoring denials. Otten called him a containment hazard. Viklund surrendered, admitting no foreman could hold him. Solvik moved quickly to arrange his extraction, calling it "promotion."

And I--what did I write? That he was inevitable. That he was beautiful in the way avalanches are beautiful: merciless, impossible to stop, impossible not to watch.

I remember the last weeks before they took him. The air shifted when he walked past, cold against my skin. My pulse quickened every time. I told myself it was fear. It wasn't. I dreamed of him. I dreamed of his strength close, of the frost on my lips, of his body against mine. And I woke ashamed, and wanting.

When Myrren wrote her intake report, I read it in secret. Her words trembled with the same distraction. She pretended it was scientific awe, but I recognized myself in her lines. Seyfert believes they own him, that they can cage him and catalog his power, breed him like stock. They don't see it. They don't feel it.

He isn't theirs. He never was. He isn't mine either, but I can't stop writing him into these pages. Every line of his history bends back toward me, toward the want I cannot silence.`
      ),
    },
    {
      title: "The Official Record",
      body: paragraphs(
        `In 2367, they erased him. Promoted to "special duty." Transferred to an orbital site. White Maw was stricken from the files. The archivists think they buried the truth.

But I remember. I keep him here, in these pages, where the company's reach cannot scrub him away.

And when I close my eyes, I see him still--broad-shouldered, cold-skinned, beautiful. The Maw's gift. The weapon Seyfert thought it could claim. The boy who grew into a man I was forbidden to touch.

The man I still burn for.`
      ),
    },
  ],
  timeline: [
    {
      title: "2348 - Birth",
      body: ["Born in Draumveil Crater Colony (The Maw), after family relocation from agrarian outpost on Kearsarge IV.", "Governor Ruun's perfunctory note approves family request."]
    },
    {
      title: "2353 (Age 5) - Father's Death",
      body: ["Haldor Karsvaldr, father, dies of Category-2 marrow collapse.", "Foreman Viklund logs the death with cold indifference."]
    },
    {
      title: "2354–2363 (Ages 6–15) – Mother Conceals Category-4 Potential",
      body: ["Elin Karsvaldr, mother, works low-risk jobs, avoids testing.", "Corval later notes: /“She stayed small so he could grow./”"]
    },
    {
      title: "2364 (Age 16) – Labor Assignment",
      body: ["Tundra cleared for mine duty. Viklund skeptical: /“If he lasts a month, I’ll be surprised./”", "First signs of unusual strength, endurance, and vapor displacement observed within the year."]
    },
    {
      title: "2365 (Age 17) – Category-5 Suspicions",
      body: ["Recruiter Solvik files “whisper file” noting anomalous performance.", "Miners begin calling him White Maw. Rumors spread in lifts and shafts."]
    },
    {
      title: "2366 (Age 18) – Formal Recruitment",
      body: ["Solvik recommends full reclassification to Category 5 and transfer to Rift Facility.", "Viklund’s logs note rapid growth, frost anomalies, and increasing crew unrest.", "Corval’s reports turn personal, noting his beauty, presence, and the danger of attachment."]
    },
    {
      title: "2367 (Age 19) – The Rift Years End",
      body: [
        "Tundra’s fixation on the Core escalates. Security Chief Otten issues risk bulletins.",
        "Viklund concedes control is lost. Corval’s restricted entries verge on lustful obsession.",
        "Solvik files Extraction Order; Tundra removed under guise of promotion.",
        "Dr. Myrren intake record on orbital facility notes: /“Seyfert believes he is under control. They are wrong. Control is a fantasy./”",
        "Archivist Veyl erases the trail, replacing it with propaganda.",
        "Last known record: 2367. Files go silent."
      ]
    }
  ],
  logs: [
    {
      id: 1,
      title: "Admission Record (Governor Ruun)",
      filedBy: "Governor Ruun",
      date: "[Unknown]",
      body: `**Filed:** Maw Colony Registry
**Subject:** Unidentified Juvenile Male

**Entry:**
Admission follows Seyfert recovery detail. Derelict freighter encountered at grid 19-7 drift, vessel gutted by pirate action. One survivor extracted: male, approximately six cycles in age. No genetic record. No parentage traceable. No identifying insignia recovered from ship’s remains.

Per Seyfert directive, survivor declared ward of Maw Colony under colonial governance. Medical scan clears for habitation. Rations set at standard juvenile allotment, no supplement. Assigned berth within Maw Youth Block C. Social oversight waived; no kin ties requiring placement.

Projected labor eligibility in ten cycles. Subject will be tracked only for caloric balance and health incident reporting.

No further annotation required.`,
    },
    {
      id: 2,
      title: "Orphan Record (Foreman Viklund)",
      filedBy: "Foreman Viklund",
      date: "[Unknown]",
      body: `**Filed:** Maw Colony Labor Registry
**Subject:** Juvenile Male, Ward of Seyfert

**Entry:**
Age: seven cycles.
Guardian status: none. No inquiries received.
Behavioral report: quiet, compliant, engages minimally with other wards.
Disciplinary incidents: none recorded.
Nutritional demand: average. No deviations from rations.
Physical examination: healthy, weight and height within colony norms. No congenital markers.
Projected assignment: ready for labor evaluation at cycle sixteen. No preparatory concern noted.

Monitoring frequency reduced to annual assessment until clearance for shaft duty.

Filed without special note.`,
    },
    {
      id: 3,
      title: "Handler’s Retrospective (Corval)",
      filedBy: "Handler Corval",
      date: "[Unknown]",
      body: `**Filed:** Maw Personnel Review
**Subject:** Juvenile Male, now classified Cat-5

**Entry:**
I pulled the intake record today—those first lines from Ruun and Viklund. A boy with no kin, no name, just drifted here like slag from Seyfert’s nets. Six cycles old, handed over without thought, placed in Block C like ore waiting for the smelter.

Most who come through the Maw are tethered—family lines, debts, at least a surname etched into the registry. This one had nothing. No anchor, no thread to bind him to anything but Seyfert’s writ and the Maw’s appetite. I think that made him different long before the stripes showed.

Among the crews, they laughed: “Maw-blooded, bred straight from the pit.” But not all the laughs sounded true. Some were uneasy, as if they suspected the joke was less a jest than a warning.

Looking back, I wonder if the Maw had already claimed him before he ever touched a pick.

> *Margin:* “Alone, he belongs to nothing—except what will consume him.”`,
    },
    {
      id: 4,
      title: "Labor Clearance (Foreman Viklund)",
      filedBy: "Foreman Viklund",
      date: "[Unknown]",
      body: `**Filed:** Maw Colony Labor Registry
**Subject:** Tundra – Juvenile Male, Ward of Seyfert

**Entry:**
Age: sixteen cycles.
Cleared for shaft duty effective immediately.
Physical exam: wiry build, clean lungs, steady vitals. Fit for cart work and tunnel runs.
No prior incidents. No kin claimants.
Assigned shift rotation: B-shaft, cart relay, ore haul.

Notes: nothing exceptional. First cycle in shaft will determine durability. No medical exemption or deferment warranted.

Filed and stamped.

> *Margin:* “First shift will tell if he’s meat or iron.”`,
    },
    {
      id: 5,
      title: "First Anomaly (Foreman Viklund)",
      filedBy: "Foreman Viklund",
      date: "[Unknown]",
      body: `**Filed:** Maw Colony Labor Registry
**Subject:** Tundra – Shaft Worker, B-shaft rotation

**Entry:**
Shift length: fourteen hours continuous. Subject displayed no fatigue, no respiratory strain, no collapse. Crew reports he worked beyond rotation without pause.
Physique: frame leaner than others, yet strength exceeded load expectations.
Dermal change: pale fur beginning to stripe through with cobalt-blue bands along shoulders and flank.
Environmental anomaly: in shaft conditions, vapor flows inward—drawn into the stripes. Outside shaft, vapor seeps outward, faint mist in his wake.

Crew response: unsettled. No complaint filed, but whispers spreading.

Filed with concern marker.

> *Margin:* “Maw’s got its claws in him.”`,
    },
    {
      id: 6,
      title: "Whisper File (Solvik, Recruiter)",
      filedBy: "Recruiter Solvik",
      date: "[Unknown]",
      body: `**Filed:** Seyfert Internal Channels
**Subject:** Tundra – Maw Shaft Worker, anomaly under observation

**Entry:**
Preliminary assessment: anomaly is not degradation. Observed dermal stripes act as conduits. Tyrium vapor flows inward under load—strengthening, not weakening. Subject’s stamina exceeds human metrics. No collapse, no crash.

Crew terminology emerging: “White Maw.” Rumor suggests the pit itself feeds him. Miners whisper it in half-fear, half-reverence. Nickname spreading faster than suppression can hold.

Recommendation: escalate classification review. Category-5 suspicion warranted. Subject should not remain in standard shaft rotation—risk of uncontrolled myth-making among crews.

Filed under personal advisement for priority handling.

> *Margin:* “If the Maw would devour him, better Seyfert devour first.”`,
    },
    {
      id: 7,
      title: "Recruitment Recommendation (Solvik, Recruiter)",
      filedBy: "Recruiter Solvik",
      date: "[Unknown]",
      body: `**Filed:** Seyfert Reclassification Dossier
**Subject:** Tundra – Maw Shaft Worker, alias “White Maw”

**Entry / Recommendation:**
**Classification recommendation:** Category-5.
Age: seventeen cycles. Frame broadening beyond Cat-4 parameters—hypertrophy evident, mass and leverage surpassing shaft norms.
Observed performance: ore-loads moved without team support, collapse points cleared without relay. Stamina appears limitless within shaft environment.

Crew reaction: divided. Some cling to him, loyal beyond reason. Others keep distance, report unease, request reassignment. “White Maw” nickname now common currency. Attempts to suppress usage unsuccessful.

Assessment: subject represents more than labor. He embodies the Maw itself—a living claw carved from Tyrium and hunger. Crews respond to him as they would to a force, not a man.

**Recommendation:** immediate transfer from shaft to Seyfert custody. Continued exposure risks solidifying his myth among miners. Potential for controlled deployment: military, extraction, biopharma.

Filed with urgency for review.`,
    },
    {
      id: 8,
      title: "Rift Report (Foreman Viklund)",
      filedBy: "Foreman Viklund",
      date: "[Unknown]",
      body: `**Filed:** Maw Colony Labor Registry, Rift Assignment
**Subject:** Tundra – Reclassified Cat-5

**Entry:**
Age: eighteen cycles. Stationed to Rift Facility.
Physical condition: rapid alteration beyond recorded parameters. Spinal ridges crystallizing blue, sharp to touch, luminous in dim shaft light. Elbow joints hardening into crystalline protrusions. Mandible lengthened—canines extended into saber fangs, exhaling steady vapor. Claw growth extreme, keratin darkened to obsidian sheen.

Environmental anomaly: frost condenses around him. Air grows brittle in his presence. Tools left in proximity rim with ice.
Behavioral note: refuses issued clothing, accepts only harness and load rig. Carries himself hunched, frame immense, yet when he rises to full height crews fall silent.

Crew response: mixture of terror and fascination. No mutiny reported, but discipline tenuous. Some trail him willingly; others look for any excuse to avoid the Rift rotation.

Filed with unease.

> *Margin:* “Not man, not miner. Maw shapes him into something else—and the rest of us watch.”`,
    },
    {
      id: 9,
      title: "Folk Report (Corval, Handler)",
      filedBy: "Handler Corval",
      date: "[Unknown]",
      body: `**Filed:** Maw Personnel Supplement
**Subject:** Tundra – Rift Worker, alias “White Maw”

**Entry:**
Compiled from crew chatter and my own observation. Rumors persist that he is not merely surviving the Maw but feeding on it. Men claim the vapor runs into his stripes like breath into lungs. Others say he “eats the cold” itself.

Division among crews grows sharper: some follow his lead in silence, eyes fixed on him as though he were foreman and core both. Others turn away, request transfer, mutter about curses.

Recorded observation: his frame broadens with unnatural symmetry—shoulders ridged with crystal, muscles swelling hard as the stone he tears apart. The blue striping along his hide glows faintly in darkness, vapor tracing patterns across him like breath across frost. His fangs drip mist, his eyes catch every gleam of Tyrium light and hold it until you feel caught yourself. When he moves through the caverns, the air sharpens; tools crack with ice, and yet he burns with impossible vitality.

**Private note:** I met him once in the caverns, against protocol. I told myself it was duty—direct study—but it was not. I had to see him without the crew, had to stand close enough to hear the low growl of vapor in his chest. He looked at me, not as handler or overseer, but as if I were nothing at all—and I have never felt more seen.

Filed for record, though words fail.

> *Margin:* “I was sent to watch him, but I find myself unable to stay away.”`,
    },
    {
      id: 10,
      title: "Bio-Kinetic Report (Dr. Myrren)",
      filedBy: "Dr. Myrren",
      date: "[Unknown]",
      body: `**Filed:** Seyfert Rift Facility – Research Division
**Subject:** Tundra – Cat-5 anomaly, alias “White Maw”

**Metrics logged across multiple sessions:**
- Skeletal hypertrophy balanced, no sign of strain fractures. Muscle mass doubling within months yet maintaining proportion.
- Reflex tests surpass Cat-5 thresholds—reaction time closer to predictive than responsive.
- Frost bleed measurable at two-meter radius: surface temperature drops, moisture crystallizes in ambient air. Vapor emission constant at rest, intensifies under stress.

**Cognitive:** Cognitive acceleration noted. Pattern recognition trials solved before full data presented. Problem-solving speed erratic but staggering—jumps from silence to insight, bypassing steps entirely.

**Physical profile:** spine crowned with crystalline ridges, glowing faintly in shaft dark. Claws harder than alloy implements; fangs emit vapor steady as breath. Blue striping no longer confined—networks the whole frame, pulsing faintly with Tyrium resonance.

**Personal note (unfiled draft fragment preserved):** He is not monstrous. He is perfected. Others look for corruption or deformity, but I see symmetry, convergence. The Maw has crowned him in crystal and frost, shaped him as its sovereign. Seyfert calls him asset. They do not understand—he is coronation.`,
    },
    {
      id: 11,
      title: "Security Risk Bulletin (Otten, Security Chief)",
      filedBy: "Security Chief Otten",
      date: "[Unknown]",
      body: `**Filed:** Seyfert Security Division
**Subject:** Tundra – Cat-5 anomaly, alias “White Maw”

**Incident Summary:**
Subject repeatedly penetrates restricted tunnels leading toward the Rift Core. Bypassed three mechanical locks and one coded seal. No evidence of forced entry. Recovered each time without resistance, returned to shaft rotation as if nothing occurred.

**Behavioral Note:**
Speaks of the Core as if it summons him. Statements recorded: “It calls,” “I hear it,” “The Maw wants me below.” Subject unresponsive to reprimand. Obeys tasking when observed, but deviates as soon as surveillance relaxes.

**Risk Assessment:**
Subject fixation on Core represents catastrophic hazard. Crew discipline compromised—some follow his lead without order, others refuse duty outright. Containment threshold exceeded.

**Recommendation:**
Escalation to Seyfert command. If subject continues breaching Core access, standard facility security protocol insufficient.`,
    },
    {
      id: 12,
      title: "Complaint Report (Foreman Viklund)",
      filedBy: "Foreman Viklund",
      date: "[Unknown]",
      body: `**Filed:** Maw Colony Labor Registry, Rift Facility
**Subject:** Tundra – Cat-5 anomaly

**Entry:**
Crew division worsening. Half follow his lead in silence, the other half beg transfer.
Subject obeys orders when spoken, but continues breaching limits.
Strains ore-haul beyond regulation weight.
Moves through restricted tunnels without clearance. Returns without explanation.
Physical dimensions now beyond crew restraint. Too large, too strong.
Command authority no longer effective. If Seyfert wants him, they can come take him.

Filed under protest.

> *Margin:* “We are done breaking ourselves on him.”`,
    },
    {
      id: 13,
      title: "Handler’s Addendum (Corval)",
      filedBy: "Handler Corval",
      date: "[Unknown]",
      body: `**Filed:** Supplementary Note – Maw Personnel
**Subject:** Tundra – alias “White Maw”

**Entry (personal / confessional):**
The records say he is monstrous: ridges glowing, claws that split stone, fangs forever dripping vapor. But those words are scaffolding, not truth. The truth is what happens when the cavern closes around us and no one is there to watch. Against every regulation, I return to him. I tell myself I go for study, for insight, but the lie grows thinner each time.

When he draws me close, I feel the Tyrium moving in him, and then—impossibly—through me. It is cold and burning, venom and ecstasy both. For a breathless instant I feel perfect, like I belong to the Maw’s will as much as he does. And afterward comes the horror, knowing it is not leaving me.

I hide it as best I can, but I see it: faint streaks of cobalt in my own fur, glowing when the cavern darkens, shimmering just like his. I cover them, I deny them, but they spread.

I know this is corruption. I know I should be afraid. And yet when I feel the Maw inside me, I am glad.

> *Margin:* “I am becoming what I was sent to observe.”`,
    },
    {
      id: 14,
      title: "Extraction Order (Solvik, Recruiter)",
      filedBy: "Recruiter Solvik",
      date: "[Unknown]",
      body: `**Filed:** Seyfert Priority Command
**Subject:** Tundra – alias “White Maw”

**Summary:**
Subject fixation on Core now critical. Multiple breaches of restricted tunnels. Security measures ineffective—locks bypassed without trace. Crew enthrallment documented. Several workers reported missing; survivors exhibit behavioral alteration consistent with fixation on subject.

**Risk Assessment:**
Subject uncontainable within Rift environment. Crew productivity collapsing under division: loyalty, fear, worship. Reports from Handler Corval increasingly compromised—language unprofessional, suggestive of contamination. Recommend removal before further personnel degradation.

**Opportunity Statement:**
Extraction offers immediate research pathways. Subject demonstrates unique Tyrium metabolization; body not degraded but enhanced. Potential military application—shock trooper template. Potential biopharma extraction—augmentative therapies.

**Recommendation:**
Immediate retrieval to orbital facility. Subject to be secured, studied, and if viable, replicated. Delay increases risk of full Maw integration.

Filed urgent.

> *Margin:* “Harvest before the Maw finishes its work.”`,
    },
    {
      id: 15,
      title: "Intake Record (Dr. Myrren)",
      filedBy: "Dr. Myrren",
      date: "[Unknown]",
      body: `**Filed:** Seyfert Orbital Facility, Research Division
**Subject:** Tundra – alias “White Maw”

**Entry / Measurements:**
Measurements taken on arrival. Height exceeds projection by 0.3 meters. Mass denser than expected—musculature hypertrophied but balanced. Dermal ridges luminous with Tyrium resonance, claw keratin harder than tested alloys. Fangs extend beyond safe restraint—containment protocols modified.

Ambient effect: temperature within five meters drops to freezing. Surfaces rimmed in frost. Vitals unaffected. Subject inhales vapor in measured rhythm; exhalation forms visible plume.

**Cognitive testing:**
Accelerated beyond Cat-5 baseline. Pattern recognition instantaneous. Displays ability to infer outcomes with minimal data. Refuses standard language trials; answers selectively, often in metaphor. Statements recorded: “I will return to the Maw,” and, “It waits.”

**Research conclusion:**
Seyfert labels this deformity. It is not. It is coronation. Subject is not accident but culmination. The Maw crowned him in frost and crystal, and we stole him from his kingdom. We did not interrupt corruption. We interrupted ascension.

Filed under Level-3 clearance. Portions redacted.

> *Margin (official):* “Subject represents severe security risk. Do not romanticize.”
> *Margin (unauthorized, hand-scribbled):* “Corval seen within observation chamber. Her stripes glow now too. She watches him as if already his.”`,
    },
    {
      id: 16,
      title: "Public Record (Archivist Veyl) & Hidden Fragment (Corval)",
      filedBy: "Archivist Veyl / Handler Corval",
      date: "[Unknown]",
      body: `**Filed:** Seyfert Orbital Archive
**Subject:** Tundra – alias stricken

**Public statement:**
A promising miner of Maw Colony has been promoted to special duty in Seyfert service. His record of discipline and endurance exemplifies the strength of Maw stock and the reliability of Seyfert oversight.

Rumors of Tyrium corruption or anomalous alteration are without merit. Such tales are common in the caverns and should be regarded as superstition. Alias “White Maw” has been officially removed from registry; dissemination of such terms will be treated as insubordination.

This record stands as the definitive account. Future generations will see no fractures, no divergence, only the proper ascent of a worker into Seyfert service.

Filed, sealed, and archived.

---

**Filed:** Not in official registry. Retrieved fragment.
**Subject:** Tundra – my White Maw

**Fragment (confession / plan):**
They have taken him from the Rift, from the cold throne where he belonged. In their hands he is diminished—still vast, still radiant, but caged, trimmed into something obedient. They parade him as weapon, speak of him as asset. The Maw’s beast, Seyfert’s blade.

But I remember what he was in the caverns, when the vapor flowed through us both. I can still feel it, even now. It burns under my skin, traces of cobalt showing in my own fur. I bind them, cover them, but they spread. The Maw is in me. He put it there.

When I see him through the glass, he is no longer the sovereign the Rift crowned. They have shackled his will, broken the terrible majesty that made men vanish and others kneel. He obeys. He answers. He does not look at me as he once did.

Still—I will not leave him to them. I will free him, tear down the walls, return him to the Maw. Back to what he is meant to be. Back to what we are meant to be.

But a fear gnaws at me. What if he does not follow? What if he will not come? I tell myself the Maw’s will is inevitable, that he is mine, but when I close my eyes I see him looking past me, beyond me, back toward the Rift. And in that gaze, I know: if I bring him out, it will not be for me.

Still—I will do it. I have no choice. He is inevitable. And if he will not be mine, then at least he will be the Maw’s again.

> *Margin (smudged, half-erased):* “I love him. Or I love what the Maw made of him. Perhaps there is no difference.”`,
    },
  ],
};
