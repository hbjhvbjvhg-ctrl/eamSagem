export enum Statut {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  TERMINÉ = 'TERMINÉ',
  ANNULÉ = 'ANNULÉ'
}

export enum Priorite {
  BASSE = 'BASSE',
  NORMALE = 'NORMALE',
  HAUTE = 'HAUTE',
  CRITIQUE = 'CRITIQUE'
}

export interface Intervention {
  id: number;
  titre: string;
  description: string;
  dateCreation: string;
  priorité: Priorite;
  statut: Statut;
  rapport?: string;
  dateIntervention?: string;
  ordreTravailId?: number;
}

