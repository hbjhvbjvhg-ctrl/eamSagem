import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Welcome from './pages/Welcome'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import BackendResetRedirect from './pages/BackendResetRedirect'
import ModulePage from './pages/ModulePage'
import MachineManagement from './pages/MachineManagement'
import WorkOrderManagement from './pages/WorkOrderManagement'
import InterventionManagement from './pages/InterventionManagement'
import PlanningManagement from './pages/PlanningManagement'
import AdminDashboard from './pages/AdminDashboard'
import OperationsDashboard from './pages/OperationsDashboard'
import TechnicalDashboard from './pages/TechnicalDashboard'
import TechnicianDashboard from './pages/TechnicianDashboard'
import UserManagement from './pages/UserManagement'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'
import { getRedirectUrlByRole } from './utils/roleRedirection'
import { jwtDecode } from 'jwt-decode'

function App() {
	const token = localStorage.getItem('token');
	
	// Fonction pour obtenir l'URL de redirection basée sur le rôle
	const getDefaultRedirect = () => {
		if (!token) return '/signin';
		
		try {
			const decoded = jwtDecode<{ role?: string }>(token);
			const role = decoded.role;
			if (role) {
				return getRedirectUrlByRole(role);
			}
		} catch (error) {
			console.error('Erreur lors du décodage du token:', error);
		}
		
		return '/welcome';
	};
	
	return (
		<Routes>
			{/* Redirection de la racine basée sur le rôle */}
			<Route path="/" element={<Navigate to={getDefaultRedirect()} replace />} />
			
			{/* Routes d'authentification - redirigent vers le dashboard approprié si déjà connecté */}
			<Route path="/signin" element={<AuthRoute><SignIn /></AuthRoute>} />
			<Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
			<Route path="/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
			<Route path="/reset-password" element={<AuthRoute><ResetPassword /></AuthRoute>} />
			
			{/* Routes spéciales pour les emails backend */}
			<Route path="/api/auth/reset-password" element={<BackendResetRedirect />} />
			<Route path="/api/auth/verify" element={<VerifyEmail />} />
			
			{/* Tableaux de bord par rôle */}
			<Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
			<Route path="/operations-dashboard" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
			<Route path="/technical-dashboard" element={<ProtectedRoute><TechnicalDashboard /></ProtectedRoute>} />
			<Route path="/technician-dashboard" element={<ProtectedRoute><TechnicianDashboard /></ProtectedRoute>} />
			
			{/* Page d'accueil générique (fallback) */}
			<Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
			
			{/* Routes des modules */}
			<Route path="/intervention-service" element={<ProtectedRoute><InterventionManagement /></ProtectedRoute>} />
			<Route path="/work-order-service" element={<ProtectedRoute><WorkOrderManagement /></ProtectedRoute>} />
			<Route path="/user-service" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
			<Route path="/document-service" element={<ProtectedRoute><ModulePage /></ProtectedRoute>} />
			<Route path="/planning-service" element={<ProtectedRoute><PlanningManagement /></ProtectedRoute>} />
			<Route path="/asset-service" element={<ProtectedRoute><MachineManagement /></ProtectedRoute>} />
			
			{/* Route par défaut */}
			<Route path="*" element={<Navigate to={getDefaultRedirect()} replace />} />
		</Routes>
	)
}

export default App

