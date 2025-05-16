import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Flashcard, Card } from "interfaces/index";

import { AxiosError } from "axios";

// api
import { getCardToLearn } from "lib/api/flashcard";

export const fetchCardToLearn = createAsyncThunk(
  'fcLearning/fetchCardToLearn',
  async (flashcardId: number, { rejectWithValue, getState }) => {
    try {
      // learningMode stateを使うためにgetState
      const state = getState() as { fcLearning: fcLearningState };
      const learningMode = state.fcLearning.learningMode;
      // 連続して同じカードを出さないように、既存のcard stateもbackendに送る
      const lastCard = state.fcLearning.card;
      let lastCardId;
      if (lastCard === null) {
        lastCardId = -1
      } else {
        lastCardId = lastCard.id
      }

      if (!learningMode) {
        return rejectWithValue('学習モードが設定されていません');
      }

      // 学習するカードをbackendから取得する
      const response = await getCardToLearn(flashcardId, learningMode, lastCardId);
      console.log(response);

      return response.data as Card;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data?.error || 'カードの取得に失敗しました');
    }
  }
);

type fcLearningState = {
  // 学習モード(Input | Output | 学習モード以外のページ)
  learningMode: "input" | "output" | null;
  // flashcardオブジェクト
  flashcard: Flashcard | null;
  // cardオブジェクト
  card: Card | null;
  // 回答中か否か
  userThinking: boolean | null;
}

const initialState: fcLearningState = {
  learningMode: null,
  flashcard: null,
  card: null,
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
      state.learningMode = initialState.learningMode;
      state.flashcard = initialState.flashcard;
      state.userThinking = initialState.userThinking;
      state.card = initialState.card;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardToLearn.fulfilled, (state, action) => {
        state.card = action.payload;
      })
      .addCase(fetchCardToLearn.rejected, (state, action) => {
        state.card = null
        console.error('カード取得失敗:', action.payload);
      });
  }
});

export const {startLearning, clearFCLearning, setUserThinking} = fcLearningSlice.actions;
export default fcLearningSlice.reducer;
