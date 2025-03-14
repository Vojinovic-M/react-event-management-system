import EventInterface from "../models/Event";
import { handleResponse } from "./HandleResponse";

const API_URL = "https://localhost:7095";

export const EventService = {
  getEvent: (eventId: number) =>
    fetch(`${API_URL}/api/events/${eventId}`)
    .then(handleResponse)
    .then(data => ({
      eventId: data.eventId,
      name: data.name,
      date: data.date,
      location: data.location,
      category: data.category,
      description: data.description,
      image: data.imageUrl
    } as EventInterface)),


  createNewEvent: (eventData: EventInterface) =>
    fetch(`${API_URL}/api/admin/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(eventData)
    })
    .then(handleResponse)
}
 