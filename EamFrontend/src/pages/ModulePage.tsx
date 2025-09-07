import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const ModulePage: React.FC = () => {
  const { moduleName } = useParams<{ moduleName: string }>();

  const getModuleDisplayName = (name: string) => {
    const moduleNames: { [key: string]: string } = {
      'common-module': 'Common Module',
      'intervention-service': 'Intervention Service',
      'work-order-service': 'Work Order Service',
      'user-service': 'User Service',
      'odoo-integration-service': 'Odoo Integration Service',
      'document-service': 'Document Service',
      'planning-service': 'Planning Service',
      'asset-service': 'Asset Service',
    };
    return moduleNames[name] || name;
  };

  return (
    <Layout>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          {getModuleDisplayName(moduleName || '')}
        </h1>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <p style={{ fontSize: '1.1em', color: '#666', margin: 0 }}>
            Cette page sera développée pour le module <strong>{getModuleDisplayName(moduleName || '')}</strong>.
          </p>
          <p style={{ fontSize: '1em', color: '#888', marginTop: '10px', margin: 0 }}>
            Fonctionnalités à venir...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ModulePage;

