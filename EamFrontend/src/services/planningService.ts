import api from '../api/client';
import { Planning } from '../types/Planning';

export const planningService = {
  async getAll(): Promise<Planning[]> {
    const res = await api.get('/planning/retrieve-all-plannings');
    return res.data;
  },
  async getById(id: number): Promise<Planning> {
    const res = await api.get(`/planning/retrieve-planning/${id}`);
    return res.data;
  },
  async create(payload: Partial<Planning>): Promise<Planning> {
    const res = await api.post('/planning/add-planning', payload);
    return res.data;
  },
  async update(payload: Partial<Planning> & { id: number }): Promise<Planning> {
    const res = await api.put('/planning/update-planning', payload);
    return res.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/planning/delete-planning/${id}`);
  }
};

