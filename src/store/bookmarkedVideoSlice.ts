import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookmarkVideo } from "interfaces/index";
import { getBookmarkVideosList } from "lib/api/bookmarkVideo";

export const getBookmarkedVideos = createAsyncThunk(
  'bookmarkedVideo/getBookmarkedVideos',
  async () => {
    try {
      const res = await getBookmarkVideosList();
      console.log(res);

      return res.data;
    } catch (error: any) {
      throw error;
    }
  }
);

type bookmarkedVideoState = {
  bookmarkedVideoList: BookmarkVideo[] | null
}

const initialState: bookmarkedVideoState = {
  bookmarkedVideoList: null
}

const bookmarkedVideoSlice = createSlice({
  name: 'bookmarkedVideo',
  initialState,
  reducers: {
    addBookmarkedVideo: (state, action) => {
      if(state.bookmarkedVideoList === null) {
        state.bookmarkedVideoList = [action.payload];
      } else {
        state.bookmarkedVideoList.push(action.payload);
      }
    },
    removeBookmarkedVideo: (state, action) => {
      if (state.bookmarkedVideoList !== null) {
        state.bookmarkedVideoList = state.bookmarkedVideoList.filter(bm => bm.id !== action.payload.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarkedVideos.fulfilled, (state, action) => {
        state.bookmarkedVideoList = action.payload;
      })
      .addCase(getBookmarkedVideos.rejected, (state, action) => {
        state.bookmarkedVideoList = null;
        console.error('ブックマークリスト取得失敗', action.payload);
      });
  }
});

export const {addBookmarkedVideo, removeBookmarkedVideo } = bookmarkedVideoSlice.actions;
export default bookmarkedVideoSlice.reducer;
