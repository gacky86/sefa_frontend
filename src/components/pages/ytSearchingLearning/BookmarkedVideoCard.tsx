import VideoBookmarkBtn from "components/pages/ytSearchingLearning/VideoBookmarkBtn";


const BookmarkedVideoCard = () => {
  return (
    <div className='w-[145px] h-[145px] px-2 pt-2 border-1 border-gray-400 rounded-md bg-white'>
      {/* image */}
      <div className='bg-black w-[100%] h-[60%] rounded-md'>c</div>
      {/* bookmark btn */}
      {/* icon */}
      {/* title */}
      <div className='grid grid-cols-8 grid-rows-1 mt-1'>
        <div className='col-span-2 rounded-full bg-black w-[20px] h-[20px]'>s</div>
        <div className='col-span-5 col-start-3 text-sm/4 text-black'>Vlog:Daily conversation in</div>
        <div className="col-start-8">
          <VideoBookmarkBtn/>
        </div>
      </div>

    </div>
  )
}

export default BookmarkedVideoCard
