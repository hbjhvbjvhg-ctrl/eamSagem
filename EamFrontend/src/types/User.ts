export enum Role {
  CHEFOP = 'CHEFOP',
  ADMIN = 'ADMIN',
  CHEFTECH = 'CHEFTECH',
  TECHNICIEN = 'TECHNICIEN'
}

export enum DepartmentType {
  PRODUCTION = 'PRODUCTION',
  MAINTENANCE = 'MAINTENANCE',
  QUALITÉ = 'QUALITÉ',
  LOGISTIQUE = 'LOGISTIQUE'
}

export enum StatusType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  ARCHIVED = 'ARCHIVED'
}

export interface User {
  id: number;
  email: string;
  role: Role;
  phone?: string;
  cin?: string;
  department?: DepartmentType;
  status: StatusType;
  avatar?: string;
  lastLogin?: string;
  firstName?: string;
  lastName?: string;
}

