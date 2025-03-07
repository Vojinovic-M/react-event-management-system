import React, { useState, useEffect } from 'react';

export interface Event {
  eventId: number;
  name: string;
  date: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
}

function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('https://localhost:7095/api/events')
      .then(response => response.json())
      .then(data => {
        const eventsWithValidDates = data.map((event: any) => ({
          ...event,
          eventDateTime: new Date(event.date),  // datum u ispravan format za JS Date objekat
        }));
        setEvents(eventsWithValidDates);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, [0]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.eventId} className="max-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <img src={event.imageUrl} alt={event.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleString()}</p>
              <p className="text-sm text-gray-600 mb-4">{event.location}</p>
              <p className="text-sm text-gray-700 mb-4">{event.category}</p>
              <p className="text-sm text-gray-600 mb-4">{event.description}</p>
              <a
                href={`/events/${event.eventId}`}
                className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 transition"
              >
                Visit Event
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
