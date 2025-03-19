import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventInterface from '../../models/Event';
import '../../lib/eventform.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createEvent } from '../../store/thunks/eventThunks';
import EventForm from '../../components/EventForm';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';

export default function EventCreate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.event);
  const [event, setEvent] = useState<EventInterface>({
    eventId: 0,
    name: '',
    date: '',
    location: '',
    category: '',
    description: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

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

  if (loading) return <LoadingSpinner />;

  return <EventForm event={event} onChange={handleChange} onSubmit={handleSubmit} loading={loading} error={error} />;
}