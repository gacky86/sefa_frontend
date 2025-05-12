import { useSelector } from "react-redux";
import { RootState } from "store";
import VideoBookmarkBtn from "components/pages/ytSearchingLearning/VideoBookmarkBtn";
import { fetchChannelThumbnail } from "lib/api/youtube";
import { useEffect, useState } from "react";

const PlayingVideo = () => {
  const { video } = useSelector((state:RootState) => state.ytLearning);
  const {bookmarkedVideoList} = useSelector((state:RootState) => state.bookmarkedVideo);

  const [channelThumbnail, setChannelThumbnail] = useState<string>('');

  const isBookmarked = bookmarkedVideoList?.some(
    (bookmarkedVideo) => bookmarkedVideo.videoJson.id.videoId === video?.id.videoId
  );

  // 動画のタイトル中の#以降の部分を消去する
  const omitHashTagsFromVideoTitle = (title: string) => {
    const hashtagIndex = title.indexOf('#')
    if (hashtagIndex !== -1) {
      return title.substring(0, hashtagIndex);
    } else {
      return title;
    }
  }

  // チャンネルのサムネイルを取得する
  const handleFetchChannelThumbnail = async () => {
    if(video?.snippet.channelId) {
    try {
        const res = await fetchChannelThumbnail(video?.snippet.channelId);
        const channelInfo = JSON.parse(res.data.result).items;
        // console.log(channelInfo[0]);

        setChannelThumbnail(channelInfo[0].snippet.thumbnails.default.url);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    handleFetchChannelThumbnail();
  }, []);

  // videoからchannelのアイコンをYoutube APIから取得する？（）ChannelIdから直接いけるのか？

  return (
    <div>
      {video ? (
        <>
          <iframe
            id="player"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            allowFullScreen
            className="rounded-md mx-auto w-screen aspect-3/2"
          />
          <div className="flex justify-between mt-2 mx-3 border-b-1">
            <h3 className="text-xl">{omitHashTagsFromVideoTitle(video.snippet.title)}</h3>
            <div className="text-xl pt-1">
              <VideoBookmarkBtn video={video} bookmarked={isBookmarked ?? false}/>
            </div>
          </div>
          <div className="flex justify-end mx-3">
            <h4 className="mx-3 text-end text-sm pt-3">{video.snippet.channelTitle}</h4>
            <img className='rounded-full h-[32px] w-[32px] mt-2' src={channelThumbnail} />
          </div>
        </>
      ) : (
        <div>動画が見つかりませんでした</div>
      )}
    </div>
  )
}

export default PlayingVideo
