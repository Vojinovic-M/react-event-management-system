import EventInterface from "../models/Event";

export const fetchEvent = async (eventId: number) => {
    const response = await fetch(`https://localhost:7095/api/events/${eventId}`);
    const data = await response.json();

    // konvertovanje u stringove
    Event = {
        ...data,
        date: data.date
    }
    return {
        eventId: data.eventId,
        name: data.name,
        date: data.date,
        location: data.location,
        category: data.category,
        description: data.description,
        image: data.imageUrl
    };
}

export async function handleSubmit(eventData: EventInterface, id?: string, navigate?: (path:string) => void): Promise<EventInterface | null> {
    const url = id ? `https://localhost:7095/api/events/${id}` : 'https://localhost:7095/api/admin/create';
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
          });

          if (!response.ok) {
            throw new Error('Failed to submit form');
          }

          const result: EventInterface = await response.json();

          if (navigate) {
            navigate(`/event/${result.eventId}`)
          }

          return result;
    
    } catch (error) {
        console.error(error);
        return null;
    }
    


}