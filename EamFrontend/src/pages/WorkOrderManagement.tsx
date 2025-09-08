import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { WorkOrder, Priorite, Statut } from '../types/WorkOrder';
import { workOrderService } from '../services/workOrderService';
import './UserManagement.css';

const WorkOrderManagement: React.FC = () => {
  const [items, setItems] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<WorkOrder>>({
    titre: '', description: '', dateCreation: new Date().toISOString().slice(0,10), priorité: Priorite.NORMALE, statut: Statut.EN_ATTENTE
  });

  const load = async () => {
    try {
      setLoading(true); setError(null);
      const data = await workOrderService.getAll();
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = items.filter(w => {
    const q = search.toLowerCase();
    const matches = w.titre.toLowerCase().includes(q) || w.description.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || w.statut === statusFilter;
    const matchesPriority = priorityFilter === 'all' || w.priorité === priorityFilter;
    return matches && matchesStatus && matchesPriority;
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
          <div className="header-title"><h1>🧰 Ordres de Travail</h1></div>
          <div className="header-actions">
            <button className="primary-button" onClick={() => { setIsEditMode(false); setEditingId(null); setFormError(null); setForm({ titre: '', description: '', dateCreation: new Date().toISOString().slice(0,10), priorité: Priorite.NORMALE, statut: Statut.EN_ATTENTE }); setIsModalOpen(true); }}>➕ Ajouter</button>
          </div>
        </div>

        <div className="user-management-filters">
          <div className="search-container">
            <input className="search-input" placeholder="🔍 Rechercher par titre ou description" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
          </div>
          <div className="filter-container">
            <select className="filter-select" value={statusFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}>
              <option value="all">Tous les statuts</option>
              {Object.values(Statut).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-container">
            <select className="filter-select" value={priorityFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriorityFilter(e.target.value)}>
              <option value="all">Toutes les priorités</option>
              {Object.values(Priorite).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {error && (<div className="permissions-info"><p>{error}</p></div>)}

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td>{w.titre}</td>
                  <td>{w.description}</td>
                  <td>{w.priorité}</td>
                  <td>{w.statut}</td>
                  <td>{new Date(w.dateCreation).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button className="action-button" onClick={() => { setIsEditMode(true); setEditingId(w.id); setFormError(null); setForm({ ...w }); setIsModalOpen(true); }}>✏️</button>
                    <button className="action-button" onClick={async () => { if (!window.confirm('Supprimer cet ordre de travail ?')) return; await workOrderService.remove(w.id); await load(); }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => !submitting && setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header"><h3>{isEditMode ? 'Modifier un ordre de travail' : 'Ajouter un ordre de travail'}</h3></div>
              <div className="modal-body">
                {formError && <div className="form-error">{formError}</div>}
                <div className="form-grid">
                  <label>Titre<input className="input" value={form.titre || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, titre: e.target.value })} /></label>
                  <label>Description<input className="input" value={form.description || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, description: e.target.value })} /></label>
                  <label>Priorité<select className="input" value={form.priorité || Priorite.NORMALE} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, priorité: e.target.value as Priorite })}>{Object.values(Priorite).map(p => <option key={p} value={p}>{p}</option>)}</select></label>
                  <label>Statut<select className="input" value={form.statut || Statut.EN_ATTENTE} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, statut: e.target.value as Statut })}>{Object.values(Statut).map(s => <option key={s} value={s}>{s}</option>)}</select></label>
                  <label>Date de création<input className="input" type="date" value={form.dateCreation ? new Date(form.dateCreation).toISOString().slice(0,10) : ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, dateCreation: e.target.value })} /></label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="secondary-button" disabled={submitting} onClick={() => setIsModalOpen(false)}>Annuler</button>
                <button className="primary-button" disabled={submitting || !form.titre || !form.description} onClick={async () => {
                  setSubmitting(true); setFormError(null);
                  try {
                    if (isEditMode && editingId != null) {
                      await workOrderService.update({ ...(form as WorkOrder), id: editingId });
                    } else {
                      await workOrderService.create(form);
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

export default WorkOrderManagement;

