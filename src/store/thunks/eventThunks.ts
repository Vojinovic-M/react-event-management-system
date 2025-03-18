import { createAsyncThunk } from "@reduxjs/toolkit";
import { setGlobalLoading } from "../slices/appSlice";
import EventInterface from "../../models/Event";
import axios from "axios";

const API_URL = "https://localhost:7095"

export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async (_, {dispatch, rejectWithValue }) => {
        try {
            dispatch(setGlobalLoading(true))
            const response = await axios.get<EventInterface[]>(`${API_URL}/api/events`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch events");
        } finally {
            dispatch(setGlobalLoading(false))
        }
    }
)

export const fetchEventById = createAsyncThunk(
    'event/fetchEventById',
    async (id: number, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setGlobalLoading(true))
            const response = await axios.get<EventInterface>(`${API_URL}/events/${id}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch the event");
        } finally {
            dispatch(setGlobalLoading(false))
        }
    }
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (event: EventInterface, { dispatch, getState, rejectWithValue }) => {
      try {
        dispatch(setGlobalLoading(true))
        const { auth } = getState() as { auth: { token: string } };
        const response = await axios.post<EventInterface>(`${API_URL}/admin/create`, event,
            {   headers: { Authorization: `Bearer ${auth.token}` }  }
        )
        return response.data
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to create event");
    } finally {
        dispatch(setGlobalLoading(false))
    }}
  );
  
  export const updateEvent = createAsyncThunk(
    'events/updateEvent',
    async (event: EventInterface, { dispatch, getState, rejectWithValue }) => {
        try {
            dispatch(setGlobalLoading(true))
            const { auth } = getState() as { auth: { token: string } }
            const response = await axios.put<EventInterface>(`${API_URL}/${event.eventId}`, event,
                {   headers: { Authorization: `Bearer ${auth.token}` }  }
            );
            return response.data;

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update event");
        } finally {
            dispatch(setGlobalLoading(false))
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (id: number, { dispatch , rejectWithValue }) => {
        try {
            dispatch(setGlobalLoading(false))
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete event");
        } finally {
            dispatch(setGlobalLoading(false))
        }
    }
);