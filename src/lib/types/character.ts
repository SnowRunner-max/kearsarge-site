export type DossierIdentification = {
  aliases: string[];
  speciesOrigin: string;
  ageRange: string;
  gender: string;
  appearance: {
    height: string;
    weight: string;
    build: string;
    furPattern: string;
    augmentations: string;
    cybernetics: string;
    attire: string;
  };
};

export type DossierVessel = {
  shipClass: string;
  designation: string;
  registryStatus: string;
  capabilities: {
    ftlStatus: string;
    weapons: string[];
    systems: string[];
  };
  maintenanceCondition: string;
};

export type DossierAffiliations = {
  employersOfRecord: string[];
  contacts: string[];
  factionRelations: { faction: string; relation: string }[];
};

export type DossierOperational = {
  notableEngagements: string;
  specializations: string[];
  confirmedKills: string;
  reputationMarkers: string[];
};

export type DossierPsych = {
  temperament: string[];
  motivations: string[];
  weaknesses: string[];
  evaluation: string;
};

export type DossierThreat = {
  combatRating: string;
  riskToAssets: string;
  containmentOptions: string[];
  recommendation: string;
};

export type Dossier = {
  classificationLevel: string;
  subject: string;
  fileOrigin: string;
  lastUpdate: string;
  combatClass: string;
  currentStatus: currentStatus;
  identification: DossierIdentification;
  vessel: DossierVessel;
  affiliations: DossierAffiliations;
  operational: DossierOperational;
  psych: DossierPsych;
  threat: DossierThreat;
  additionalNotes?: string;
};

export type currentStatus = {
  status: string;
  classification: string;
  region: string;
}

export type HistorySection = {
  title: string;
  body: string;
};

export type LogEntry = {
  id: number;
  title: string;
  filedBy: string;
  date: string;
  body: string;
};

export type CharacterPageData = {
  hero: {
    name: string;
    tagline?: string;
  };
  dossier: Dossier;
  history: HistorySection[];
  logs: LogEntry[];
};
