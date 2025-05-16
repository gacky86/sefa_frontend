import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchMode, dictionaryRes } from "interfaces/index";

type AIDictionaryState = {
  searchMode: SearchMode,
  response: dictionaryRes[] | null,
  keyword: string,
  selectedFlashcardId: number | null
}

const initialState: AIDictionaryState = {
  searchMode: 'JPtoEN',
  response: null,
  keyword: '',
  selectedFlashcardId: null
}

const aiDictionarySlice = createSlice({
  name: 'aiDictionary',
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    switchSearchMode: (state, action) => {
      state.searchMode = action.payload;
      state.response = null;
      state.keyword = '';
    },
    updateData: (state, action:PayloadAction<{ id: number; data: dictionaryRes }>) => {
      if (Array.isArray(state.response)) {
        state.response[action.payload.id] = action.payload.data;
      }
    },
    setFlashcardId: (state, action) => {
      state.selectedFlashcardId = action.payload;
    }
  }
});

export const { setResponse, setKeyword, switchSearchMode, updateData, setFlashcardId } = aiDictionarySlice.actions;
export default aiDictionarySlice.reducer;
