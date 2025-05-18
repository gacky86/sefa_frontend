import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import Cookies from "js-cookie"

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3000/api/v1",
}), options);

// インターセプター(リクエストを送る直前に処理を割り込み)
client.interceptors.request.use((config) => {
  const authHeader = getUserAuthHeader();
  if (authHeader) {
    config.headers['access-token'] = authHeader["access-token"];
    config.headers['client'] = authHeader["client"];
    config.headers['uid'] = authHeader["uid"];
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 認証情報をheaderに追加するためのヘルパー関数
const getUserAuthHeader = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
}

export default client
