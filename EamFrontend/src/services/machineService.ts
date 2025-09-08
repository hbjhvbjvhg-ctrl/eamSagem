import api from '../api/client';
import { Machine } from '../types/Machine';

export const machineService = {
  async getAll(): Promise<Machine[]> {
    const res = await api.get('/machine/retrieve-all-machines');
    return res.data;
  },
  async getById(id: number): Promise<Machine> {
    const res = await api.get(`/machine/retrieve-machine/${id}`);
    return res.data;
  },
  async create(payload: Partial<Machine>): Promise<Machine> {
    const res = await api.post('/machine/add-machine', payload);
    return res.data;
  },
  async update(payload: Partial<Machine> & { id: number }): Promise<Machine> {
    const res = await api.put('/machine/update-machine', payload);
    return res.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/machine/delete-machine/${id}`);
  }
};

