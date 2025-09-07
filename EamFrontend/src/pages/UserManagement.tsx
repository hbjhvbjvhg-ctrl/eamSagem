import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, Role, DepartmentType, StatusType } from '../types/User';
import { userService } from '../services/userService';
import { useUserPermissions } from '../hooks/useUserPermissions';
import './UserManagement.css';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Hook pour les permissions utilisateur
  const permissions = useUserPermissions();

  // Charger les utilisateurs depuis l'API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (err: any) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      setError(err.response?.data?.message || 'Erreur lors du chargement des utilisateurs');
      
      // Fallback vers les données mock en cas d'erreur
      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Mock data pour le développement initial (fallback)
  const mockUsers: User[] = [
    {
      id: 1,
      email: 'marie.dubois@sagemcom.com',
      role: Role.CHEFOP,
      phone: '+33 1 23 45 67 89',
      cin: 'AB123456',
      department: DepartmentType.PRODUCTION,
      status: StatusType.ACTIVE,
      lastLogin: 'Il y a 5 min',
      firstName: 'Marie',
      lastName: 'Dubois'
    },
    {
      id: 2,
      email: 'pierre.martin@sagemcom.com',
      role: Role.CHEFTECH,
      phone: '+33 1 23 45 67 90',
      cin: 'CD789012',
      department: DepartmentType.MAINTENANCE,
      status: StatusType.ACTIVE,
      lastLogin: 'Il y a 12 min',
      firstName: 'Pierre',
      lastName: 'Martin'
    },
    {
      id: 3,
      email: 'sophie.leroy@sagemcom.com',
      role: Role.TECHNICIEN,
      phone: '+33 1 23 45 67 91',
      cin: 'EF345678',
      department: DepartmentType.MAINTENANCE,
      status: StatusType.ACTIVE,
      lastLogin: 'Il y a 1h',
      firstName: 'Sophie',
      lastName: 'Leroy'
    },
    {
      id: 4,
      email: 'jean.dupont@sagemcom.com',
      role: Role.TECHNICIEN,
      phone: '+33 1 23 45 67 92',
      cin: 'GH901234',
      department: DepartmentType.PRODUCTION,
      status: StatusType.INACTIVE,
      lastLogin: 'Il y a 2 jours',
      firstName: 'Jean',
      lastName: 'Dupont'
    },
    {
      id: 5,
      email: 'isabelle.moreau@sagemcom.com',
      role: Role.ADMIN,
      phone: '+33 1 23 45 67 93',
      cin: 'IJ567890',
      department: DepartmentType.LOGISTIQUE,
      status: StatusType.PENDING,
      lastLogin: 'Jamais',
      firstName: 'Isabelle',
      lastName: 'Moreau'
    },
    {
      id: 6,
      email: 'thomas.bernard@sagemcom.com',
      role: Role.CHEFOP,
      phone: '+33 1 23 45 67 94',
      cin: 'KL123456',
      department: DepartmentType.PRODUCTION,
      status: StatusType.ACTIVE,
      lastLogin: 'Il y a 2h',
      firstName: 'Thomas',
      lastName: 'Bernard'
    }
  ];

  const getRoleColor = (role: Role): string => {
    switch (role) {
      case Role.ADMIN:
        return '#ef4444'; // Rouge
      case Role.CHEFOP:
        return '#3b82f6'; // Bleu
      case Role.CHEFTECH:
        return '#10b981'; // Vert
      case Role.TECHNICIEN:
        return '#f59e0b'; // Orange
      default:
        return '#6b7280'; // Gris
    }
  };

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case StatusType.ACTIVE:
        return '#10b981'; // Vert
      case StatusType.INACTIVE:
        return '#6b7280'; // Gris
      case StatusType.SUSPENDED:
        return '#ef4444'; // Rouge
      case StatusType.PENDING:
        return '#f59e0b'; // Orange
      case StatusType.ARCHIVED:
        return '#374151'; // Gris foncé
      default:
        return '#6b7280';
    }
  };

  const getRoleDisplayName = (role: Role): string => {
    switch (role) {
      case Role.ADMIN:
        return 'Administrateur';
      case Role.CHEFOP:
        return 'Chef Opérateur';
      case Role.CHEFTECH:
        return 'Chef Technicien';
      case Role.TECHNICIEN:
        return 'Technicien';
      default:
        return role;
    }
  };

  const getStatusDisplayName = (status: StatusType): string => {
    switch (status) {
      case StatusType.ACTIVE:
        return 'Actif';
      case StatusType.INACTIVE:
        return 'Inactif';
      case StatusType.SUSPENDED:
        return 'Suspendu';
      case StatusType.PENDING:
        return 'En attente';
      case StatusType.ARCHIVED:
        return 'Archivé';
      default:
        return status;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <Layout>
        <div className="user-management-loading">
          <div className="loading-spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="user-management-error">
          <div className="error-icon">⚠️</div>
          <h2>Erreur de chargement</h2>
          <p>{error}</p>
          <button onClick={loadUsers} className="retry-button">
            Réessayer
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="user-management">
        <div className="user-management-header">
          <div className="header-title">
            <h1>👥 Liste des utilisateurs</h1>
          </div>
          {permissions.canExportUsers && (
            <button className="export-button">
              📥 Exporter
            </button>
          )}
        </div>

        <div className="user-management-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Rechercher par nom, email ou département..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les rôles</option>
              <option value={Role.ADMIN}>Administrateur</option>
              <option value={Role.CHEFOP}>Chef Opérateur</option>
              <option value={Role.CHEFTECH}>Chef Technicien</option>
              <option value={Role.TECHNICIEN}>Technicien</option>
            </select>
          </div>

          <div className="filter-container">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les statuts</option>
              <option value={StatusType.ACTIVE}>Actif</option>
              <option value={StatusType.INACTIVE}>Inactif</option>
              <option value={StatusType.SUSPENDED}>Suspendu</option>
              <option value={StatusType.PENDING}>En attente</option>
              <option value={StatusType.ARCHIVED}>Archivé</option>
            </select>
          </div>

          <button className="filter-button">⚙️</button>
        </div>

        {/* Message d'information sur les permissions */}
        {!permissions.canViewAllUsers && permissions.canViewDepartmentUsers && (
          <div className="permissions-info">
            <p>
              ℹ️ Vous ne pouvez voir que les utilisateurs de votre département ({permissions.userDepartment})
            </p>
          </div>
        )}

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Contact</th>
                <th>Rôle</th>
                <th>Département</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="user-cell">
                    <div className="user-avatar">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                    <div className="user-info">
                      <div className="user-name">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="user-id">#{user.id}</div>
                    </div>
                  </td>
                  <td className="contact-cell">
                    <div className="contact-info">
                      <div className="email">📧 {user.email}</div>
                      <div className="phone">📞 {user.phone}</div>
                    </div>
                  </td>
                  <td className="role-cell">
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(user.role) }}
                    >
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="department-cell">
                    {user.department}
                  </td>
                  <td className="status-cell">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(user.status) }}
                    >
                      {getStatusDisplayName(user.status)}
                    </span>
                  </td>
                  <td className="last-login-cell">
                    {user.lastLogin}
                  </td>
                  <td className="actions-cell">
                    <button className="action-button">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="no-users">
            <p>Aucun utilisateur trouvé avec les critères de recherche actuels.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserManagement;

