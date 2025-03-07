import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Event } from './EventList';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  

  // useEffect(() => {
  //   axios
  //     .get(`/api/events/${id}`)
  //     .then((response) => setEvent(response.data))
  //     .catch((error) => console.error('Error fetching event details:', error));
  // }, [id]);

    useEffect(() => {
      fetch('https://localhost:7095/api/events/' + id)
        .then(response => response.json())
        .then((data: any) => {
          const eventWithValidDate = {
            ...data,
            date: new Date(data.date),  // datum u ispravan format za JS Date objekat
          };
          setEvent(eventWithValidDate);
        })
        .catch(error => console.error('Error fetching event:', error));
    }, []);


  if (!event)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">Loading event details...</p>
      </div>
    );

  return (
    <div className="flex h-full items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-md">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {event.name}
          </h1>
          <div className="text-gray-600 mb-4 font-medium">
            <p>
              <span>Date:</span>{' '}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <span>Location:</span> {event.location}
            </p>
            <p>
              <span>Category:</span> {event.category}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
