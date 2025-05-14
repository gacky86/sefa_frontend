import { dictionaryRes } from "interfaces/index";

import { useSelector } from "react-redux";
import { RootState } from "store";

import ENtoJPResultCard from "components/pages/aiDictionary/ENtoJPResultCard";
import JPtoENResultCard from "components/pages/aiDictionary/JPtoENResultCard";

const DictionaryResultCard = ({id, data}: {id:number, data: dictionaryRes}) => {
  const { searchMode } = useSelector((state:RootState) => state.aiDictionary);

  switch (searchMode) {
    case  'ENtoJP':
      return <ENtoJPResultCard id={id} data={data}/>
    case  'JPtoEN':
      return <JPtoENResultCard id={id} data={data}/>
    default:
      break;
  }
}

export default DictionaryResultCard
