import { useState } from "react";
import { Countries } from "./countries";
import text from "../../../assets/icons/text.svg";
import phone from "../../../assets/icons/phone.svg";

export const Contacts = () => {
  const [lcountries] = useState([
    { id: 1, name: "Makati", contact_num: "09171234567" },
    { id: 2, name: "Mandaluyong", contact_num: "09182345678" },
    { id: 3, name: "Manila", contact_num: "09193456789" },
    { id: 4, name: "Pasig", contact_num: "09204567890" },
    { id: 5, name: "Taguig", contact_num: "09215678901" },
  ]);

  // ❗ no default selected
  const [selected, setSelected] = useState(null);

  const btnHandler = (type) => {
    // ✅ validation
    if (!selected) {
      return alert("Please choose a city first");
    }

    const selectedData = lcountries.find(
      (value) => value.id === selected
    );

    if (!selectedData) return alert("Invalid selection");

    if (type === "call") {
      alert(`Calling ${selectedData.name}: ${selectedData.contact_num}`);
    } else if (type === "email") {
      alert(`Sending SMS to ${selectedData.name}: ${selectedData.contact_num}`);
    } else {
      alert("Wrong value");
    }
  };

  return (
    <div>
      <div className="home-container-1">
        <div><b>Covid-19</b></div>

        <Countries
          lcountries={lcountries}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <div className="home-container-2">
        <div>Are you feeling sick?</div>
        <div>
          If you feel sick with any covid-19 symptoms please call or SMS us immediately for help
        </div>

        <div>
          <div
            className="icons"
            onClick={() => btnHandler("call")}
          >
            <img src={phone} alt="icon" />
            Call now
          </div>

          <div
            className="icons"
            onClick={() => btnHandler("email")}
          >
            <img src={text} alt="icon" />
            Send sms
          </div>
        </div>
      </div>
    </div>
  );
};