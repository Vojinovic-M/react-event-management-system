import { createAsyncThunk } from "@reduxjs/toolkit";
import EventInterface from "../../models/Event";
import axios from "axios";
import { EventService } from "../../services/EventService";

const API_URL = "https://localhost:7095"

export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async (_, {rejectWithValue }) => {
        try {
            const response = await axios.get<EventInterface[]>(`${API_URL}/api/events`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch events");
        }
    }
)

export const fetchEventById = createAsyncThunk(
    'event/fetchEventById',
    async (id: number, {rejectWithValue }) => {
        try {
            const response = await axios.get<EventInterface>(`${API_URL}/api/events/${id}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch the event");
        }
    }
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (event: EventInterface, { getState, rejectWithValue }) => {
      try {
        const { auth } = getState() as { auth: { token: string } };
        const newEvent = await EventService.createNewEvent(event, auth.token)
        return newEvent
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to create event");
    }}
  );
  
  export const updateEvent = createAsyncThunk(
    'events/updateEvent',
    async (event: EventInterface, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState() as { auth: { token: string } }
            const response = await axios.put<EventInterface>(`${API_URL}/${event.eventId}`, event,
                {   headers: { Authorization: `Bearer ${auth.token}` }  }
            );
            return response.data;

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update event");
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (id: number, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete event");
        }
    }
);