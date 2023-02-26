import { useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Game from "./features/kino/Game";
import { selectSelectedGame, setSelectedGame } from "./features/kino/kinoSlice";

const ModalManager = () => {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(selectSelectedGame);

  const hideModal = useCallback(() => {
    dispatch(setSelectedGame(null));
  }, [dispatch]);

  return (
    <Modal
      show={!!selectedGame}
      onHide={hideModal}
      contentClassName="modal"
      size="sm"
      centered
    >
      <Modal.Body onClick={hideModal}>
        {selectedGame && <Game game={selectedGame} isSelected={true} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalManager;
