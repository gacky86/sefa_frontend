// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

export interface FlashCard {
  id: number,
  userId: number,
  title: string,
  description?: string,
  shared: boolean,
  inputTarget: number,
  outputTarget: number
}

export interface Card {
  id: number,
  flashcardId: number,
  inputProficiency: number,
  outputProficiency: number,
  english: string,
  japanese: string,
  sourceVideoUrl?: string,
  reviewedDate?: string,
  sourceVideoTimestamp?: string
}
