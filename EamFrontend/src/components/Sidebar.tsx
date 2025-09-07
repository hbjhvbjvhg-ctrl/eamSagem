import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import api from '../api/client';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  
  const modules = [
    { name: 'Intervention Service', path: '/intervention-service' },
    { name: 'Work Order Service', path: '/work-order-service' },
    { name: 'User Service', path: '/user-service' },
    { name: 'Document Service', path: '/document-service' },
    { name: 'Planning Service', path: '/planning-service' },
    { name: 'Asset Service', path: '/asset-service' },
  ];

  async function handleLogout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore failure; proceed to clear token client-side
    }
    localStorage.removeItem('token');
    navigate('/signin', { replace: true });
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>EAM Modules</h3>
      </div>
      <ul className="sidebar-menu">
        {modules.map((module, index) => (
          <li key={index} className="sidebar-menu-item">
            <Link to={module.path}>{module.name}</Link>
          </li>
        ))}
        <li className="sidebar-menu-item">
          <button onClick={handleLogout} className="sidebar-logout-item">
            Déconnexion
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


