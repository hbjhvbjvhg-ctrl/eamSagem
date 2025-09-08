export enum TypePlanning {
  JOURNALIER = 'JOURNALIER',
  HEBDOMADAIRE = 'HEBDOMADAIRE',
  MENSUEL = 'MENSUEL',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Planning {
  id: number;
  dateDebut: string;
  dateFin: string;
  typePlanning: TypePlanning;
  department?: string;
}

