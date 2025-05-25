// img
import FatArrow from "assets/arrow.svg?react";

// redux
import { useSelector } from "react-redux";
import { RootState } from "store";

// components
import DictionaryResultCard from "components/pages/aiDictionary/DictionaryResultCard";
import FlashcardRegisterForm from "components/pages/aiDictionary/FlashcardRegisterForm";

const DictionaryResultsList = () => {
  const { response } = useSelector((state:RootState) => state.aiDictionary);
  console.log(response);

  return (
    <div className="">
      {Array.isArray(response) ? (
        <>
          <FatArrow className="w-[70px] h-[60px] mx-auto"/>
          {response.length > 0 ? (
            <>
              {response.map((data, index) => (
                <DictionaryResultCard key={index} id={index} data={data} />
              ))}
              {/* 既存の単語帳へ登録するためのフォーム */}
              {/* 単語帳がない場合は、ここで新規作成もできる（後で実装） */}
              <FlashcardRegisterForm />
            </>
          ) : (
            <p>該当する単語・表現が見つかりません</p>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default DictionaryResultsList
