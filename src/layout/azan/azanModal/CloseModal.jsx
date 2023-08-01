import Modal from "../../../components/modal";
import PrimaryButton from "../../../components/primaryButton";

function CloseModal({ isActive, handleOnClose, handleOnCancel }) {
  return (
    <Modal className="azan-close-modal" isActive={isActive}>
      <p className="description fs-1">
        Are you sure you want to close? azan will be interrupted
      </p>
      <div className="button-container">
        <PrimaryButton
          onClick={handleOnClose}
          className="close-button rounded-inner"
        >
          close
        </PrimaryButton>
        <PrimaryButton
          onClick={handleOnCancel}
          className="cancel-button rounded-inner"
        >
          cancel
        </PrimaryButton>
      </div>
    </Modal>
  );
}

export default CloseModal;
