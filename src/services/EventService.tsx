import axios from "axios";
import EventInterface from "../models/Event";

const API_URL = "https://localhost:7095/api";

export const EventService = {

  getEvents: async (pageNumber: number, pageSize: number, category: string | null, sortBy: 'date' | 'name', sortOrder: 'asc'|'desc'): Promise<{
    items: EventInterface[], pageNumber: number, pageSize: number, totalCount: number, totalPages: number }> => {
    const response = await axios.get<{
      items: EventInterface[], pageNumber: number, pageSize: number, totalCount: number, totalPages: number
    }>(`${API_URL}/events`, {
      params: {
        pageNumber,
        pageSize,
        category,
        sortBy,
        sortOrder
      }
    });
    return response.data;
  },

  getEventById: async (id: number): Promise<EventInterface> => {
    const response = await axios.get<EventInterface>(`${API_URL}/events/${id}`);
    return response.data;
  },

  createNewEvent: async (event: EventInterface, token: string): Promise<EventInterface> => {
    console.log("Creating new event with payload:", event); // Add logging
    const response = await axios.post<EventInterface>(`${API_URL}/admin/create`, event, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateEvent: async (event: EventInterface, token: string): Promise<EventInterface> => {
    const response = await axios.put<EventInterface>(`${API_URL}/admin/modify/${event.eventId}`, event, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteEvent: async (id: number, token: string): Promise<void> => {
    await axios.delete(`${API_URL}/admin/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
 