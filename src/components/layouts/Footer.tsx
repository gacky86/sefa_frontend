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

  return (
    <div className="h-[56px] pt-2 px-5 bg-white border-t-1 border-gray-300 fixed bottom-0 w-screen">
      {isSignedIn ? (
        // ログイン時Footer
        // <FooterSignedIn />
        // 単語帳学習時Footer
        // <FooterFCLearningQuestion />
        <FooterFCLearningAnswer />
      ) : (
        // ログアウト時Footer
        <FooterSignedOut />
      )}
    </div>
  )
}

export default Footer
