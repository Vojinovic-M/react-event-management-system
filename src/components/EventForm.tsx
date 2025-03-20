import EventInterface from "../models/Event";

interface EventFormProps {
    event: EventInterface
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void    
    onSubmit: (e: React.FormEvent) => void
    loading: boolean
    error: string | null
    onDelete?: () => void
}


export default function EventForm({ event, onChange, onDateChange, onTimeChange, onSubmit, loading, error, onDelete}: EventFormProps) {
    return (
        <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {event.eventId ? 'Edit Event' : 'Create Event'}
          </h1>
    
          <input type="text" name="name" value={event.name} className='event-input'
            onChange={onChange}
            placeholder="Event Name" required />


          <div className="flex space-x-4">
          <input type="date" name="date" value={event.date.split('T')[0]}
            className='event-input'
            onChange={onDateChange}
            required>
          </input>

          <input type="time" name="time" value={event.date.split('T')[1].substring(0,5)}
            className="event-input"
            onChange={onTimeChange}>
          </input>

          </div>

          <input type="text" name="location" value={event.location} className='event-input'
            onChange={onChange}
            placeholder="Location" required />
    
          <select name="category" value={event.category} className='event-input'
           onChange={onChange}
            required>
              <option value="" disabled>-</option>
              <option value="Meeting">Meeting</option>
              <option value="Seminar">Seminar</option>
              <option value="Workshop">Workshop</option>
              <option value="Conference">Conference</option>
          </select>
    
          <textarea name="description" value={event.description} className='event-input'
           onChange={onChange}
            placeholder="Description" required />
    
          <input type="text" name="image" value={event.image} className='event-input'
           onChange={onChange}
            placeholder="Image URL" required />
          
          <button type="submit"
            className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >{event.eventId ? 'Update' : 'Create'}</button>
          {error && <span>Error: {error}</span>}

          { onDelete && (
            <button type="button"
            className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={onDelete}
            disabled={loading}
            >Delete</button>
          )}

        </form>
      );
}