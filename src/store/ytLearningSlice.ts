import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { youtubeAPIResultItem } from "interfaces/index";
import { searchVideoByKeyword } from "lib/api/youtube";

export const searchVideos = createAsyncThunk<
youtubeAPIResultItem[], string, { state: { ytLearning: ytLearningState } }>(
  'ytLearning/searchVideos',
  async (keyword, _thunkAPI) => {
    try {
      const res = await searchVideoByKeyword(keyword, 10);
      return JSON.parse(res.data.result).items;
    } catch (error: any) {
      throw error;
    }
  }
);

type ytLearningState = {
  keyword: string;
  results: youtubeAPIResultItem[] | null;
  video: youtubeAPIResultItem | null;
}

const initialState: ytLearningState = {
  keyword: '',
  results: null,
  video: null
}

const ytLearningSlice = createSlice({
  name: 'ytLearning',
  initialState,
  reducers: {
    startLearning(state, action) {
      state.video = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    clearState(state) {
      state.keyword = '',
      state.results = null,
      state.video = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.results = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.results = null;
        console.error('動画検索失敗', action.payload);
      });
  }
});

export const {startLearning, setResults, setKeyword, clearState} = ytLearningSlice.actions;
export default ytLearningSlice.reducer;
