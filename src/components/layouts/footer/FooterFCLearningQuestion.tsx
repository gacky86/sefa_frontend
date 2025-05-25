// Redux
import { useDispatch, useSelector } from "react-redux"
import { setUserThinking } from "store/fcLearningSlice";
import { RootState } from 'store/index';

// components
import FooterSignedIn from "components/layouts/footer/FooterSignedIn";

const FooterFCLearning = () => {
  const dispatch = useDispatch();
  const { card } = useSelector((state: RootState) => state.fcLearning);

  if(card) {
    return (
      <div className="mx-auto text-center">
        <button className="text-white text-base bg-auqa-blue border-1 border-dark-navy-blue px-4 rounded-full mt-2"
                onClick={() => {dispatch(setUserThinking())}}>
          Show answer
        </button>
      </div>
    )
  } else {
    return <FooterSignedIn />
  }
}

export default FooterFCLearning
