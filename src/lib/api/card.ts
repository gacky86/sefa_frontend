// card.ts
// 役割：HTTPリクエストを定義すること
import client from './client';
import { Card, CardParams } from "interfaces/index";

// 一覧
export const getCardList = (flashcard_id: number) => {
  return client.get(`/flashcards/${flashcard_id}/cards`);
};

// 詳細
export const getCardDetail = (flashcard_id: number, id: number) => {
  return client.get(`/flashcards/${flashcard_id}/cards/${id}`);
};

// 新規作成
export const createCard = (flashcard_id: number, params: CardParams) => {
  return client.post(`/flashcards/${flashcard_id}/cards`, params);
};

// 更新
export const updateCard = (flashcard_id: number, id: number, params: Card) => {
  return client.patch(`/flashcards/${flashcard_id}/cards/${id}`, params);
};

// 削除
export const deleteCard = (flashcard_id: number, id: number) => {
  return client.delete(`/flashcards/${flashcard_id}/cards/${id}`);
};

// 単語帳学習機能難易度ボタンを押した時の処理
export const updateCardLearningFactor =  (
  flashcardId: number,
  id: number,
  difficulty: "Again"|"Hard"|"Good"|"Easy",
  learningMode: 'input' | 'output' ) => {
  return client.patch(`/flashcards/${flashcardId}/cards/${id}/update_learning_factor`, {difficulty: difficulty, learning_mode: learningMode});
};

export const getReviewInterval = (
  flashcardId: number,
  id: number,
  learningMode: 'input' | 'output') => {
  return client.get(`/flashcards/${flashcardId}/cards/${id}/fetch_review_interval`, {params: {learning_mode: learningMode}});
};
