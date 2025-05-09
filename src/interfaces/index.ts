// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  // confirmSuccessUrl: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// createやupdateでこちらでparamsを生成する場合は、id, foreign_keyは扱わない(~Params)
// backendから取得するものに関しては、確実で安全なid, foreign_keyが取得できるものとして扱う

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

export interface FlashCardParams {
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

export interface CardParams {
  inputProficiency: number,
  outputProficiency: number,
  english: string,
  japanese: string,
  sourceVideoUrl?: string,
  reviewedDate?: string,
  sourceVideoTimestamp?: string
}

export type youtubeAPIResultItem = {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    title: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
};
