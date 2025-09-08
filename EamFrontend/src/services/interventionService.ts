import api from '../api/client';
import { Intervention } from '../types/Intervention';

export const interventionService = {
  async getAll(): Promise<Intervention[]> {
    const res = await api.get('/ordreIntervention/retrieve-all-ordreInterventions');
    return res.data;
  },
  async getById(id: number): Promise<Intervention> {
    const res = await api.get(`/ordreIntervention/retrieve-ordreIntervention/${id}`);
    return res.data;
  },
  async create(payload: Partial<Intervention>): Promise<Intervention> {
    const res = await api.post('/ordreIntervention/add-ordreIntervention', payload);
    return res.data;
  },
  async update(payload: Partial<Intervention> & { id: number }): Promise<Intervention> {
    const res = await api.put('/ordreIntervention/update-ordreIntervention', payload);
    return res.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/ordreIntervention/delete-ordreIntervention/${id}`);
  }
};

