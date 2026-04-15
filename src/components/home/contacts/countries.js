import "../../../assets/css/countries.css";
import { useState } from "react";

export const Countries = ({ lcountries, selected, setSelected }) => {
  const [view, setView] = useState(false);

  return (
    <div className="countries-wrapper">
      {/* Selected */}
      <div
        className="countries"
        onClick={() => setView(!view)}
      >
        {lcountries.find((c) => c.id === selected)?.name || "Select City"}
        <span className="arrow">▼</span>
      </div>

      {/* Dropdown */}
      {view && (
        <div className="dropdown">
          {lcountries.map((v) => (
            <div
              key={v.id}
              className={`dropdown-item ${
                selected === v.id ? "active" : ""
              }`}
              onClick={() => {
                setSelected(v.id);
                setView(false);
              }}
            >
              {v.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};