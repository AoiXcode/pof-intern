import { useState } from "react";
import { Bottom } from "../navigations/Bottom";
import { Top } from "../navigations/Top";
import Summary from "./Summary";
import DailyGraph from "./DailyGraph";
import "../../assets/css/statistics.css";

export const Statistics = ({ lcases = [] }) => {

  // ✅ STATE FIRST
  const [activeTab, setActiveTab] = useState("total");

  // ✅ FILTER FUNCTION
  const filterData = () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return lcases.filter((item) => {
      // 🔥 fallback if no date
      const itemDate = item.date
        ? new Date(item.date).toDateString()
        : new Date(item.id).toDateString();

      if (activeTab === "today") {
        return itemDate === today.toDateString();
      }

      if (activeTab === "yesterday") {
        return itemDate === yesterday.toDateString();
      }

      return true; // total
    });
  };

  // ✅ CALL AFTER FUNCTION + STATE
  const filteredCases = filterData();

  return (
    <div className="statistics-page">

      <div className="top-section">
        <Top />

        <h2 className="title">Statistics</h2>

        <div className="toggle">
          <button className="active">My City</button>
          <button>Global</button>
        </div>

        {/* TABS */}
        <div className="swipe-tabs-wrapper">
          <div className="swipe-tabs">

            <div
              className={`tab ${activeTab === "total" ? "active" : ""}`}
              onClick={() => setActiveTab("total")}
            >
              Total
            </div>

            <div
              className={`tab ${activeTab === "today" ? "active" : ""}`}
              onClick={() => setActiveTab("today")}
            >
              Today
            </div>

            <div
              className={`tab ${activeTab === "yesterday" ? "active" : ""}`}
              onClick={() => setActiveTab("yesterday")}
            >
              Yesterday
            </div>

          </div>
        </div>

        <Summary lcases={filteredCases} />
      </div>

      <div className="bottom-section">
        <DailyGraph lcases={filteredCases} />
      </div>

      <Bottom />
    </div>
  );
};