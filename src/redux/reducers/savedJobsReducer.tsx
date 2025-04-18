import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JobItem {
  id: number;
  image: string;
  title: string;
  rating: number;
  description: string;
  header: string;
  location: string;
  jobtype: string;
  salary: string;
  time: string;
  date: string;
}

interface SavedJobsState {
  jobs: JobItem[];
}

const initialState: SavedJobsState = {
  jobs: [],
};

const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState,
  reducers: {
    saveJob: (state, action: PayloadAction<JobItem>) => {
      const jobExists = state.jobs.find(job => job.id === action.payload.id);
      if (!jobExists) {
        state.jobs.push(action.payload);
      }
    },
    removeJob: (state, action: PayloadAction<{ id: number }>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload.id);
    },
    clearJobs: (state) => {
      state.jobs = [];
    },
  },
});

export const { saveJob, removeJob,clearJobs } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
