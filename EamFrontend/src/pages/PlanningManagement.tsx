import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Planning, TypePlanning } from '../types/Planning';
import { planningService } from '../services/planningService';
import './UserManagement.css';

const PlanningManagement: React.FC = () => {
  const [items, setItems] = useState<Planning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Planning>>({
    dateDebut: new Date().toISOString().slice(0,10),
    dateFin: new Date().toISOString().slice(0,10),
    typePlanning: TypePlanning.JOURNALIER
  });

  const load = async () => {
    try {
      setLoading(true); setError(null);
      const data = await planningService.getAll();
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = items.filter(p => {
    const q = search.toLowerCase();
    const matches = (p.department || '').toLowerCase().includes(q) || (p.typePlanning || '').toString().toLowerCase().includes(q);
    const matchesType = typeFilter === 'all' || p.typePlanning === typeFilter;
    return matches && matchesType;
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
          <div className="header-title"><h1>🗓️ Plannings</h1></div>
          <div className="header-actions">
            <button className="primary-button" onClick={() => { setIsEditMode(false); setEditingId(null); setFormError(null); setForm({ dateDebut: new Date().toISOString().slice(0,10), dateFin: new Date().toISOString().slice(0,10), typePlanning: TypePlanning.JOURNALIER }); setIsModalOpen(true); }}>➕ Ajouter</button>
          </div>
        </div>

        <div className="user-management-filters">
          <div className="search-container">
            <input className="search-input" placeholder="🔍 Rechercher par type/département" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
          </div>
          <div className="filter-container">
            <select className="filter-select" value={typeFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}>
              <option value="all">Tous les types</option>
              {Object.values(TypePlanning).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {error && (<div className="permissions-info"><p>{error}</p></div>)}

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Département</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>{p.typePlanning}</td>
                  <td>{new Date(p.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(p.dateFin).toLocaleDateString()}</td>
                  <td>{p.department || '-'}</td>
                  <td className="actions-cell">
                    <button className="action-button" onClick={() => { setIsEditMode(true); setEditingId(p.id); setFormError(null); setForm({ ...p }); setIsModalOpen(true); }}>✏️</button>
                    <button className="action-button" onClick={async () => { if (!window.confirm('Supprimer ce planning ?')) return; await planningService.remove(p.id); await load(); }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => !submitting && setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header"><h3>{isEditMode ? 'Modifier un planning' : 'Ajouter un planning'}</h3></div>
              <div className="modal-body">
                {formError && <div className="form-error">{formError}</div>}
                <div className="form-grid">
                  <label>Type<select className="input" value={form.typePlanning || TypePlanning.JOURNALIER} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, typePlanning: e.target.value as TypePlanning })}>{Object.values(TypePlanning).map(t => <option key={t} value={t}>{t}</option>)}</select></label>
                  <label>Début<input className="input" type="date" value={form.dateDebut ? new Date(form.dateDebut).toISOString().slice(0,10) : ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, dateDebut: e.target.value })} /></label>
                  <label>Fin<input className="input" type="date" value={form.dateFin ? new Date(form.dateFin).toISOString().slice(0,10) : ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, dateFin: e.target.value })} /></label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="secondary-button" disabled={submitting} onClick={() => setIsModalOpen(false)}>Annuler</button>
                <button className="primary-button" disabled={submitting || !form.dateDebut || !form.dateFin} onClick={async () => {
                  setSubmitting(true); setFormError(null);
                  try {
                    if (isEditMode && editingId != null) {
                      await planningService.update({ ...(form as Planning), id: editingId });
                    } else {
                      await planningService.create(form);
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

export default PlanningManagement;

