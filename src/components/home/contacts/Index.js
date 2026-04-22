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

  const [selected, setSelected] = useState(null);

  // 🔥 MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  // 🔥 SHAKE STATE
  const [shake, setShake] = useState(false);

  // 🔥 BUTTON HANDLER
  const btnHandler = (type) => {
    if (!selected) {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);

      return;
    }

    const data = lcountries.find((value) => value.id === selected);
    if (!data) return;

    setSelectedData(data);
    setActionType(type);
    setShowModal(true);
  };

  // 🔥 CONFIRM ACTION
  const confirmAction = () => {
    if (actionType === "call") {
      window.location.href = `tel:${selectedData.contact_num}`;
    } else {
      window.location.href = `sms:${selectedData.contact_num}`;
    }

    setShowModal(false);
  };

  return (
    <div>

      {/* HEADER */}
      <div className="home-container-1">
        <div><b>Covid-19</b></div>

        <Countries
          lcountries={lcountries}
          selected={selected}
          setSelected={setSelected}
          shake={shake}
        />
      </div>

      {/* CONTACT CARD */}
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
            onClick={() => btnHandler("sms")}
          >
            <img src={text} alt="icon" />
            Send SMS
          </div>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && selectedData && (
        <div className="confirm-modal" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-icon">
              {actionType === "call" ? "📞" : "💬"}
            </div>

            <div className="modal-title">
              {actionType === "call" ? "Call Hotline?" : "Send SMS?"}
            </div>

            <div className="modal-sub">
              {selectedData.name} <br />
              {selectedData.contact_num}
            </div>

            <div className="modal-actions">
              <button className="yes" onClick={confirmAction}>
                Confirm
              </button>

              <button className="no" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};