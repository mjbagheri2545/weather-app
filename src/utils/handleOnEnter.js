function handleOnEnter(handler, e,...handlerArgs) {
  if (e.key === "Enter") {
    handler(...handlerArgs);
  }
}

export default handleOnEnter;
