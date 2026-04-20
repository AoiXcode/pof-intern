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

  // 🔄 LOAD DATA IF EDIT MODE
  useEffect(() => {
    if (realId) {
      const data = lcases.find((l) => l.id === realId);

      if (data) {
        setForm((prev) => ({
          ...prev,
          method: "update",
          inputs: {
            name: { value: data.name },
            case: { value: data.case },
            city: { value: data.city },
          },
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        method: "create",
        inputs: {
          name: { value: "" },
          case: { value: "" },
          city: { value: "" },
        },
      }));
    }
  }, [selected, lcases]);

  // 📝 INPUT HANDLER
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [name]: { value },
      },
    }));
  };

  // MODAL
  const openModal = () => setShowModal(true);
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
        name: { value: "" },
        case: { value: "" },
        city: { value: "" },
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

        <div>
          <label>Complete Name</label>
          <input
            type="text"
            name="name"
            value={form.inputs.name.value}
            onChange={inputHandler}
          />
        </div>

        <div>
          <label>Case</label>
          <select
            name="case"
            value={form.inputs.case.value}
            onChange={inputHandler}
          >
            <option value="">Select Case</option>
            <option value="1">Affected</option>
            <option value="2">Death</option>
            <option value="3">Recovered</option>
            <option value="4">Active</option>
            <option value="5">Serious</option>
          </select>
        </div>

        <div>
          <label>City</label>
          <select
            name="city"
            value={form.inputs.city.value}
            onChange={inputHandler}
          >
            <option value="">Select City</option>
            <option value="Makati">Makati</option>
            <option value="Mandaluyong">Mandaluyong</option>
            <option value="Manila">Manila</option>
            <option value="Pasig">Pasig</option>
            <option value="Taguig">Taguig</option>
          </select>
        </div>

        <button onClick={openModal}>Save Case</button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="confirm-modal" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-title">Save this case?</div>

            <div className="modal-actions">
              <button className="yes" onClick={confirmSave}>
                Yes
              </button>
              <button className="no" onClick={closeModal}>
                No
              </button>
            </div>

          </div>
        </div>
      )}

      <Bottom />
    </div>
  );
};