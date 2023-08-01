import LocationProvider from "./locationProvider";
import DaysDataProvider from "./daysDataProvider";
import MainProvider from "./mainProvider";

function Provider({ children }) {
  return (
    <MainProvider>
      <LocationProvider>
        <DaysDataProvider>{children}</DaysDataProvider>
      </LocationProvider>
    </MainProvider>
  );
}

export default Provider;
