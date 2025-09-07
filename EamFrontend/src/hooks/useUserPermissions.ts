import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role?: string;
  department?: string;
  userId?: number;
  email?: string;
}

interface UserPermissions {
  canViewAllUsers: boolean;
  canViewDepartmentUsers: boolean;
  canAddUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canExportUsers: boolean;
  userRole: string | null;
  userDepartment: string | null;
}

export const useUserPermissions = (): UserPermissions => {
  const [permissions, setPermissions] = useState<UserPermissions>({
    canViewAllUsers: false,
    canViewDepartmentUsers: false,
    canAddUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canExportUsers: false,
    userRole: null,
    userDepartment: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const role = decoded.role;
      const department = decoded.department;

      const newPermissions: UserPermissions = {
        canViewAllUsers: role === 'ADMIN',
        canViewDepartmentUsers: ['ADMIN', 'CHEFOP', 'CHEFTECH'].includes(role || ''),
        canAddUsers: ['ADMIN', 'CHEFOP'].includes(role || ''),
        canEditUsers: ['ADMIN', 'CHEFOP'].includes(role || ''),
        canDeleteUsers: role === 'ADMIN',
        canExportUsers: ['ADMIN', 'CHEFOP', 'CHEFTECH'].includes(role || ''),
        userRole: role || null,
        userDepartment: department || null,
      };

      setPermissions(newPermissions);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
    }
  }, []);

  return permissions;
};

