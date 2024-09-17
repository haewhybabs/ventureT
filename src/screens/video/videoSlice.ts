import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../redux/store';
const baseUrl = 'https://66acf2fdf009b9d5c733eeea.mockapi.io/api/v1/videos'


// Define the shape of your video data
interface VideoState {
    videos: any[];
    loading: boolean;
    error: string | null;
}

// Initial state for the video slice
export const VideoInitialState: VideoState = {
    videos: [],
    loading: false,
    error: null,
};

// Async thunk to fetch video data
export const fetchVideos = createAsyncThunk('video/fetchVideos', async () => {
    const response = await axios.get(baseUrl);
    return response.data;
});

const videoSlice = createSlice({
    name: 'video',
    initialState: VideoInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch videos';
            });
    },
});

export default videoSlice.reducer;

// Selector to access videos in the state
export const selectVideos = (state: RootState) => state.video.videos;
export const selectVideoLoading = (state: RootState) => state.video.loading;
export const selectVideoError = (state: RootState) => state.video.error;
