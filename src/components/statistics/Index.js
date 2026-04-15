import { Bottom } from "../navigations/Bottom"
import {Top} from "../navigations/Top"
import Summary from "./Summary";
import DailyGraph from "./DailyGraph";
import "../../assets/css/statistics.css"

export const Statistics = () => {
  return (
    <div className="statistics-page">
      <div className="top-section">
        <Top />

        <h2 className="title">Statistics</h2>

        <div className="toggle">
          <button className="active">My Country</button>
          <button>Global</button>
        </div>

        <div className="tabs">
          <span className="active">Total</span>
          <span>Today</span>
          <span>Yesterday</span>
        </div>

        <Summary />
      </div>

      {/* ⚪ WHITE SECTION */}
      <div className="bottom-section">
        <DailyGraph />
      </div>

      <Bottom />
    </div>
  );
};