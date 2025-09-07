import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getRedirectUrlByRole } from '../utils/roleRedirection';
import { jwtDecode } from 'jwt-decode';

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Si l'utilisateur est déjà connecté, le rediriger vers son dashboard approprié
  if (token) {
    try {
      const decoded = jwtDecode<{ role?: string }>(token);
      const role = decoded.role;
      if (role) {
        return <Navigate to={getRedirectUrlByRole(role)} replace />;
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
    }
    
    // Fallback vers welcome si le rôle n'est pas trouvé
    return <Navigate to="/welcome" replace />;
  }
  
  return <>{children}</>;
};

export default AuthRoute;

