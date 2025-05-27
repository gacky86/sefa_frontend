import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchMode, dictionaryRes } from "interfaces/index";

type AIDictionaryState = {
  searchMode: SearchMode,
  response: dictionaryRes[] | null,
  keyword: string,
  selectedFlashcardId: number | null,
  language: string
}

const initialState: AIDictionaryState = {
  searchMode: 'JPtoEN',
  response: null,
  keyword: '',
  selectedFlashcardId: null,
  language: '英語'
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
      state.selectedFlashcardId = Number(action.payload);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.response = null;
      state.keyword = '';
    }
  }
});

export const { setResponse, setKeyword, switchSearchMode, updateData, setFlashcardId, setLanguage } = aiDictionarySlice.actions;
export default aiDictionarySlice.reducer;
