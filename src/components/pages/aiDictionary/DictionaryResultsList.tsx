import DictionaryResultCard from "components/pages/aiDictionary/DictionaryResultCard";
import FatArrow from "assets/arrow.svg?react";

import { useSelector } from "react-redux";
import { RootState } from "store";

const DictionaryResultsList = () => {
  const { response } = useSelector((state:RootState) => state.aiDictionary);
  console.log(response);

  return (
    <div className="">
      {Array.isArray(response) ? (
        <>
          <FatArrow className="w-[70px] h-[60px] mx-auto"/>
          {response.length > 0 ? (
            response.map((data, index) => (
              <DictionaryResultCard key={index} id={index} data={data}/>
            ))
          ) : (
            <>
              <p>該当する単語・表現が見つかりません</p>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default DictionaryResultsList
