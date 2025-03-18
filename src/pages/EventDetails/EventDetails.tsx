import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../lib/eventdetailsimage.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEventById } from '../../store/thunks/eventThunks';

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const { event, error } = useAppSelector((state) => state.event)

    useEffect(() => {
      if (id) {
        dispatch(fetchEventById(parseInt(id)))
      }
    }, [id, dispatch]);


    if (error) return <div>Error: {error}</div>
    if (!event) return <div>Event not found.</div>

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
