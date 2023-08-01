
function Suggestion({data,handleOnSearch}) {
  const {city, country} = data;

  function handleOnClick() {
    handleOnSearch(`${city},+${country}`)
  }

  return (
    <li
      onClick={handleOnClick}
      className="suggestion transition cursor-pointer"
    >
      <span className="fs-1">{city}</span>
      <span className="country">{country}</span>
    </li>
  );
}

export default Suggestion;