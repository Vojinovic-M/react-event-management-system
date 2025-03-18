import axios from "axios";
import EventInterface from "../models/Event";

const API_URL = "https://localhost:7095/api";

export const EventService = {

  getEvents: async (): Promise<EventInterface[]> => {
    try {
    const response = await axios.get<EventInterface[]>(`${API_URL}/events`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch events")
  }
  },


  getEventById: async (id: number): Promise<EventInterface> => {
    const response = await fetch (`${API_URL}/events/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch this event")
    }
    return response.json();
  },


  createNewEvent: async (event: EventInterface): Promise<EventInterface> => {
    const response = await fetch(`${API_URL}/admin/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(event)
    })
    if (!response.ok) {
      throw new Error("Failed to create event")
    }
    return response.json()
  },


  updateEvent: async (event: EventInterface): Promise<EventInterface> => {
    const response = await fetch(`${API_URL}/admin/modify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
    if (!response.ok) {
      throw new Error("Failed to update event")
    }
    return response.json()
  },


  deleteEvent: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/admin/delete/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error("Failed to delete the event")
    }
  }
}
 