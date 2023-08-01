export const actionTypes = {
  PLAY: "play",
  SOUNDCONTROLL: "soundControll",
  HIDE: "hide",
  SHOW: "show",
  CLOSEMODAL: "closeModal",
  CANCEL: "cancel",
  CLOSE: "close",
};

export const initialState = {
  isPlay: true,
  isSoundActive: true,
  isModalActive: true,
  isOpenButtonActive: false,
  isUserWantToClose: false,
};

export function azanReducer(state = initialState, { type }) {
  switch (type) {
    case actionTypes.PLAY:
      return {
        ...state,
        isPlay: !state.isPlay,
      };
    case actionTypes.SOUNDCONTROLL:
      return {
        ...state,
        isSoundActive: !state.isSoundActive,
      };
    case actionTypes.HIDE:
      return {
        ...state,
        isModalActive: false,
        isOpenButtonActive: true,
      };
    case actionTypes.SHOW:
      return {
        ...state,
        isModalActive: true,
        isOpenButtonActive: false,
      };
    case actionTypes.CLOSEMODAL:
      return {
        ...state,
        isUserWantToClose: true,
      };
    case actionTypes.CANCEL:
      return {
        ...state,
        isUserWantToClose: false,
      };
    case actionTypes.CLOSE:
      return {
        ...initialState,
      };
  }
}

export function play() {
  return {
    type: actionTypes.PLAY
  }
}
export function soundControll() {
  return {
    type: actionTypes.SOUNDCONTROLL
  }
}
export function hide() {
  return {
    type: actionTypes.HIDE
  }
}
export function show() {
  return {
    type: actionTypes.SHOW,
  };
}
export function closeModal() {
  return {
    type: actionTypes.CLOSEMODAL,
  };
}
export function cancel() {
  return {
    type: actionTypes.CANCEL,
  };
}
export function close() {
  return {
    type: actionTypes.CLOSE,
  };
}

