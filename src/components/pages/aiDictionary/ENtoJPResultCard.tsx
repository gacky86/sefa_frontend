import { dictionaryRes } from "interfaces/index";
import Checkbox from "components/pages/aiDictionary/Checkbox";
import { useDispatch } from "react-redux";
import { updateData } from "store/aiDictionarySlice";

const ENtoJPResultCard = ({id, data}: {id:number, data: dictionaryRes}) => {
  const dispatch = useDispatch();
  const setChecked = () => {
    dispatch(updateData({id: id, data: {...data, checked: !data.checked}}));
  }

  return (
    <div className="grid grid-cols-8 grid-rows-2 border-1 border-gray-400 rounded-sm mx-auto w-[90%] mb-2">
      <div className="row-span-2 pl-2 mt-2"><Checkbox checked={data.checked} setChecked={setChecked}/></div>
      <div className="col-span-7 row-span-2 mr-1">
        <h4 className="border-b-1 border-gray-400">{data.wordOrPhrase}</h4>
        <div className="border-b-1 border-gray-400">
          <h4 className="text-sm">文脈・ニュアンス</h4>
          <p>{data.context}</p>
        </div>
        <div>
          <h4 className="text-sm">例文</h4>
          <p>{data.example}</p>
        </div>
      </div>
    </div>
  )
}

export default ENtoJPResultCard
