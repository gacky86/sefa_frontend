import { createSlice } from "@reduxjs/toolkit";

import { FlashCard } from "interfaces/index";

type fcLearningState = {
  // 学習モード(Input | Output | 学習モード以外のページ)
  learningMode: "input" | "output" | null;
  // cardオブジェクト
  flashcard: FlashCard | null;
  // 回答中か否か
  userThinking: boolean | null;
}

const initialState: fcLearningState = {
  learningMode: null,
  // cardオブジェクト
  flashcard: null,
  // 回答中か否か
  userThinking: null,
}


const fcLearningSlice = createSlice({
  name: 'fcLearning',
  initialState,
  reducers: {
    startLearning(state, action) {
      state.learningMode = action.payload.learningMode;
      state.flashcard = action.payload.flashcard;
      state.userThinking = true;
    },
    setUserThinking(state) {
      state.userThinking = !state.userThinking;
    },
    clearFCLearning(state) {
      state = initialState;
    }
  }
});

export const {startLearning, clearFCLearning, setUserThinking} = fcLearningSlice.actions;
export default fcLearningSlice.reducer;
