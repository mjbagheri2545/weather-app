import { useState, useEffect, useRef, useReducer } from "react";
import PrimaryButton from "../../../components/primaryButton";
import Modal from "../../../components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import CloseModal from "./CloseModal";
import Tooltip from "../../../components/tootltip";
import {
  azanReducer,
  cancel,
  closeModal,
  hide,
  initialState,
  play,
  show,
  soundControll,
  close,
} from "../../../utils/azanReducer";
import "./style.css";

function AzanModal({ setActiveAzan, activeAzan }) {
  const [
    {
      isPlay,
      isSoundActive,
      isModalActive,
      isOpenButtonActive,
      isUserWantToClose,
    },
    dispatch,
  ] = useReducer(azanReducer, initialState);
  const [azanAudio, setAzanAudio] = useState(
    new Audio(
      `${import.meta.env.VITE_APP_PUBLIC_URL}/music/Ahang Azan Moazenzade.mp3`
    )
  );
  const rangeInputProgressRef = useRef();
  const rangeInputRef = useRef();

  useEffect(() => {
    azanAudio.preload = "none";
    azanAudio.loop = false;
    rangeInputRef.current.value = 0;
    azanAudio.addEventListener("canplay", handleCanPlay);
    azanAudio.addEventListener("timeupdate", handleTimeUpdate);
    azanAudio.addEventListener("ended", handleOnClose);
    return () => {
      azanAudio.removeEventListener("canplay", handleCanPlay);
      azanAudio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [handleCanPlay, handleTimeUpdate, handleOnClose]);

  function handleCanPlay() {
    azanAudio ? (rangeInputRef.current.max = azanAudio.duration) : null;
  }
  function handleTimeUpdate() {
    if (azanAudio) {
      rangeInputRef.current.value = azanAudio.currentTime;
      rangeInputProgressWidth(azanAudio.currentTime);
    }
  }
  useEffect(() => {
    isPlay ? azanAudio.play() : azanAudio.pause();
  }, [isPlay, azanAudio]);

  useEffect(() => {
    azanAudio.muted = isSoundActive ? false : true;
  }, [isSoundActive, azanAudio]);

  function handleOnPlay() {
    dispatch(play());
  }
  function handleOnSoundControll() {
    dispatch(soundControll());
  }
  function handleOnHide() {
    dispatch(hide());
  }
  function handleOnShow() {
    dispatch(show());
  }
  function handleOnCloseModal() {
    dispatch(closeModal());
  }
  function handleOnCancel() {
    dispatch(cancel());
  }
  function handleOnClose() {
    dispatch(close());
    azanAudio.muted = true;
    azanAudio.src = "";
    setActiveAzan("");
  }
  function handleOnChange({ target }) {
    const { value } = target;
    azanAudio.currentTime = value;
  }
  function handleOnInput({ target }) {
    const { value } = target;
    rangeInputProgressWidth(value);
  }
  function rangeInputProgressWidth(value) {
    rangeInputProgressRef.current.style.setProperty(
      "--range-input-value",
      `${(value / azanAudio.duration) * 100}%`
    );
  }
  return (
    <>
      {isModalActive ? <div className="black-background"></div> : null}
      <Modal className="azan-modal" isActive={isModalActive}>
        <div className="img-container flex-center">
          <img
            src={`${import.meta.env.VITE_APP_PUBLIC_URL}/icons/mosque.png`}
            alt="mosque"
          />
        </div>
        <h3 className="active-azan text-center fs-4">azan {activeAzan}</h3>
        <div className="audio-player flex-center">
          <PrimaryButton onClick={handleOnPlay} className="play-button">
            <FontAwesomeIcon
              className={`fs-3 transition ${isPlay ? "active" : ""}`}
              icon={faPause}
            />
            <FontAwesomeIcon
              className={`fs-3 transition ${isPlay ? "" : "active"}`}
              icon={faPlay}
            />
          </PrimaryButton>
          <div className="range-input-container align-center">
            <div className="bar">
              <div ref={rangeInputProgressRef} className="progress"></div>
            </div>
            <input
              ref={rangeInputRef}
              onChange={handleOnChange}
              onInput={handleOnInput}
              className="range-input"
              type="range"
            />
          </div>
          <PrimaryButton
            onClick={handleOnSoundControll}
            className="sound-controller-button"
          >
            <FontAwesomeIcon
              className={`fs-2 transition ${isSoundActive ? "active" : ""}`}
              icon={faVolumeHigh}
            />
            <FontAwesomeIcon
              className={`fs-2 transition ${isSoundActive ? "" : "active"}`}
              icon={faVolumeXmark}
            />
          </PrimaryButton>
        </div>
        <div className="button-container">
          <PrimaryButton
            onClick={handleOnCloseModal}
            className="close-button rounded-inner fs-2"
          >
            close
          </PrimaryButton>
          <PrimaryButton
            onClick={handleOnHide}
            className="hide-button rounded-inner fs-2"
          >
            hide
          </PrimaryButton>
        </div>
        <CloseModal
          isActive={isUserWantToClose}
          handleOnCancel={handleOnCancel}
          handleOnClose={handleOnClose}
        />
      </Modal>
      <PrimaryButton
        onClick={handleOnShow}
        className={`open-azan-modal-button tooltip-container fs-3 ${
          isOpenButtonActive ? "active" : ""
        }`}
      >
        <Tooltip text="open azan modal" />
        <FontAwesomeIcon icon={faMusic} />
      </PrimaryButton>
    </>
  );
}

export default AzanModal;
