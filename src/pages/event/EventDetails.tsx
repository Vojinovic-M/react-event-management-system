import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEventById } from '../../store/thunks/eventThunks';
import LoadingSpinner from '../../lib/LoadingSpinner';

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const { event, loading, error } = useAppSelector((state) => state.event)
  const { user } = useAppSelector((state) => state.auth)

    useEffect(() => {
      if (id) {
        dispatch(fetchEventById(parseInt(id)))
      }
    }, [id, dispatch]);

  if (loading) return <LoadingSpinner/>
    if (error) return <div>Error: {error}</div>
    if (!event) return <div>Event not found.</div>

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl border border-blue-300 overflow-hidden">
      {user?.roles?.includes("Admin") && (
            <div className='mt-2 text-right'>
              <Link to={`/event/edit/${event.eventId}`}
              className="w-full px-4 py-2 bg-yellow-500 text-white text-xl font-semibold rounded-md hover:bg-yellow-400 transition"
              >Edit</Link>
            </div>
          )}
        {/* Image Container */}
        <div className="flex justify-center p-6">
          <div className='border'>
              <img
                src={event.image}
                alt={event.name}
                className="w-[600px] h-[600px] object-contain"
              />
            </div>
        </div>

        {/* Event Details */}
        <div className="px-8 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
          <div className="text-gray-600 space-y-2 font-medium">
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(event.date).toLocaleDateString('en-GB')} {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            <p><span className="font-semibold">Location:</span> {event.location}</p>
            <p><span className="font-semibold">Category:</span> {event.category}</p>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
