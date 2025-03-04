import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDatetimeClass from 'react-datetime';

export interface Event {
  eventId: number;
  eventName: string;
  eventDateTime: ReactDatetimeClass;
  eventLocation: string;
  eventCategory: ['Conference', 'Meeting']
  eventDescription: string;
  eventImage: string;
}

function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.eventId}>
            <h2>{event.eventName}</h2>
            <p>{event.eventDateTime.toString()} </p>
            <p>{event.eventLocation}</p>
            <p>{event.eventCategory}</p>
            <img src={event.eventImage} alt={event.eventName} />
            <p>{event.eventDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
