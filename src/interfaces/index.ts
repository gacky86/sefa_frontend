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
  user_id: number,
  title: string,
  description: string,
  shared: boolean,
  input_target: string,
  output_target: string,
  input_progress: number,
  output_progress: number
}

export interface Card {
  id: number,
  flashcard_id: number,
  input_proficiency: number,
  output_proficiency: number,
  english: string,
  japanese: string,
  source_video_url?: string,
  reviewed_date?: string,
  source_video_timestamp?: string
}
