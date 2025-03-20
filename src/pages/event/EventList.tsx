import { useEffect } from 'react';
import { fetchEvents } from '../../store/thunks/eventThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EventInterface from '../../models/Event';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import { Link } from 'react-router-dom';


export default function EventList() {
  const dispatch = useAppDispatch()
  const { events, loading, error, pageNumber, pageSize, totalPages } = useAppSelector((state) => state.event)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchEvents({pageNumber, pageSize}))
  }, [dispatch, pageNumber, pageSize])
  
  const handlePageChange = (newPageNumber: number) => {
    dispatch(fetchEvents({ pageNumber: newPageNumber, pageSize }))
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i<=totalPages; i++) {
      pageNumbers.push(
        <button key={i}
        onClick={() => handlePageChange(i)}
        className={`px-4 py-2 rounded-md mr-2 ${i === pageNumber ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-black text-gray-100 hover:bg-gray-700'}`}
        >{i}
        </button>
      )
    }
    return pageNumbers
  }

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
              <p className=" text-gray-600 mb-2">
                {new Date(event.date).toLocaleDateString('en-GB')} {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              <p className=" text-gray-600 mb-4">{event.location}</p>
              <p className=" text-gray-600 mb-4">{event.category}</p>
              <p className=" text-gray-600 mb-4 truncate">{event.description}</p>
              <div className='text-center bottom-0'>
                <Link to={`/event/${event.eventId}`}
                className="w-full px-4 py-2 bg-indigo-600 text-white text-md font-semibold rounded-md hover:bg-indigo-500 transition mr-2"
              >
                Visit Event
              </Link>
              {user?.roles?.includes("Admin") && (
                <Link to={`/event/edit/${event.eventId}`}
                className="w-full px-4 py-2 bg-yellow-500 text-white text-md font-semibold rounded-md hover:bg-yellow-400 transition mr-2"
                >Edit</Link>
              )}
              
              </div>
              
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          className="px-4 py-2 bg-black text-gray-100 rounded-md hover:bg-gray-700 mr-2"
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className="px-4 py-2 bg-black text-gray-100 rounded-md hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}