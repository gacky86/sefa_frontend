// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Components
import NewFlashCard from "../../components/pages/flashcards/NewFlashCard";
import FlashCardDetailModal from "../../components/pages/flashcards/FlashCardDetailModal";
import FlashCardSettingModal from "../../components/pages/flashcards/FlashCardSettingModal";
import CardsList from "../../components/pages/flashcards/CardsList";
import CardEdit from "../../components/pages/flashcards/CardEdit";
import NewCard from "../../components/pages/flashcards/NewCard";
import FlashCardDelete from "../../components/pages/flashcards/FlashCardDelete";

const ModalManager = () => {
  const { isVisible, modalType, modalProps } = useSelector((state: RootState) => state.modal);

  if (!isVisible) return null;

  switch (modalType) {
    case 'flashcard':
      return <FlashCardDetailModal flashcard={modalProps} />;
    case 'newFlashcard':
      return <NewFlashCard />;
    case 'flashcardSetting':
      return <FlashCardSettingModal flashcard={modalProps} />;
    case 'cardsList':
      return <CardsList flashcard={modalProps} />;
    case 'cardEdit':
      return <CardEdit flashcard={modalProps.flashcard} card={modalProps.card}/>;
      // return <CardEdit flashcard={modalProps} card={modalProps}/>;
    case 'newCard':
      return <NewCard  />;
    case 'flashcardDelete':
      return <FlashCardDelete  flashcard={modalProps} />;
    default:
      return null;
  }
};

export default ModalManager
