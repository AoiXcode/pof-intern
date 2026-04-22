import "../../../assets/css/countries.css";
import { useState } from "react";

export const Countries = ({ lcountries, selected, setSelected, shake }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`countries-wrapper ${shake ? "shake" : ""}`}>

      {/* Selected */}
      <div
        className="countries"
        onClick={() => setOpen(!open)}
      >
        {selected
          ? lcountries.find((c) => c.id === selected)?.name
          : "Select City"}
        <span className="arrow">▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="dropdown">
          {lcountries.map((c) => (
            <div
              key={c.id}
              className={`dropdown-item ${selected === c.id ? "active" : ""}`}
              onClick={() => {
                setSelected(c.id);
                setOpen(false);
              }}
            >
              {c.name}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};