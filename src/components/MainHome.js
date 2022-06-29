import MainChart from "./MainChart";

const MainHome = ({func}) => {
  return (
    <div className="mainHome">
      <div className="mainChart">
        <MainChart func={func}/>
      </div>
    </div>
  );
};

export default MainHome;
