import MainContent from "../../components/mainContent";
import ContentSidebar from "../../components/contentSidebar";
import DynamicBg from "../../components/dynamicBg";

function Calendar() {
  return (
    <>
      <div className="main-container">
        <DynamicBg />
        <MainContent dayCardPath="/calendar/days/" />
        <ContentSidebar />
      </div>
    </>
  );
}

export default Calendar;
