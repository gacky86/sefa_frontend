// card.ts
// 役割：HTTPリクエストを定義すること
import client from './client';
import { Card } from "../../interfaces/index";

// 一覧
export const getCardList = () => {
  return client.get('/cards');
};

// 詳細
export const getCardDetail = (id: number) => {
  return client.get(`/cards/${id}`);
};

// 新規作成
export const createCard = (params: Card) => {
  return client.post('/cards', params);
};

// 更新
export const updateCard = (id: number, params: Card) => {
  return client.patch(`/cards/${id}`, params);
};

// 削除
export const deleteCard = (id: number) => {
  return client.delete(`/cards/${id}`);
};
