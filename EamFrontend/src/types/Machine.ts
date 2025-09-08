export enum MachineStatut {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  TERMINÉ = 'TERMINÉ',
  ANNULÉ = 'ANNULÉ'
}

export interface Machine {
  id: number;
  emplacement: string;
  statut: MachineStatut;
  type: string;
  dateDernièreMaintenance: string;
  dateProchaineMainenance: string;
  nom: string;
  // Odoo fields ignored in UI for now
}

