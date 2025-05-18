import client from "lib/api/client"

import { SignUpParams, SignInParams } from "interfaces/index"

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams)  => {
  return client.post("auth/sign_in", params)
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out")
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {

  // if (!authHeader) return
  return client.get("/auth/sessions")
}
