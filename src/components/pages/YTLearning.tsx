import PlayingVideo from "components/pages/ytSearchingLearning/PlayingVideo";
import VideoScript from "components/pages/ytSearchingLearning/VideoScript";
import SelectedWords from "components/pages/ytSearchingLearning/SelectedWords";
import RegisterWordsForm from "components/pages/ytSearchingLearning/RegisterWordsForm";
import { useSelector } from "react-redux";
import { RootState } from "store";

const YTLearning = () => {
  // YTLearningSliceを用意して以下のstateを保持する
  const { video } = useSelector((state:RootState) => state.ytLearning);

  // 動画のブックマーク登録・解除はブックマークボタンコンポーネントを使う
  // ブックマークコンポーネント内でAPIを実行する

  return (
    <div>
      {/* 動画を視聴するモードなら視聴用のコンポーネントを表示 */}
      <iframe
      id="player"
      width="640"
      height="360"
      src={`https://www.youtube.com/embed/${video?.id.videoId}`}
      allowFullScreen
      />
    </div>
  )
}

export default YTLearning
