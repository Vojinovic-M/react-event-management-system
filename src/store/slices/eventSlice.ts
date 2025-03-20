import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createEvent, deleteEvent, fetchEventById, fetchEvents, updateEvent } from "../thunks/eventThunks"
import EventInterface from "../../models/Event"

interface EventState {
    events: EventInterface[]
    event: EventInterface | null
    loading: boolean
    error: string | null
    pageNumber: number
    pageSize: number
    totalCount: number
    totalPages: number
    category: string | null
    sortBy: 'date' | 'name'
    sortOrder: 'asc' | 'desc'
}

const initialState: EventState = {
    events: [],
    event: null,
    loading: false,
    error: null,
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    category: null,
    sortBy: 'date',
    sortOrder: 'asc'
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        updateEventFilters: (state, action: PayloadAction<{ category: string; pageNumber: number }>) => {
            state.category = action.payload.category;
            state.pageNumber = action.payload.pageNumber;
        },
        updateEventSort: (state, action: PayloadAction<{ sortBy: 'date' | 'name'; pageNumber: number }>) => {
            state.sortBy = action.payload.sortBy;
            state.pageNumber = action.payload.pageNumber;
        },
        updateEventSortOrder: (state, action: PayloadAction<{ sortOrder: 'asc' | 'desc'; pageNumber: number }>) => {
            state.sortOrder = action.payload.sortOrder;
            state.pageNumber = action.payload.pageNumber;
        },
        updatePageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload;
        },
        updatePageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
            state.pageNumber = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<{
                items: EventInterface[]; pageNumber: number; pageSize: number; totalCount: number; totalPages: number;
            }>) => {
                state.events = action.payload.items
                state.pageNumber = action.payload.pageNumber
                state.pageSize = action.payload.pageSize
                state.totalCount = action.payload.totalCount
                state.totalPages = action.payload.totalPages
                state.loading = false
                state.error = null
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string || "Failed to fetch events"
            })


            .addCase(fetchEventById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<EventInterface>) => {
                state.event = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string || "Failed to fetch event by ID"
            })


            .addCase(createEvent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createEvent.fulfilled, (state, action: PayloadAction<EventInterface>) => {
                state.events.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string || "Failed to create event"
            })


            .addCase(updateEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(updateEvent.fulfilled, (state, action: PayloadAction<EventInterface>) => {
                const index = state.events.findIndex(event => event.eventId === action.payload.eventId);
                if (index !== -1) {
                  state.events[index] = action.payload;
                }
                state.loading = false;
                state.error = null;
              })
              .addCase(updateEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update event"
              })

              
              .addCase(deleteEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<number>) => {
                state.events = state.events.filter(event => event.eventId !== action.payload);
                state.loading = false;
                state.error = null;
              })
              .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to delete event"
              });
    }
})
export const { updateEventFilters, updateEventSort, updateEventSortOrder, updatePageNumber, updatePageSize } = eventSlice.actions;
export default eventSlice.reducer