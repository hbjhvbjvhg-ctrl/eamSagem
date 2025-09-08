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

export interface WorkOrder {
  id: number;
  titre: string;
  description: string;
  dateCreation: string;
  priorité: Priorite;
  department?: string;
  assignedTo?: number;
  statut: Statut;
}

