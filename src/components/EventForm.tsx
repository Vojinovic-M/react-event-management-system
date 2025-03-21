import EventInterface from '../models/Event';
import Button from '../lib/form/Button';
import Input from '../lib/form/Input';
import Select from '../lib/form/Select';
import Textarea from '../lib/form/Textarea';

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

const CATEGORIES = [
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Seminar', label: 'Seminar' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Conference', label: 'Conference' }
];

export default function EventForm({ event, onChange, onDateChange, onTimeChange, onSubmit, loading, error, onDelete}: EventFormProps) {
    return (
        <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {event.eventId ? 'Edit Event' : 'Create Event'}
          </h1>
    
          <Input type="text" name="name" value={event.name} onChange={onChange} placeholder="Event Name" required />

          <div className="flex space-x-4">
            <Input type="date" name="date" value={event.date.split('T')[0]} onChange={onDateChange} required />
            <Input type="time" name="time" value={event.date.split('T')[1].substring(0, 5)} onChange={onTimeChange} required />
          </div>
          <Input type="text" name="location" value={event.location} onChange={onChange} placeholder="Location" required />
          <Select name="category" value={event.category} onChange={onChange} required options={CATEGORIES} />
          <Textarea name="description" value={event.description} onChange={onChange} placeholder="Description" required />
          <Input type="text" name="image" value={event.image} onChange={onChange} placeholder="Image URL" required />

          <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={loading}>
            {event.eventId ? 'Update' : 'Create'}
          </Button>
          {error && <span>Error: {error}</span>}

          { onDelete && (
            <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={onDelete} disabled={loading}
            >Delete</Button>
          )}

        </form>
      );
}