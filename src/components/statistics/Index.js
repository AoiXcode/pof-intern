import { useState, useEffect } from "react";
import { Bottom } from "../navigations/Bottom";
import { Top } from "../navigations/Top";
import Summary from "./Summary";
import DailyGraph from "./DailyGraph";
import "../../assets/css/statistics.css";

export const Statistics = ({ lcases = [] }) => {

  const [activeTab, setActiveTab] = useState("total");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const filterData = () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    return lcases.filter((item) => {
      const itemDate = item.date
        ? new Date(item.date).toDateString()
        : new Date(item.id).toDateString();

      if (activeTab === "today") return itemDate === today.toDateString();
      if (activeTab === "yesterday") return itemDate === yesterday.toDateString();

      return true;
    });
  };

  const filteredCases = filterData();

  return (
    <div className="statistics-page">

      {isLoading ? (
  <div className="page-skeleton">

    {/* TOP PURPLE SECTION */}
    <div className="skeleton skeleton-top-section">

      {/* Top bar */}
      <div className="skeleton-topbar">
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton skeleton-icon"></div>
      </div>

      {/* Title */}
      <div className="skeleton skeleton-title"></div>

      {/* Toggle */}
      <div className="skeleton-toggle">
        <div className="skeleton skeleton-pill"></div>
        <div className="skeleton skeleton-pill"></div>
      </div>

      {/* Tabs */}
      <div className="skeleton-tabs-row">
        <div className="skeleton skeleton-tab"></div>
        <div className="skeleton skeleton-tab"></div>
        <div className="skeleton skeleton-tab"></div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="skeleton-summary">
        <div className="skeleton skeleton-big-card"></div>
        <div className="skeleton skeleton-big-card"></div>
      </div>

      <div className="skeleton-summary small">
        <div className="skeleton skeleton-small-card"></div>
        <div className="skeleton skeleton-small-card"></div>
        <div className="skeleton skeleton-small-card"></div>
      </div>

    </div>

    {/* GRAPH SECTION */}
    <div className="skeleton skeleton-graph-card"></div>

  </div>
) : (
        <>
          <div className="top-section">
            <Top />

            <h2 className="title">Statistics</h2>

            <div className="toggle">
              <button className="active">My City</button>
              <button>Global</button>
            </div>

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
        </>
      )}

    </div>
  );
};