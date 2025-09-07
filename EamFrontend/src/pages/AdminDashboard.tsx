import React from 'react';
import Layout from '../components/Layout';

const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          Tableau de Bord Administrateur
        </h1>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#495057', marginBottom: '15px' }}>Fonctionnalités Admin</h2>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>Gestion des utilisateurs et des rôles</li>
            <li>Configuration système</li>
            <li>Supervision générale</li>
            <li>Rapports et analytics</li>
            <li>Gestion des permissions</li>
          </ul>
        </div>
        <div style={{ 
          background: '#e3f2fd', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <p style={{ fontSize: '1em', color: '#1565c0', margin: 0 }}>
            <strong>Rôle :</strong> Administrateur - Accès complet au système
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

