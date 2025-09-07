// Rôles disponibles dans le backend
export enum Role {
  CHEFOP = 'CHEFOP',
  ADMIN = 'ADMIN',
  CHEFTECH = 'CHEFTECH',
  TECHNICIEN = 'TECHNICIEN'
}

// Configuration des redirections par rôle
export const roleRedirections: Record<Role, string> = {
  [Role.ADMIN]: '/admin-dashboard',
  [Role.CHEFOP]: '/operations-dashboard',
  [Role.CHEFTECH]: '/technical-dashboard',
  [Role.TECHNICIEN]: '/technician-dashboard'
};

// Fonction pour obtenir l'URL de redirection basée sur le rôle
export const getRedirectUrlByRole = (role: string): string => {
  const userRole = role as Role;
  return roleRedirections[userRole] || '/welcome';
};

// Fonction pour vérifier si un rôle est valide
export const isValidRole = (role: string): role is Role => {
  return Object.values(Role).includes(role as Role);
};

