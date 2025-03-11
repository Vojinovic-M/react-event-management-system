import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEvent } from '../../services/EventService';
import EventInterface from '../../models/Event';

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventInterface>({
    eventId: 0,
    name: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    image: ''
  });
    
  useEffect(() => {
    if (id) {
      fetchEvent(parseInt(id)).then(fetchedEvent => setEvent(fetchedEvent));
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = id ? `https://localhost:7095/api/events/${id}` : 'https://localhost:7095/api/events';
    const method = id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (response.ok) {
      const result = await response.json();
      navigate(`/events/${result.eventId}`);
    } else {
      console.error('Failed to submit form');
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Event' : 'Create Event'}</h1>
      <input type="text" name="name" value={event.name} onChange={handleChange} placeholder="Event Name" required />
      <input type="date" name="date" value={event.date} onChange={handleChange} required />
      <input type="time" name="time" value={event.time} onChange={handleChange} required />
      <input type="text" name="location" value={event.location} onChange={handleChange} placeholder="Location" required />
      <input type="text" name="category" value={event.category} onChange={handleChange} placeholder="Category" required />
      <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="image" value={event.image} onChange={handleChange} placeholder="Image" required />
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
}