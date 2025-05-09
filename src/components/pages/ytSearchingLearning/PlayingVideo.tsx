import { useSelector } from "react-redux";
import { RootState } from "store";

const PlayingVideo = () => {
  const { video } = useSelector((state:RootState) => state.ytLearning);

  return (
    <div>
      <iframe
        id="player"
        width="280"
        height="173"
        src={`https://www.youtube.com/embed/${video?.id.videoId}`}
        allowFullScreen
        className="rounded-md mx-auto"
      />

    </div>
  )
}

export default PlayingVideo
