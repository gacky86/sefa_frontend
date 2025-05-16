type ToggleBtnProps = {
  shared: boolean;
  onClick: () => void;
}


const SharedSettingToggle = ({shared, onClick}: ToggleBtnProps) => {
  return (
    <div className="mx-auto w-[80%] border-b-1 py-3 grid grid-cols-2 grid-rows-1 content-between ">
      <div>
        <p className="text-left leading-none">公開 : {shared ? 'ON' : 'OFF'}</p>
      </div>
      <div className="flex justify-end">
        <div>
          <span onClick={onClick}
          className={`block w-[2em] cursor-pointer rounded-full p-[1px] transition-colors duration-300
          ${shared ? 'bg-blue-500' : 'bg-gray-500'}`}
          data-testid="flashcard-share-toggle">
            <span className={`block h-[1em] w-[1em] rounded-full bg-white transition-transform duration-300
            ${shared ? 'translate-x-[calc(100%-2px)]' : 'translate-x-0'}`}/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SharedSettingToggle
