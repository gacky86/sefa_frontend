// flashcard.ts
// 役割：HTTPリクエストを定義すること
import { FlashCard, Card } from "interfaces/index";

import client from 'lib/api/client';
import { getUserAuthHeader } from "lib/api/client";

// 一覧
export const getFlashcardList = () => {
  const authHeader = getUserAuthHeader();
  return client.get<FlashCard[]>('/flashcards', {headers: authHeader, params: { only_mine: "onlyMine" }});
};

// 詳細
export const getFlashcardDetail = (id: number) => {
  return client.get<FlashCard>(`/flashcards/${id}`);
};

// 新規作成
export const createFlashcard = (params: FlashCard) => {
  const authHeader = getUserAuthHeader();
  return client.post('/flashcards', params, { headers: authHeader });
};

// 更新
export const updateFlashcard = (id: number, params: FlashCard) => {
  const authHeader = getUserAuthHeader();
  return client.patch(`/flashcards/${id}`, params, { headers: authHeader });
};

// 削除
export const deleteFlashcard = (id: number) => {
  const authHeader = getUserAuthHeader();
  return client.delete(`/flashcards/${id}`, {headers: authHeader});
};

// 「学習するべき順番に並び替えたときの優先順位が一番目のカード」を取得
export const getCardToLearn = (flashcardId: number, learningMode: 'input' | 'output', lastCardId: number) => {
  const authHeader = getUserAuthHeader();
  return client.get(`/flashcards/${flashcardId}/card_to_learn`, {headers: authHeader, params: { learning_mode: learningMode, last_card_id: lastCardId } })
}

export const getCountsTodaysCards = (flashcardId: number) => {
  const authHeader = getUserAuthHeader();
  return client.get(`/flashcards/${flashcardId}/count_todays_cards`, {headers: authHeader})
}

export const getFlashcardProficiency = (flashcardId: number) => {
  const authHeader = getUserAuthHeader();
  return client.get(`/flashcards/${flashcardId}/flashcard_proficiency`, {headers: authHeader})
}
