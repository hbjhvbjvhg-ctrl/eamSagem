import React from 'react';
import Layout from '../components/Layout';

const TechnicalDashboard: React.FC = () => {
  return (
    <Layout>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          Tableau de Bord Chef Technique
        </h1>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#495057', marginBottom: '15px' }}>Fonctionnalités Techniques</h2>
          <ul style={{ color: '#666', lineHeight: '1.6' }}>
            <li>Gestion des actifs techniques</li>
            <li>Maintenance préventive</li>
            <li>Diagnostic et réparations</li>
            <li>Gestion des pièces de rechange</li>
            <li>Supervision technique des équipes</li>
          </ul>
        </div>
        <div style={{ 
          background: '#fff3e0', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid #ffcc02'
        }}>
          <p style={{ fontSize: '1em', color: '#ef6c00', margin: 0 }}>
            <strong>Rôle :</strong> Chef Technique - Supervision technique
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TechnicalDashboard;

