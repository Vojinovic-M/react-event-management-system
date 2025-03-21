import { useEffect } from 'react';
import { fetchEvents } from '../../store/thunks/eventThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EventInterface from '../../models/Event';
import LoadingSpinner from '../../lib/LoadingSpinner';
import { Link } from 'react-router-dom';
import { updateEventFilters, updateEventSort, updateEventSortOrder, updatePageNumber } from '../../store/slices/eventSlice';


type SortOption = 'date' | 'name'
type SortOrder = 'asc' | 'desc'

const CATEGORIES = [
    'Conference',
    'Seminar',
    'Meeting',
    'Workshop'
]

export default function EventList() {
  const dispatch = useAppDispatch()
  const { events, loading, error, pageNumber, pageSize, totalPages, category, sortBy, sortOrder } = useAppSelector((state) => state.event)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchEvents({pageNumber, pageSize, category, sortBy, sortOrder}))
  }, [dispatch, pageNumber, pageSize, category, sortBy, sortOrder])

  const handlePageChange = (newPageNumber: number) => {
    dispatch(updatePageNumber(newPageNumber))
  }

  const handleFilterChange = (newCategory: string) => {
    dispatch(updateEventFilters({
      category: newCategory,
      pageNumber: 1
    }))
  }

  const handleSortChange = (newSortBy: SortOption) => {
    dispatch(updateEventSort({
      sortBy: newSortBy,
      pageNumber: 1
    }))
  }

  const handleSortOrderChange = (newOrder: SortOrder) => {
    dispatch(updateEventSortOrder({
      sortOrder: newOrder,
      pageNumber: 1
    }));
  };


  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, pageNumber - Math.floor(maxPagesToShow / 2))
    let endpage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (endpage - startPage < maxPagesToShow - 1 )
      startPage = Math.max(1, endpage - maxPagesToShow + 1)

    for (let i = 1; i<=totalPages; i++) {
      pageNumbers.push(
        <button key={i}
        onClick={() => handlePageChange(i)}
        className={`px-4 py-2 rounded-md mr-2 ${
          i === pageNumber 
          ? 'bg-blue-500 text-white hover:bg-blue-400' 
          : 'bg-white text-gray-700 hover:bg-blue-100'
        }`}
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

      <div className="flex flex-wrap gap-4 mb-8 justify-end text-right">
        {/* Filter za kategorije */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Category:</label>
          <select
            value={category || ''}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sortiranje po imenu i datumu */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Sort By:</label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
            </select>
            
            <select
              value={sortOrder}
              onChange={(e) => handleSortOrderChange(e.target.value as SortOrder)}
              className="px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid za Evente */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: EventInterface) => (
          <div key={event.eventId} className="max-w-full bg-white rounded-lg border-blue-300 border overflow-hidden">
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
          className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-blue-100 mr-2"
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className="px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-blue-100 mr-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}