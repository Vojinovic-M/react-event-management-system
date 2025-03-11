export const fetchEvent = async (eventId: number) => {
    const response = await fetch(`https://localhost:7095/api/events/${eventId}`);
    const data = await response.json();

    // konvertovanje u stringove
    const event: Event = {
        ...data,
        date: data.date,
        time: data.time.substring(0, 5) // da bude HH:mm
    }
    return {
        eventId: data.eventId,
        name: data.name,
        date: data.date,
        time: data.time,
        location: data.location,
        category: data.category,
        description: data.description,
        image: data.imageUrl
    };
}