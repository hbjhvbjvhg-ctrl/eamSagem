import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Machine, MachineStatut } from '../types/Machine';
import { machineService } from '../services/machineService';
import './UserManagement.css';

const MachineManagement: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statutFilter, setStatutFilter] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Machine>>({
    emplacement: '',
    statut: MachineStatut.EN_ATTENTE,
    type: '',
    dateDernièreMaintenance: '',
    dateProchaineMainenance: '',
    nom: ''
  });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await machineService.getAll();
      setMachines(data);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Erreur lors du chargement des machines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = machines.filter(m => {
    const q = search.toLowerCase();
    const matches = m.nom.toLowerCase().includes(q) || m.type.toLowerCase().includes(q) || m.emplacement.toLowerCase().includes(q);
    const matchesStatut = statutFilter === 'all' || m.statut === statutFilter;
    return matches && matchesStatut;
  });

  if (loading) return (
    <Layout>
      <div className="user-management-loading"><div className="loading-spinner" />Chargement...</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="user-management">
        <div className="user-management-header">
          <div className="header-title"><h1>🏭 Machines</h1></div>
          <div className="header-actions">
            <button className="primary-button" onClick={() => { setIsEditMode(false); setEditingId(null); setFormError(null); setForm({ emplacement: '', statut: MachineStatut.EN_ATTENTE, type: '', dateDernièreMaintenance: '', dateProchaineMainenance: '', nom: '' }); setIsModalOpen(true); }}>➕ Ajouter</button>
          </div>
        </div>

        <div className="user-management-filters">
          <div className="search-container">
            <input className="search-input" placeholder="🔍 Rechercher par nom, type ou emplacement" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
          </div>
          <div className="filter-container">
            <select className="filter-select" value={statutFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatutFilter(e.target.value)}>
              <option value="all">Tous les statuts</option>
              {Object.values(MachineStatut).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {error && (<div className="permissions-info"><p>{error}</p></div>)}

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Emplacement</th>
                <th>Statut</th>
                <th>Dernière Maint.</th>
                <th>Prochaine Maint.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td>{m.nom}</td>
                  <td>{m.type}</td>
                  <td>{m.emplacement}</td>
                  <td>{m.statut}</td>
                  <td>{new Date(m.dateDernièreMaintenance).toLocaleDateString()}</td>
                  <td>{new Date(m.dateProchaineMainenance).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button className="action-button" onClick={() => { setIsEditMode(true); setEditingId(m.id); setFormError(null); setForm({ ...m }); setIsModalOpen(true); }}>✏️</button>
                    <button className="action-button" onClick={async () => { if (!window.confirm('Supprimer cette machine ?')) return; await machineService.remove(m.id); await load(); }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => !submitting && setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header"><h3>{isEditMode ? 'Modifier une machine' : 'Ajouter une machine'}</h3></div>
              <div className="modal-body">
                {formError && <div className="form-error">{formError}</div>}
                <div className="form-grid">
                  <label>Nom<input className="input" value={form.nom || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, nom: e.target.value })} /></label>
                  <label>Type<input className="input" value={form.type || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, type: e.target.value })} /></label>
                  <label>Emplacement<input className="input" value={form.emplacement || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, emplacement: e.target.value })} /></label>
                  <label>Statut<select className="input" value={form.statut || MachineStatut.EN_ATTENTE} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, statut: e.target.value as MachineStatut })}>{Object.values(MachineStatut).map(s => <option key={s} value={s}>{s}</option>)}</select></label>
                  <label>Dernière maintenance<input className="input" type="date" value={form.dateDernièreMaintenance ? new Date(form.dateDernièreMaintenance).toISOString().slice(0,10) : ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, dateDernièreMaintenance: e.target.value })} /></label>
                  <label>Prochaine maintenance<input className="input" type="date" value={form.dateProchaineMainenance ? new Date(form.dateProchaineMainenance).toISOString().slice(0,10) : ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, dateProchaineMainenance: e.target.value })} /></label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="secondary-button" disabled={submitting} onClick={() => setIsModalOpen(false)}>Annuler</button>
                <button className="primary-button" disabled={submitting || !form.nom || !form.type || !form.emplacement} onClick={async () => {
                  setSubmitting(true); setFormError(null);
                  try {
                    if (isEditMode && editingId != null) {
                      await machineService.update({ ...(form as Machine), id: editingId });
                    } else {
                      await machineService.create(form);
                    }
                    await load(); setIsModalOpen(false);
                  } catch (err: any) {
                    setFormError(err?.response?.data?.message || 'Erreur lors de l\'enregistrement');
                  } finally {
                    setSubmitting(false);
                  }
                }}>{submitting ? 'Enregistrement...' : isEditMode ? 'Enregistrer' : 'Créer'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MachineManagement;

