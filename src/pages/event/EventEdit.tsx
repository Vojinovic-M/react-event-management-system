import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventInterface from '../../models/Event';
import '../../lib/eventform.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteEvent, fetchEventById, updateEvent } from '../../store/thunks/eventThunks';
import EventForm from '../../components/EventForm';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.event);
  const [localEvent, setLocalEvent] = useState<EventInterface | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(Number(id)))
        .unwrap()
        .then((fetchedEvent) => {
          setLocalEvent(fetchedEvent);
        })
        .catch((err) => {
          console.error('Failed to fetch event:', err);
        });
    }
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (localEvent) {
      const { name, value } = e.target;
      setLocalEvent((prevEvent) => {
        if (!prevEvent) return null
        return {
            ...prevEvent,
            [name]: value
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localEvent) {
      dispatch(updateEvent(localEvent))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          console.error('Failed to update event:', err);
        });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (localEvent) {
      setLocalEvent((prevEvent) => {
        if (!prevEvent) return null;
        return {
          ...prevEvent,
          date: `${date}T${prevEvent.date.split('T')[1]}`
        };
      });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (localEvent) {
      setLocalEvent((prevEvent) => {
        if (!prevEvent) return null;
        return {
          ...prevEvent,
          date: `${prevEvent.date.split('T')[0]}T${time}:00`
        };
      });
    }
  };

  const handleDelete = () => {
    if (localEvent) {
        dispatch(deleteEvent(localEvent.eventId))
        .unwrap()
        .then(() => {
            navigate('/')
        })
        .catch((err) => {
            console.error('Failed to delete event: ', err)
        })
    }
  }



  if (loading || !localEvent) return <LoadingSpinner />;

  return <EventForm event={localEvent} onChange={handleChange} onDateChange={handleDateChange} onTimeChange={handleTimeChange} onSubmit={handleSubmit} loading={loading} error={error} onDelete={handleDelete} />;
}