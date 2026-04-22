import { Link, useLocation } from "react-router-dom";
import house from "../../assets/images/house.svg";
import stats from "../../assets/images/stats.svg";
import add from "../../assets/icons/add.svg";
import "../../assets/css/navigations.css";

export const Bottom = () => {
  const location = useLocation();

  return (
    <div className="botom-container">
      <div className="nav-bottom">

        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <img src={house} alt="home" />
        </Link>

        <Link to="/statistics" className={`nav-item ${location.pathname === "/statistics" ? "active" : ""}`}>
          <img src={stats} alt="stats" />
        </Link>

        <Link to="/list" className={`nav-item ${location.pathname === "/list" ? "active" : ""}`}>
          <img src={add} alt="list" />
        </Link>

      </div>
    </div>
  );
};