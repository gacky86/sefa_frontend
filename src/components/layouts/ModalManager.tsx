// Redux
import { useSelector } from "react-redux";
import { RootState } from "store/index";

// Components
import NewFlashcard from "components/pages/flashcards/NewFlashcard"
import FlashcardDetailModal from "components/pages/flashcards/FlashcardDetail";
import FlashcardSettingModal from "components/pages/flashcards/FlashcardSetting";
import CardsList from "components/pages/flashcards/CardsList";
import CardEdit from "components/pages/flashcards/CardEdit";
import NewCard from "components/pages/flashcards/NewCard";
import FlashcardDelete from "components/pages/flashcards/FlashcardDelete";

const ModalManager = () => {
  const { isVisible, modalType, modalProps } = useSelector((state: RootState) => state.modal);

  if (!isVisible) return null;

  switch (modalType) {
    case 'flashcard':
      return <FlashcardDetailModal flashcard={modalProps} />;
    case 'newFlashcard':
      return <NewFlashcard />;
    case 'flashcardSetting':
      return <FlashcardSettingModal flashcard={modalProps} />;
    case 'cardsList':
      return <CardsList flashcard={modalProps} />;
    case 'cardEdit':
      return <CardEdit flashcard={modalProps.flashcard} card={modalProps.card}/>;
    case 'newCard':
      return <NewCard flashcard={modalProps} />;
    case 'flashcardDelete':
      return <FlashcardDelete  flashcard={modalProps} />;
    default:
      return null;
  }
};

export default ModalManager
