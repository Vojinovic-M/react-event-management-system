import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Event from '../../models/Event';
import '../../lib/eventdetailsimage.css';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

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
    }, [id]);


  if (!event)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">Loading event details...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Container */}
        <div className="flex justify-center p-6">
          <div className='border'>
              <img
                src={event.image}
                alt={event.name}
              />
            </div>
        </div>

        {/* Event Details */}
        <div className="px-8 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
          <div className="text-gray-600 space-y-2 font-medium">
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {event.location}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {event.category}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
