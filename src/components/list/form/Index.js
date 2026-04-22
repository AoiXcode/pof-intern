import { useEffect, useState } from "react";
import { Bottom } from "../../navigations/Bottom";
import { useHistory } from "react-router-dom";

// ✅ Decode ID
const decodeId = (id) => Number(atob(id));

export const Form = ({ match, form, setForm, lcases, setLcases }) => {

  const history = useHistory();
  const { selected } = match.params;

  const realId = selected ? decodeId(selected) : null;

  const [showModal, setShowModal] = useState(false);

  // 🔄 LOAD DATA (EDIT MODE)
  useEffect(() => {
    if (realId) {
      const data = lcases.find((l) => l.id === realId);

      if (data) {
        setForm({
          method: "update",
          inputs: {
            name: { value: data.name, stat: true, msg: "" },
            case: { value: data.case, stat: true, msg: "" },
            city: { value: data.city, stat: true, msg: "" },
          },
        });
      }
    } else {
      setForm({
        method: "create",
        inputs: {
          name: { value: "", stat: true, msg: "" },
          case: { value: "", stat: true, msg: "" },
          city: { value: "", stat: true, msg: "" },
        },
      });
    }
  }, [selected, lcases]);

  // 📝 INPUT HANDLER + LIVE VALIDATION
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [name]: {
          value,
          stat: value !== "",
          msg: value === "" ? "This field is required" : "",
        },
      },
    }));
  };

  // ✅ VALIDATION FUNCTION
  const validateForm = () => {
    let valid = true;

    const updatedInputs = { ...form.inputs };

    Object.keys(updatedInputs).forEach((key) => {
      if (updatedInputs[key].value === "") {
        updatedInputs[key] = {
          ...updatedInputs[key],
          stat: false,
          msg: "This field is required",
        };
        valid = false;
      } else {
        updatedInputs[key] = {
          ...updatedInputs[key],
          stat: true,
          msg: "",
        };
      }
    });

    setForm((prev) => ({
      ...prev,
      inputs: updatedInputs,
    }));

    return valid;
  };

  // MODAL
  const openModal = () => {
    if (!validateForm()) return; // ❌ BLOCK
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // 💾 SAVE
  const confirmSave = () => {

    if (form.method === "update") {
      const updated = lcases.map((item) =>
        item.id === realId
          ? {
              ...item,
              name: form.inputs.name.value,
              case: Number(form.inputs.case.value),
              city: form.inputs.city.value,
            }
          : item
      );

      setLcases(updated);
    } else {
      setLcases([
        ...lcases,
        {
          id: Date.now(),
          date: new Date().toISOString(),
          name: form.inputs.name.value,
          case: Number(form.inputs.case.value),
          city: form.inputs.city.value,
        },
      ]);
    }

    // 🔄 RESET FORM
    setForm({
      method: "create",
      inputs: {
        name: { value: "", stat: true, msg: "" },
        case: { value: "", stat: true, msg: "" },
        city: { value: "", stat: true, msg: "" },
      },
    });

    setShowModal(false);
    history.push("/list");
  };

  return (
    <div className="form-main-container">

      {/* TITLE */}
      <div className="form-container-1">
        {form.method === "create" ? "Create" : "Update"} a Case
      </div>

      {/* FORM */}
      <div className="form-container-2">

        {/* NAME */}
        <div>
          <label>Complete Name</label>
          <input
            type="text"
            name="name"
            value={form.inputs.name.value}
            onChange={inputHandler}
            className={!form.inputs.name.stat ? "error-input" : ""}
          />
          {!form.inputs.name.stat && (
            <span className="error-text">{form.inputs.name.msg}</span>
          )}
        </div>

        {/* CASE */}
        <div>
          <label>Case</label>
          <select
            name="case"
            value={form.inputs.case.value}
            onChange={inputHandler}
            className={!form.inputs.case.stat ? "error-input" : ""}
          >
            <option value="">Select Case</option>
            <option value="1">Affected</option>
            <option value="2">Death</option>
            <option value="3">Recovered</option>
            <option value="4">Active</option>
            <option value="5">Serious</option>
          </select>

          {!form.inputs.case.stat && (
            <span className="error-text">{form.inputs.case.msg}</span>
          )}
        </div>

        {/* CITY */}
        <div>
          <label>City</label>
          <select
            name="city"
            value={form.inputs.city.value}
            onChange={inputHandler}
            className={!form.inputs.city.stat ? "error-input" : ""}
          >
            <option value="">Select City</option>
            <option value="Makati">Makati</option>
            <option value="Mandaluyong">Mandaluyong</option>
            <option value="Manila">Manila</option>
            <option value="Pasig">Pasig</option>
            <option value="Taguig">Taguig</option>
          </select>

          {!form.inputs.city.stat && (
            <span className="error-text">{form.inputs.city.msg}</span>
          )}
        </div>

        <button onClick={openModal}>Save Case</button>
      </div>

      {/* MODAL */}
      {showModal && (
         <div className="confirm-modal" onClick={closeModal}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>

       <div className="modal-icon">⚠️</div>

         <div className="modal-title">Confirm Save</div>
            <div className="modal-sub">
                Are you sure you want to save this case?
            </div>

                <div className="modal-actions">
                   <button className="yes" onClick={confirmSave}>
                    Yes
                 </button>
                 <button className="no" onClick={closeModal}>
                  Cancel
              </button>
          </div>
          </div>
        </div>
      )}

      <Bottom />
    </div>
  );
};