import ContentSidebar from "../../components/contentSidebar/ContentSidebar";
import MainContent from "../../components/mainContent";
import DynamicBg from "../../components/dynamicBg";

function Home() {
  return (
    <>
      <div className="main-container">
        <DynamicBg />
        <MainContent isFullStateCard dayCardPath="/home/days/" />
        <ContentSidebar />
      </div>
    </>
  );
}

export default Home;
