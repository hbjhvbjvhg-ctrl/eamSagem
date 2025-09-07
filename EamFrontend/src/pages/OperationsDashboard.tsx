import React from 'react';
import Layout from '../components/Layout';

const OperationsDashboard: React.FC = () => {
  return (
    <Layout>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          Tableau de Bord Chef des Opérations
        </h1>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#495057', marginBottom: '15px' }}>Fonctionnalités Opérationnelles</h2>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>Planification des interventions</li>
            <li>Gestion des ordres de travail</li>
            <li>Supervision des équipes</li>
            <li>Suivi des performances</li>
            <li>Coordination des ressources</li>
          </ul>
        </div>
        <div style={{ 
          background: '#e8f5e8', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid #c8e6c9'
        }}>
          <p style={{ fontSize: '1em', color: '#2e7d32', margin: 0 }}>
            <strong>Rôle :</strong> Chef des Opérations - Gestion opérationnelle
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OperationsDashboard;

