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
  const { event, error} = useAppSelector((state) => state.event)
  const { globalLoading } = useAppSelector((state) => state.app)
  const [formEvent, setFormEvent] = useState<EventInterface>({
    eventId: 0,
    name: '',
    date: '',
    location: '',
    category: '',
    description: '',
    image: ''
  });
    
  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(parseInt(id)))
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (event) {
      setFormEvent(formEvent)
    }
  }, [event])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) { await dispatch(updateEvent(formEvent)).unwrap() }
      else { await dispatch(createEvent(formEvent)).unwrap() }

      navigate(`/event/${formEvent.eventId}`)
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigate('/login')
      }
      console.log('Submission error: ', error)
    }
  }

  if (globalLoading) return <LoadingSpinner/>

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        {id ? 'Edit Event' : 'Create Event'}
      </h1>

      <input type="text" name="name" value={formEvent.name} className='event-input'
       onChange={(e) => setFormEvent({...formEvent, name: e.target.value})}
       placeholder="Event Name" required />

      <input type="date" name="date" value={formEvent.date} className='event-input'
       onChange={(e) => setFormEvent({...formEvent, date: e.target.value})}
        required />

      <input type="text" name="location" value={formEvent.location} className='event-input'
       onChange={(e) => setFormEvent({...formEvent, location: e.target.value})}
        placeholder="Location" required />

      <select name="category" value={formEvent.category} className='event-input'
       onChange={(e) => setFormEvent({...formEvent, category: e.target.value})}
        required>
          <option value="Meeting">Meeting</option>
          <option value="Seminar">Seminar</option>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
      </select>

      <textarea name="description" value={formEvent.description} className='event-input'
       onChange={(e) => setFormEvent({...formEvent, description: e.target.value})}
        placeholder="Description" required />

      <input type="text" name="image" value={formEvent.image} className='event-input'
       onChange={(e) => setFormEvent({...formEvent, image: e.target.value})}
        placeholder="Image URL" required />
      
      <button type="submit"
        className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >{id ? 'Update' : 'Create'}</button>
    </form>
  );
}