import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventInterface from '../../models/Event';
import '../../lib/eventform.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEventById, createEvent, updateEvent } from '../../store/thunks/eventThunks';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error} = useAppSelector((state) => state.event)
  const [event, setEvent] = useState<EventInterface>({
    eventId: 0,
    name: '',
    date: '',
    location: '',
    category: '',
    description: '',
    image: ''
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createEvent(event))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error('Failed to create event:', err);
      });
  };

  if (loading) return <LoadingSpinner/>

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        {id ? 'Edit Event' : 'Create Event'}
      </h1>

      <input type="text" name="name" value={event.name} className='event-input'
       onChange={(e) => setEvent({...event, name: e.target.value})}
       placeholder="Event Name" required />

      <input type="date" name="date" value={event.date} className='event-input'
       onChange={(e) => setEvent({...event, date: e.target.value})}
        required />

      <input type="text" name="location" value={event.location} className='event-input'
       onChange={(e) => setEvent({...event, location: e.target.value})}
        placeholder="Location" required />

      <select name="category" value={event.category} className='event-input'
       onChange={(e) => setEvent({...event, category: e.target.value})}
        required>
          <option value="Meeting">Meeting</option>
          <option value="Seminar">Seminar</option>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
      </select>

      <textarea name="description" value={event.description} className='event-input'
       onChange={(e) => setEvent({...event, description: e.target.value})}
        placeholder="Description" required />

      <input type="text" name="image" value={event.image} className='event-input'
       onChange={(e) => setEvent({...event, image: e.target.value})}
        placeholder="Image URL" required />
      
      <button type="submit"
        className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >{id ? 'Update' : 'Create'}</button>
    </form>
  );
}