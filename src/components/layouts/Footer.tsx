// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

// components
import FooterSignedIn from "components/layouts/footer/FooterSignedIn";
import FooterFCLearningQuestion from "components/layouts/footer/FooterFCLearningQuestion";
import FooterFCLearningAnswer from "components/layouts/footer/FooterFCLearningAnswer";
import FooterSignedOut from "components/layouts/footer/FooterSignedOut";

const Footer = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.auth);
  const { userThinking } = useSelector((state: RootState) => state.fcLearning);

  const signedInFooter = () => {
    // Reduxのstateでユーザーが回答中か否かを管理しており、その値をここでselectorで取得して表示を切り替える
    // それ以外の場合は通常のFooterを表示する
    switch (userThinking) {
      case true:
        return <FooterFCLearningQuestion />
      case false:
        return <FooterFCLearningAnswer />
      default:
        return <FooterSignedIn />
    }
  }

  return (
    <div className="h-[56px] pt-2 px-5 bg-white border-t-1 border-gray-300 fixed bottom-0 w-screen">
      {isSignedIn ? (
        signedInFooter()
      ) : (
        // ログアウト時Footer
        <FooterSignedOut />
      )}
    </div>
  )
}

export default Footer
