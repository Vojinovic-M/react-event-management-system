import { useEffect } from 'react';
import { fetchEvents } from '../../store/thunks/eventThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EventInterface from '../../models/Event';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function EventList() {
  const dispatch = useAppDispatch()
  const { events, loading, error } = useAppSelector((state) => state.event)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])
  
  if (loading) return <LoadingSpinner/>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: EventInterface) => (
          <div key={event.eventId} className="max-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
            <div className="p-6 text-sm relative h-max">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.name}</h2>
              <p className=" text-gray-600 mb-2">{event.date.toLocaleString()}</p>
              <p className=" text-gray-600 mb-4">{event.location}</p>
              <p className=" text-gray-600 mb-4">{event.category}</p>
              <p className=" text-gray-600 mb-4">{event.description}</p>
              <div className='text-center bottom-0'><a
                href={`/event/${event.eventId}`}
                className="w-full px-4 py-2 bg-indigo-600 text-white text-md font-semibold rounded-md hover:bg-indigo-500 transition"
              >
                Visit Event
              </a></div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}