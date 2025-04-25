import { useDispatch } from "react-redux"
import { setUserThinking } from "store/fcLearningSlice";

const FooterFCLearning = () => {
  const dispatch = useDispatch();

  return (
    <div className="mx-auto text-center">
      <button className="text-white text-base bg-auqa-blue border-1 border-dark-navy-blue px-4 rounded-full mt-2"
              onClick={() => {dispatch(setUserThinking())}}>
        Show answer
      </button>
    </div>
  )
}

export default FooterFCLearning
