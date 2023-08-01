import { toast } from "react-toastify";
import InputField from "../../../components/inputField";
import useFields from "../../../hooks/useFields";
import getLocationFromAddress from "../../../utils/getLocationFromAddress";
import handleOnEnter from "../../../utils/handleOnEnter";
import { useState } from "react";
import { useMainDispatch } from "../../../hooks/useMain";
import { setDefaultLocation } from "../../../utils/mainReducer";
import PrimaryButton from "../../../components/primaryButton";

function DefaultLocation() {
  const [{ country, state, city }, handleOnChange] = useFields({
    country: "",
    state: "",
    city: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useMainDispatch();

  function handleOnSubmit(e) {
    e.preventDefault();
    if (country.length >= 2 && state.length >= 2 && city.length >= 2) {
      setIsFetching(true);
      getLocationFromAddress(`${city}, ${state}, ${country}`)
        .then((data) => {
          setIsFetching(false);
          if (data.results.length > 0) {
            const { lat, lng: long } = data.results[0].geometry;
            const defaultLocation = JSON.parse(
              localStorage.getItem("defaultLocation")
            );
            if (
              !defaultLocation ||
              (lat !== defaultLocation.lat && long !== defaultLocation.long)
            ) {
              localStorage.setItem(
                "defaultLocation",
                JSON.stringify({ lat, long })
              );
              dispatch(setDefaultLocation({ lat, long }));
              toast.success("Location has been successfully registered");
              return;
            }
            toast.warning("This Location has already set");
            return;
          }
          toast.error("Location information isn't available");
        })
        .catch(() => {
          toast.error("Location information isn't available");
          setIsFetching(false);
        });
    } else {
      toast.warning("Input values ​​must have a length greater than one");
    }
  }

  function handleOnClearDefaultLocation() {
    const defaultLocation = localStorage.getItem("defaultLocation");
    if (defaultLocation) {
      localStorage.removeItem("defaultLocation");
      dispatch(setDefaultLocation(null));
      toast.success("Location has been removed successfully");
    } else {
      toast.info("No location has been set");
    }
  }

  function successfulSetDefaultLocation(lat, long) {
    localStorage.setItem("defaultLocation", JSON.stringify({ lat, long }));
    dispatch(setDefaultLocation({ lat, long }));
    toast.success("Location has been successfully registered");
  }

  return (
    <form onSubmit={handleOnSubmit} className="default-location-container">
      <InputField
        type="text"
        name="country"
        value={country}
        handleOnChange={handleOnChange}
        isFucos
        isMarginBottom
        placeholder="Enter country"
      />
      <InputField
        type="text"
        name="state"
        value={state}
        handleOnChange={handleOnChange}
        isMarginBottom
        placeholder="Enter state"
      />
      <InputField
        type="text"
        name="city"
        value={city}
        handleOnChange={handleOnChange}
        placeholder="Enter city"
        handleOnKeyDown={(e) => handleOnEnter(handleOnSubmit, e, e)} // because we need event object also for handleOnSubmit . see handleOnEnter , then you understand my code
      />
      <div className="button-container">
        <input
          className="submit-button primary-button transition text-center flex-center text-color-primary cursor-pointer rounded-outer"
          type="submit"
          value="submit"
          disabled={isFetching}
        />
        <PrimaryButton
          className="clear-button"
          onClick={handleOnClearDefaultLocation}
          buttonType="button"
        >
          clear default location
        </PrimaryButton>
      </div>
    </form>
  );
}

export default DefaultLocation;
