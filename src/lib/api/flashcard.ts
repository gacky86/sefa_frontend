// flashcard.ts
// 役割：HTTPリクエストを定義すること
import { FlashCard } from "interfaces/index";

import client from './client';

// 一覧
export const getFlashcardList = () => {
  return client.get<FlashCard[]>('/flashcards');
};

// 詳細
export const getFlashcardDetail = (id: number) => {
  return client.get<FlashCard>(`/flashcards/${id}`);
};

// 新規作成
export const createFlashcard = (params: FlashCard) => {
  return client.post('/flashcards', params);
};

// 更新
export const updateFlashcard = (id: number, params: FlashCard) => {
  return client.patch(`/flashcards/${id}`, params);
};

// 削除
export const deleteFlashcard = (id: number) => {
  return client.delete(`/flashcards/${id}`);
};
