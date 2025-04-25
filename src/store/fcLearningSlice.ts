import { createSlice } from "@reduxjs/toolkit";

import { Card } from "interfaces/index";

type fcLearningState = {
  // 学習モード(Input | Output | 学習モード以外のページ)
  learningMode: "input" | "output" | null;
  // cardオブジェクト
  card: Card | null;
  // 回答中か否か
  userThinking: boolean;
}

const initialState: fcLearningState = {
  learningMode: null,
  // cardオブジェクト
  card: null,
  // 回答中か否か
  userThinking: true,
}


const fcLearningSlice = createSlice({
  name: 'fcLearning',
  initialState,
  reducers: {
    setLearningMode(state, action) {
      state.learningMode = action.payload;
    },
    setCard(state, action) {
      state.card = action.payload;
    },
    setUserThinking(state, action) {
      state.userThinking = action.payload;
    }
  }
});

export const {setLearningMode, setCard, setUserThinking} = fcLearningSlice.actions;
export default fcLearningSlice.reducer;
