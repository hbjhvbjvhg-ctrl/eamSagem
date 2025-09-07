import api from '../api/client';
import { User } from '../types/User';

export interface UserResponse {
  id: number;
  email: string;
  role: string;
  phone?: string;
  cin?: string;
  department?: string;
  status: string;
  avatar?: string;
  lastLogin?: string;
}

export const userService = {
  // Récupérer tous les utilisateurs (selon les permissions)
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<UserResponse[]>('/user/retrieve-all-users');
      return response.data.map(this.mapUserResponse);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  },

  // Récupérer un utilisateur par ID
  async getUserById(id: number): Promise<User | null> {
    try {
      const response = await api.get<UserResponse>(`/user/retrieve-user/${id}`);
      return this.mapUserResponse(response.data);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      return null;
    }
  },

  // Ajouter un nouvel utilisateur
  async addUser(userData: Partial<User>): Promise<User> {
    try {
      const response = await api.post<UserResponse>('/user/add-user', userData);
      return this.mapUserResponse(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      throw error;
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(userData: User): Promise<User> {
    try {
      const response = await api.put<UserResponse>('/user/update-user', userData);
      return this.mapUserResponse(response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  },

  // Supprimer un utilisateur
  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/user/delete-user/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
      throw error;
    }
  },

  // Récupérer le profil de l'utilisateur connecté
  async getCurrentUserProfile(): Promise<User | null> {
    try {
      const response = await api.get<UserResponse>('/user/profile');
      return this.mapUserResponse(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return null;
    }
  },

  // Mettre à jour le profil de l'utilisateur connecté
  async updateOwnProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put<UserResponse>('/user/profile', userData);
      return this.mapUserResponse(response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  },

  // Mapper la réponse de l'API vers le type User du frontend
  mapUserResponse(userResponse: UserResponse): User {
    // Extraire le prénom et nom de l'email si pas fournis
    const emailParts = userResponse.email.split('@')[0].split('.');
    const firstName = emailParts[0] ? emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1) : '';
    const lastName = emailParts[1] ? emailParts[1].charAt(0).toUpperCase() + emailParts[1].slice(1) : '';

    // Formater la date de dernière connexion
    let lastLoginFormatted = 'Jamais';
    if (userResponse.lastLogin) {
      const lastLoginDate = new Date(userResponse.lastLogin);
      const now = new Date();
      const diffInMs = now.getTime() - lastLoginDate.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMinutes < 1) {
        lastLoginFormatted = 'À l\'instant';
      } else if (diffInMinutes < 60) {
        lastLoginFormatted = `Il y a ${diffInMinutes} min`;
      } else if (diffInHours < 24) {
        lastLoginFormatted = `Il y a ${diffInHours}h`;
      } else if (diffInDays < 7) {
        lastLoginFormatted = `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
      } else {
        lastLoginFormatted = lastLoginDate.toLocaleDateString('fr-FR');
      }
    }

    return {
      id: userResponse.id,
      email: userResponse.email,
      role: userResponse.role as any,
      phone: userResponse.phone,
      cin: userResponse.cin,
      department: userResponse.department as any,
      status: userResponse.status as any,
      avatar: userResponse.avatar,
      firstName,
      lastName,
      lastLogin: lastLoginFormatted
    };
  }
};

