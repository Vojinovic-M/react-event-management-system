import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Event } from './EventList';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.eventName}</h1>
      <p>{event.eventDateTime.toString()}</p>
      <p>{event.eventLocation}</p>
      <p>{event.eventCategory}</p>
      <img src={event.eventImage} alt={event.eventName} />
      <p>{event.eventDescription}</p>
    </div>
  );
}

export default EventDetails;
