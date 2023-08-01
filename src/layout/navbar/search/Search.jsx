import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Suggestion from "./Suggestion";
import {
  useLocationDispatch,
  useLocationState,
} from "../../../hooks/useLocation";
import { nanoid } from "nanoid";
import PrimaryButton from "../../../components/primaryButton";
import {
  isFetchingLocation,
  locationSearched,
} from "../../../utils/locationReducer";
import getLocationFromAddress from "../../../utils/getLocationFromAddress";
import handleOnEnter from "../../../utils/handleOnEnter";
import { toast } from "react-toastify";
import "./style.css";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const searchContainerRef = useRef();
  const searchInputRef = useRef();

  const { countriesData } = useLocationState();
  const dispatch = useLocationDispatch();

  useEffect(() => {
    const root = document.getElementById("root");
    root.addEventListener("click", handleOnClick);
    return () => {
      root.removeEventListener("click", handleOnClick);
    };
  }, []);

  function handleOnClick({ target }) {
    const { current: container } = searchContainerRef;
    const { current: input } = searchInputRef;
    if (target === input) {
      searchContainerRef.current.classList.add("active");
    }
    if (!container.classList.contains("active")) {
      return;
    }
    if (
      !(
        target === container ||
        target.parentElement === container ||
        target.parentElement.parentElement === container ||
        target.parentElement.parentElement.parentElement === container
      )
    ) {
      searchContainerRef.current.classList.remove("active");
    }
  }

  function handleOnChange({ target }) {
    const { value } = target;
    setSearchText(value);
    if (value.length >= 2) {
      let newSuggestionList = [];
      countriesData.forEach((country) => {
        const { country: countryName, cities } = country;
        cities.forEach((cityName) => {
          const upperCaseCountry = countryName.toUpperCase();
          const upperCaseCity = cityName.toUpperCase();
          const upperCaseValue = value.toUpperCase();
          if (
            upperCaseCountry.includes(upperCaseValue) ||
            upperCaseCity.includes(upperCaseValue)
          ) {
            const newSuggestion = { id: nanoid(10), countryName, cityName };
            newSuggestionList.push(newSuggestion);
          }
        });
      });
      //   const { country: countryName, cities } = country;
      //   cities.forEach((city) => {
      //     const upperCaseCity = city.toUpperCase();
      //     const upperCaseValue = value.toUpperCase();
      //     const newCountry = upperCaseCity.includes(upperCaseValue)
      //       ? { id: nanoid(10), countryName, city }
      //       : null;
      //     newCountry ? newSuggestionList.push(newCountry) : null;
      //   });
      // });
      setSuggestionList(newSuggestionList);
    } else {
      setSuggestionList([]);
    }
  }

  function handleOnSearch(address) {
    if (searchText.length < 2) {
      toast.warning("value length must be greater than 1");
      return;
    }
    if (address) {
      dispatch(isFetchingLocation());
      getLocationFromAddress(address)
        .then((data) => {
          const { lat, lng: long } = data.results[0].geometry;
          dispatch(locationSearched({ lat, long }));
        })
        .catch(() => {
          toast.error("location information isn't available");
        });
    }
  }

  function handleOnClear() {
    searchText ? setSearchText("") : null;
    suggestionList ? setSuggestionList([]) : null;
  }

  return (
    <div ref={searchContainerRef} className={`search-container`}>
      <input
        ref={searchInputRef}
        onChange={handleOnChange}
        className="transition rounded-outer"
        value={searchText}
        placeholder="type city or country here"
        type="text"
        onKeyDown={(e) => handleOnEnter(handleOnSearch, e, searchText)}
      />
      <PrimaryButton
        onClick={() => handleOnSearch(searchText)}
        className="search-button"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </PrimaryButton>
      <PrimaryButton
        onClick={handleOnClear}
        className={`clear-button ${searchText ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={faXmark} />
      </PrimaryButton>
      <ul className="suggestion-list transition">
        {suggestionList.length !== 0 ? (
          suggestionList.map((suggestion) => {
            const { countryName, cityName } = suggestion;
            return (
              <Suggestion
                key={suggestion.id}
                handleOnSearch={handleOnSearch}
                data={{
                  country: countryName,
                  city: cityName,
                }}
              />
            );
          })
        ) : searchText.length !== 0 ? (
          <li className="unavailable-city text-center">city isn't available</li>
        ) : (
          <li className="empty-list text-center">no place available</li>
        )}
      </ul>
    </div>
  );
}

export default Search;
