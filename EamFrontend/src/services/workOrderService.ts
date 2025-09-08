import api from '../api/client';
import { WorkOrder } from '../types/WorkOrder';

export const workOrderService = {
  async getAll(): Promise<WorkOrder[]> {
    const res = await api.get('/ordreTravail/retrieve-all-ordreTravails');
    return res.data;
  },
  async getById(id: number): Promise<WorkOrder> {
    const res = await api.get(`/ordreTravail/retrieve-ordreTravail/${id}`);
    return res.data;
  },
  async create(payload: Partial<WorkOrder>): Promise<WorkOrder> {
    const res = await api.post('/ordreTravail/add-ordreTravail', payload);
    return res.data;
  },
  async update(payload: Partial<WorkOrder> & { id: number }): Promise<WorkOrder> {
    const res = await api.put('/ordreTravail/update-ordreTravail', payload);
    return res.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/ordreTravail/delete-ordreTravail/${id}`);
  },
  async assign(id: number, technicienId: number): Promise<WorkOrder> {
    const res = await api.put(`/ordreTravail/assign-ordreTravail/${id}?technicienId=${technicienId}`);
    return res.data;
  },
  async updateStatus(id: number, statut: string): Promise<WorkOrder> {
    const res = await api.put(`/ordreTravail/update-status-ordreTravail/${id}?statut=${statut}`);
    return res.data;
  }
};

