// なぜかここではbaseUrlが効かないので相対パスでimport
import client from "lib/api/client"
import { getUserAuthHeader } from "lib/api/client";
// import Cookies from "js-cookie"

// なぜかここではbaseUrlが効かないので相対パスでimport
import { SignUpParams, SignInParams } from "../../interfaces/index"

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
  const authHeader = getUserAuthHeader();
  return client.delete("auth/sign_out", { headers: authHeader })
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  const authHeader = getUserAuthHeader();

  if (!authHeader) return
  return client.get("/auth/sessions", { headers: authHeader })
}
