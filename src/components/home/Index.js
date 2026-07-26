import { useEffect, useState } from "react";

import { Bottom } from "../navigations/Bottom";
import { Top } from "../navigations/Top";
import { Banner } from "./Banner";
import { Contacts } from "./contacts/Index";
import { HomeSummary } from "./HomeSummary";
import { HomeStats } from "./HomeStats";
import { HomeInsights } from "./HomeInsights";
import { Prevention } from "./prevention/Index";

import "../../assets/css/home.css";

export const Home = ({ lcases }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate API load (same as List)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
  fetch("http://localhost:5000/")
    .then((res) => res.text())
    .then((data) => console.log(data));
}, []);

  return (
    <div className="home">

     {isLoading ? (
  <div className="page-skeleton">

    {/* TOP BAR */}
    <div className="skeleton-topbar">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-text-sm"></div>
      <div className="skeleton skeleton-icon"></div>
    </div>

    {/* HERO */}
    <div className="skeleton skeleton-hero">
      <div className="skeleton skeleton-text-md"></div>
      <div className="skeleton skeleton-text-lg"></div>
      <div className="skeleton-row">
        <div className="skeleton skeleton-button"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>

    {/* STATS */}
    <div className="skeleton-grid-3">
      <div className="skeleton skeleton-card"></div>
      <div className="skeleton skeleton-card"></div>
      <div className="skeleton skeleton-card"></div>
    </div>

    {/* INSIGHTS */}
    <div className="skeleton-grid-2">
      <div className="skeleton skeleton-card-sm"></div>
      <div className="skeleton skeleton-card-sm"></div>
    </div>

    {/* PREVENTION */}
    <div className="skeleton-prevention">
      {[1,2,3].map(i => (
        <div key={i} className="skeleton-center">
          <div className="skeleton skeleton-circle"></div>
          <div className="skeleton skeleton-line"></div>
        </div>
      ))}
    </div>

    {/* BANNER */}
    <div className="skeleton skeleton-banner"></div>

  </div>
) : (
        /* ================= REAL CONTENT ================= */
        <>
          <div className="home-header-1">
            <Top />
            <Contacts />
          </div>

          <HomeStats lcases={lcases} />
          <HomeInsights lcases={lcases} />
          {/* <HomeSummary lcases={lcases} /> */}

          <Prevention />
          <Banner />

          <div className="home-footer-1">
            <Bottom />
          </div>
        </>
      )}

    </div>
  );
};