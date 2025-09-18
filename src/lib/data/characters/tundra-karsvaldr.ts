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
      title: "Colony Admission Record",
      filedBy: "Governor Alvis Ruun, Draumveil Administration",
      date: "[REDACTED]",
      body:
        "### [LOG 1: COLONY ADMISSION RECORD]\n*Filed by:* Governor Alvis Ruun, Draumveil Administration\n*Date:* [REDACTED]\n\nFamily unit Karsvaldr admitted, origin agrarian outpost Kearsarge IV (belt sector). Father cites desire for advancement via Tyrium extraction. Approved without objection.\n\nNote: Housing allocated in Hab Block C, Level 2. No record of prior mining skill, but intake projections suggest labor sufficiency for Q3 quotas.\n\nMargin: Another eager family chasing fortune. The Maw will sort the worthy from the weak. Proceed.",
    },
    {
      id: 2,
      title: "Casualty Report",
      filedBy: "Foreman Korr Viklund, Shaft 7 Operations",
      date: "[REDACTED]",
      body:
        "### [LOG 2: CASUALTY REPORT]\n*Filed by:* Foreman Korr Viklund, Shaft 7 Operations \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Haldor. Male. Cat-2 collapse. \nDetails: Sudden marrow bleed during shift. Fell inside support tunnel. No recovery possible. \nDeath confirmed. Body tagged, transferred to Maw incineration unit. \n\nWife notified. Son too young to work quota. Reassign her to surface sorting until fit for heavier duty. \n\nMargin: Another one down. Ore takes who it wants. Quota unchanged. ",
    },
    {
      id: 3,
      title: "Personnel Annotation",
      filedBy: "Handler Jeyna Corval",
      date: "[Not listed]",
      body:
        "### [LOG 3: PERSONNEL ANNOTATION]\n*System:* Kearsarge HR – Worker Profile Update \n*Entered by:* Handler Jeyna Corval \n\nElin Karsvaldr, widow, Hab Block C-2. \nHas been flagged by neighbors for unusual strength during sorting shifts. Moves ore crates (≈180 kg) solo, no assist. Refuses all voluntary screenings, redirects herself to low-risk duties. \n\nNo escalation at this time. Likely concealment to avoid removal from dependent son. \n\nNote (personal): She works hard, keeps quiet. Never makes trouble unless others bring her up. Reads more like fear than deceit. Recommend leaving her be. ",
    },
    {
      id: 4,
      title: "Labor Assignment Entry",
      filedBy: "Foreman Korr Viklund",
      date: "[Not listed]",
      body:
        "### [LOG 4: LABOR ASSIGNMENT ENTRY]\n*System:* Kearsarge HR – Youth Intake \n*Entered by:* Foreman Korr Viklund \n\nSubject: Tundra Karsvaldr, 16. Cleared for shaft duty. \nAssigned to tunnel prep and ore cart haul. Frame light for quota, but lungs clean. \n\nWill check progress after 30 days. \n\nNote: Another boy swallowed by the Maw. Odds of lasting the year are poor. ",
    },
    {
      id: 5,
      title: "Incident Observation",
      filedBy: "Foreman Korr Viklund, Shaft 7 Operations",
      date: "[REDACTED]",
      body:
        "### [LOG 5: INCIDENT OBSERVATION]\n*Filed by:* Foreman Korr Viklund, Shaft 7 Operations \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra. Male. Age: 16. \nObservation: Shift ran 14 hours without rest. Subject hauled double cart loads alone. Dust levels red-zone, but respiration normal. Others flagged out. \n\nPhysical: Already broader than boys his age. Shoulders filling in like a man twice grown. Cart straps bite into the others—on him, they barely mark. Pale coat takes on a blue sheen under the lamps, stands out in the dark like frost. \n\nAssessment: Not standard. Doesn’t tire, doesn’t stumble. Something off. \nNo signs of ore-sickness. Vapor density bent oddly around him—looked like he was standing in clearer air. \n\nMargin: I don’t trust it. Father dropped in these tunnels, yet the boy looks carved out of stone. Feels wrong to write him up for being too strong, but the Maw doesn’t give gifts without a price. ",
    },
    {
      id: 6,
      title: "Whisper File – Potential Cat-5",
      filedBy: "Recruiter Daran Solvik, Seyfert Acquisition Division",
      date: "[REDACTED]",
      body:
        "### [LOG 6: WHISPER FILE – POTENTIAL CAT-5]\n*Filed by:* Recruiter Daran Solvik, Seyfert Acquisition Division \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra. Male. Age: 16–17. \nField Notes: Multiple confirmations from Shaft 7 foreman. Boy demonstrates sustained endurance in high-vapor environments, minimal fatigue, accelerated physical growth. Early whispers from crew call him “frost-born” for pale coat under lamps. \n\nAssessment: High-likelihood Category 5. Displays hallmark resistance and ore-phase displacement (vapor “bending”). Exceeds standard miner performance by factor ×2–3. \nRecommendation: Monitor discreetly. Delay formal classification until age 18 for smoother transfer optics. \n\nMargin: Promising find. If nurtured properly, could yield long-term dividends. If not, the Maw will eat him like the rest. Better Seyfert take the first bite. ",
    },
    {
      id: 7,
      title: "Recruitment Recommendation",
      filedBy: "Recruiter Daran Solvik",
      date: "[Not listed]",
      body:
        "### [LOG 7: RECRUITMENT RECOMMENDATION]\n*System:* Seyfert Acquisition Portal – Asset Intake Request \n*Filed by:* Recruiter Daran Solvik \n\nCandidate: Karsvaldr, Tundra (Draumveil Crater Colony). Age: 17. \nCurrent Assignment: Shaft 7, cart haul + tunnel prep. Performance well above peer group. Endurance ×3 average. Rapid hypertrophy noted. Vapor resistance confirmed. \n\nRecommended Action: Reclassify to Category 5. Transfer to Rift Facility within the year. Projected output: exceptional. \n\nRemarks: Local crews already attaching names—“frost-born,” “Godborn.” The mythology writes itself. Best to move before the stories grow teeth. \n\nAddendum: This one will make careers. Let’s make sure they’re ours. ",
    },
    {
      id: 8,
      title: "Shift Report – Rift Facility",
      filedBy: "Foreman Korr Viklund, Rift Ops (Drift C / Line 3)",
      date: "[REDACTED]",
      body:
        "### [LOG 8: SHIFT REPORT – RIFT FACILITY]\n*Filed by:* Foreman Korr Viklund, Rift Ops (Drift C / Line 3) \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra (Cat-5). \n\nThe boy runs longer than he should. Pulled a thirteen-hour shift today, break barely worth counting. Most men need two rotations in the vapor this thick. He doesn’t. When the rest are doubled over, coughing into the filters, he looks like he’s just got started. \n\nHe’s growing too. Came up from the Maw wiry. Two weeks here and the shirts are tight across his back. Hands big enough now to wrap around a pry bar and snap it—said the steel was flawed, but I’ve swung plenty of those bars myself. \n\nA few things worth recording proper: \n- **Cart load average:** 510–560 kg, peak haul ~590. Solo. \n- **Uniform reissue:** two sizes up since Rift arrival (17 days). \n- **Tool anomaly:** T-grade pry bar bent mid-shaft under pressure. Marked as tool failure but suspect strength factor. \n- **Atmos index:** 1.9 mS/m on monitors, red-band. He works it as if it were green. \n\nStrangest thing, though: the air changes when he moves. Vapor clears around him, just a shimmer, like the dust is pushed off his skin. Crew swears it feels colder in his wake. I thought it was nerves until I saw frost feather a valve collar he leaned on. Melted quick, but it was there. \n\nThe men have started calling him “Godborn.” I told them to cut it out, but words like that stick. Some stick close, want his shadow. Others won’t share a shaft with him. Two fights already—both blamed him for “crowding the air.” Nonsense, but you can’t argue with a miner’s gut. \n\nRecommendation: Acquisition should stop sniffing and make a call. He’s past the point of blending in. I can keep him on Line 3 a little longer, but every day he looks less like a worker and more like something the Maw didn’t mean to give us. \n\nMargin: Thirty years down here, I’ve seen the ore take plenty. Never saw it give anything back. Not till now. \n\n ",
    },
    {
      id: 9,
      title: "Folk Report – Colony Rumors",
      filedBy: "Handler Jeyna Corval, Seyfert Personnel Review",
      date: "[REDACTED]",
      body:
        "### [LOG 9: FOLK REPORT – COLONY RUMORS]\n*Filed by:* Handler Jeyna Corval, Seyfert Personnel Review \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra (Cat-5). \n\nCollected worker statements, Rift Facility: \n- \"White Maw walks past and the vapor folds down like dogs rolling belly-up.” \n- \"He don’t eat rations. He eats cold. That’s why the ore don\\'t bite him.” \n- \"Saw him lift a cart coupler clean off the track—three men strained and he did it like it was a child’s toy.” \n\nThe nickname White Maw has hardened into common use. No hesitation, no mockery. Even crew chiefs have used it in assignment chatter. \n\nCrew response diverges sharply. Some follow him like a living talisman, volunteering to work his shafts because “he takes the bad luck with him.” Others refuse proximity altogether, claiming they taste metal on their tongues when he’s near. \n\n*Personal Note (restricted): Among miners he stands apart, but not only for what he does. Even beside confirmed Cat-4, he outpaces them in frame, in bearing. Broader through the shoulders, taller now than most, and still growing. The pale of his coat under the Tyrium lamps makes him look carved from stone, cold-fire veins lit beneath. I’ve watched crews quiet when he enters a line, as if the shift itself bends to make room for him. And I admit—I quiet too. He carries size and presence that doesn’t belong to one so young. Seyfert calls him asset, subject, Cat-5. But in truth, he is beautiful, in the way avalanches are beautiful: inevitable, merciless, and impossible not to watch.*\n\nRecommendation: Maintain catalog of alias “White Maw.” Permit its spread; attempting to erase it will elevate it further.",
    },
    {
      id: 10,
      title: "Bio-Kinetic Observation Report",
      filedBy: "Dr. Ilsa Myrren, Seyfert Bio-Kinetics Division",
      date: "[REDACTED]",
      body:
        "### [LOG 10: BIO-KINETIC OBSERVATION REPORT]\n*Filed by:* Dr. Ilsa Myrren, Seyfert Bio-Kinetics Division \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra (Cat-5). \n\n**Physical progression (17–19 days post-transfer):**\n- Accelerated hypertrophy: recorded mass increase +11.8 kg, primarily lean tissue. \n- Reflex assessment (grapple rig): 0.21s average reaction, surpasses Cat-5 baseline median (0.36s). \n- Grip strength: exceeded calibrated dynamometer threshold (device fault suspected; requisitioned reinforced unit). \n- Respiratory samples: stable, no particulate scarring; hemoglobin affinity appears modified. \n- Ambient effect: repeatable 2–3 °C drop in immediate contact surfaces post-exertion. Minor frost deposition recorded, rapid dissipation. \n\n**Cognitive assessment:**\n- Pattern recognition accelerated: 96% success rate on lattice progression test, highest in current Rift cohort. \n- Short-term retention of numeric sequences (40+ digits) intact over 72h without decline. \n\n**Researcher Notes (restricted):** Subject diverges sharply from Cat-5 mean. Tyrium exposure does not degrade cellular function but appears to induce structural reinforcement. Muscular architecture suggests adaptive hypertrophy rather than degeneration. Unclear if we are observing unique mutation or a new subclass of Cat-5 altogether. \n\nPersonal aside (not for circulation): He does not present as monstrous. He presents as perfected. The body is not swollen or misshapen; it is balanced, efficient, and aesthetically striking. The symmetry of his form under Tyrium luminescence has drawn attention even among staff accustomed to anomalies. I caution myself to remain clinical—but it is difficult. \n\nRecommendation: Continue observation under Rift conditions. Escalation to central division review strongly advised before unsanctioned outcomes manifest.",
    },
    {
      id: 11,
      title: "Security Risk Bulletin",
      filedBy: "Chief Malrik Otten, Seyfert Black-Ops Security Division",
      date: "[REDACTED]",
      body:
        "### [LOG 11: SECURITY RISK BULLETIN]\n*Filed by:* Chief Malrik Otten, Seyfert Black-Ops Security Division \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra (Cat-5). Alias “White Maw.” \n\nSituation: Subject continues to request assignments closer to Rift Core. Formal denials ignored; he attempts deeper incursions regardless of posted limits. Two instances recorded of bypassing Level-3 locks (Line 3 and Line 5 access hatches). Intervention required on both occasions. Subject yielded without resistance but resumed pattern within 72h. \n\nObserved Behavior:\n- Fixation on “the Core.” Repeats inquiries to staff, handlers, miners. Language suggests belief in personal entitlement or destiny regarding Core access. \n- Refuses to acknowledge risk warnings. When confronted, maintains silence or states: “The Maw has more to give.” \n- Displays no overt aggression toward staff. However, physical capacity renders standard containment insufficient. Current restraint gear not tested against his demonstrated strength. \n\nAssessment: Subject’s behavioral trajectory constitutes a containment hazard. Noncompliance escalating toward insubordination. Core fixation presents risk of exposure to unshielded Tyrium concentrations. Unpredictable outcome. \n\nRecommendation: Immediate escalation to Extraction Protocol. Delay increases probability of breach or loss of subject control. \n\nMargin: He’s not hostile yet. That’s the problem. Hostility we can handle. Belief is harder.",
    },
    {
      id: 12,
      title: "Complaint Report and Addendum",
      filedBy: "Foreman Korr Viklund / Handler Jeyna Corval",
      date: "[REDACTED]",
      body:
        "### [LOG 12A: WORK CREW COMPLAINT REPORT]\n*Filed by:* Foreman Korr Viklund, Rift Ops (Line 3)\n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra (Cat-5, “White Maw”). \n\nHe does what he wants. I’ve denied him Core-side pulls three times this week; he goes anyway. Says nothing, just walks down into the red like the signs aren’t there. Crews follow him half the time. The other half they won’t even share a shaft with him. \n\nWe’re past the point of “managing” him. No chain of command holds. He listens, nods, then keeps moving. Can’t write him up—who’d enforce it? No one’s going to try and drag him back topside. \n\nI’ve logged tool failures, air anomalies, fights in the lift queues. All of it tied back to him, even if he never lifts a hand. He isn’t part of the crew anymore. He’s the reason the crew divides. \n\nRecommendation: Pull him before something snaps. He’s not mine to control, not anymore. \n\nMargin: If Seyfert wants him so bad, they can come take him. The Maw doesn’t answer to foremen. \n### [LOG 12B: HANDLER’S PERSONAL ADDENDUM]\n**Filed by:** Handler Jeyna Corval, Seyfert Personnel Review\n**Date:** [REDACTED] – Marked *restricted access*\n\nSubject: Karsvaldr, Tundra. Alias: White Maw. \n\nOfficially, I should echo Viklund’s report—yes, he disobeys, yes, he’s a risk. But when I watch him cross those barriers, I don’t see disobedience. I see inevitability. The rest of us skirt the Rift like mice at the edge of a fire. He steps into it like it belongs to him. \n\nHe isn’t just stronger than the Cat-4s, he outshines them. Taller, broader, balanced in a way the others never are. Their strength looks forced, distorted by strain. His looks natural—frighteningly so. The way he carries a cart or braces a collar, it isn’t just power. It’s grace. \n\nI won’t hide it: there’s pull there. When he passes, the air chills, but I burn hotter for it. I dream of him some nights, and I wake ashamed, knowing Seyfert would never permit it. Cat-5 bodies belong to the company, their blood harvested and matched for breeding like stock. And still—I can’t look at him without wanting to close the gap. \n\nThe men call him White Maw because they think the Rift spat him out. I think it shaped him on purpose. And I think if Seyfert tries to cage him, they’ll find it’s too late.",
    },
    {
      id: 13,
      title: "Extraction Order",
      filedBy: "Chief Malrik Otten, Seyfert Black-Ops Security Division",
      date: "[REDACTED]",
      body:
        "### [LOG 13: EXTRACTION ORDER]\n*Filed by:* Chief Malrik Otten, Seyfert Black-Ops Security Division\n*Date:* [REDACTED]\n\nSubject: Karsvaldr, Tundra (Cat-5). Alias “White Maw.”\n\n**Situation:** Subject continues to request assignments closer to Rift Core. Formal denials ignored; he attempts deeper incursions regardless of posted limits. Two instances recorded of bypassing Level-3 locks (Line 3 and Line 5 access hatches). Intervention required on both occasions. Subject yielded without resistance but resumed pattern within 72h.\n\n**Observed Behavior:**\n- Fixation on “the Core.” Repeats inquiries to staff, handlers, miners. Language suggests belief in personal entitlement or destiny regarding Core access.\n- Refuses to acknowledge risk warnings. When confronted, maintains silence or states: “The Maw has more to give.”\n- Displays no overt aggression toward staff. However, physical capacity renders standard containment insufficient. Current restraint gear not tested against his demonstrated strength.\n\n**Assessment:** Subject’s behavioral trajectory constitutes a containment hazard. Noncompliance escalating toward insubordination. Core fixation presents risk of exposure to unshielded Tyrium concentrations. Unpredictable outcome.\n\n**Recommendation:** Immediate escalation to *Extraction Protocol*. Delay increases probability of breach or loss of subject control.\n\n*Margin:* He’s not hostile yet. That’s the problem. Hostility we can handle. Belief is harder.",
    },
    {
      id: 14,
      title: "Intake Record – Orbital Facility Tallon",
      filedBy: "Dr. Ilsa Myrren, Seyfert Bio-Kinetics Division",
      date: "[REDACTED]",
      body:
        "### [LOG 14: INTAKE RECORD – ORBITAL FACILITY TALLON]\n*Filed by:* Dr. Ilsa Myrren, Seyfert Bio-Kinetics Division\n*Date:* [REDACTED]\n*Classification:* Strategic Priority \n\nSubject: Karsvaldr, Tundra. Alias: White Maw. Cat-5. \n**Initial Measurements:**\n- Height: 2.04 m (increase +6.3 cm since Rift records). \n- Mass: 143 kg (lean, hypertrophic). \n- Resting pulse: 42 bpm, stable. \n- Surface temperature differential: -1.7 °C vs. baseline human. \n- Notable anomaly: dermal luminescence at exertion thresholds. \n\n**Cognitive Readings:**\n- Memory lattice: 98% retention across 72h. \n- Problem-solving latency: ~40% faster than Cat-5 cohort mean. \n- Displays emergent abstraction: responds to scenario prompts with intuitive leaps rather than linear logic. \n\nResearcher Notes (restricted): His body is… flawless. Not misshapen or twisted, but sculpted, as if Tyrium shaped him with purpose. Strength evident in every movement, yet balanced, poised, a weapon disguised as a male. His presence alters the air of the chamber. I write this clinically, and yet—my hands tremble. \n\nThe cryo-kinetic traces are stronger here than reported. Objects retain frost where he touches them; instruments seize, fail, as though they shiver in his grip. He has not lashed out, not once, but the power is there, sleeping under the skin. Waiting. \n\nPersonal Aside (unauthorized): Seyfert believes he is under control. They are wrong. Control is a fantasy. His growth will not stop in these halls—it will devour them. I will see to it. Even now, as I catalogue his physiology, I want more than knowledge. I want to see how far his strength will climb, how cold the air can fall when he finally decides to open himself. The scientist in me whispers of patents and protocols. The woman in me wants to press closer, to feel the frost bite. \n\nRecommendation: Intensive observation, escalation of protocols. In truth: we are not studying a subject. We are standing in the presence of the weapon that will unravel AURORA itself.",
    },
    {
      id: 15,
      title: "Public Record – Strategic Communication Release",
      filedBy: "Archivist Leira Veyl, Seyfert Historical Division",
      date: "[REDACTED]",
      body:
        "### [LOG 15: PUBLIC RECORD – STRATEGIC COMMUNICATION RELEASE]\n*Filed by:* Archivist Leira Veyl, Seyfert Historical Division \n*Date:* [REDACTED] \n\nSubject: Karsvaldr, Tundra. \n\nSummary for Distribution: Tundra Karsvaldr distinguished himself early in life through discipline, loyalty, and an unshakable commitment to the work of Draumveil Crater Colony. Recognizing his exceptional fortitude, Seyfert Industries elevated him from local labor to special duty in the Rift Program. His transfer represents the highest standard of opportunity afforded to our most promising assets. \n\nOfficial Statement: \n\n“From miner’s son to Seyfert’s chosen—Tundra embodies the triumph of perseverance and the boundless potential of human advancement. His service ensures the continued prosperity and security of all Seyfert colonies.” \n\nNotes: Alias “White Maw” has been stricken from formal record. Circulation restricted. All associated documents folded into Level-7 archive [REDACTED]. Only approved narrative to be disseminated: loyal worker, promoted to special duty. \n\nMargin: Future readers will find no fractures in this story. They will know him only as a symbol of Seyfert’s vision. The rest—the fractures, the obsessions, the failures to contain—will stay sealed.",
    },
  ],
};
