import { createSlice } from "@reduxjs/toolkit";
import { SearchMode } from "interfaces/index";

type AIDictionaryState = {
  searchMode: SearchMode
}

const initialState: AIDictionaryState = {
  searchMode: 'JPtoEN'
}

const aiDictionarySlice = createSlice({
  name: 'aiDictionary',
  initialState,
  reducers: {
    setSearchMode: (state, action) => {
      state.searchMode = action.payload;
    }
  }
});

export const { setSearchMode } = aiDictionarySlice.actions;
export default aiDictionarySlice.reducer;
