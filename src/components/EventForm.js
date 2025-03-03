import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
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
      axios.get(`/api/events/${id}`)
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching event:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/events/${id}`, event)
        .then(() => navigate(`/event/${id}`))
        .catch(error => console.error('Error updating event:', error));
    } else {
      axios.post('/api/events', event)
        .then(response => navigate(`/event/${response.data.id}`))
        .catch(error => console.error('Error creating event:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Event' : 'Create Event'}</h1>
      <input type="text" name="name" value={event.name} onChange={handleChange} placeholder="Event Name" required />
      <input type="date" name="date" value={event.date} onChange={handleChange} required />
      <input type="time" name="time" value={event.time} onChange={handleChange} required />
      <input type="text" name="location" value={event.location} onChange={handleChange} placeholder="Location" required />
      <input type="text" name="category" value={event.category} onChange={handleChange} placeholder="Category" required />
      <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="image" value={event.image} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default EventForm;
