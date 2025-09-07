import React from 'react';
import Layout from '../components/Layout';

const TechnicianDashboard: React.FC = () => {
  return (
    <Layout>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          Tableau de Bord Technicien
        </h1>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#495057', marginBottom: '15px' }}>Mes Tâches</h2>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>Ordres de travail assignés</li>
            <li>Interventions en cours</li>
            <li>Rapports d'intervention</li>
            <li>Demandes de pièces</li>
            <li>Planning personnel</li>
          </ul>
        </div>
        <div style={{ 
          background: '#f3e5f5', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid #ce93d8'
        }}>
          <p style={{ fontSize: '1em', color: '#7b1fa2', margin: 0 }}>
            <strong>Rôle :</strong> Technicien - Exécution des tâches techniques
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TechnicianDashboard;

