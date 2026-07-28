import { useEffect, useState } from "react";
import { Bottom } from "../../navigations/Bottom";
import { useHistory } from "react-router-dom";

// Decode ID
const decodeId = (id) => Number(atob(id));

export const Form = ({ match, form, setForm, lcases, setLcases }) => {

  const history = useHistory();
  const { selected } = match.params;

  const realId = selected ? decodeId(selected) : null;

  const [showModal, setShowModal] = useState(false);

  // 🔥 LOADING + PROGRESS
  const [loading, setLoading] = useState(false);
  const [ setProgress] = useState(0);

  // 🔥 TOAST
  const [toast, setToast] = useState({ show: false, message: "" });

  // LOAD DATA (EDIT MODE)
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
  }, [selected,realId, lcases, setForm]);

  // INPUT
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

  // VALIDATE
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

  // OPEN MODAL
  const openModal = () => {
    if (!validateForm()) return;
    setShowModal(true);
  };

  const closeModal = () => {
    if (!loading) setShowModal(false);
  };

  // 💾 SAVE WITH LOADING + TOAST
  const confirmSave = () => {
    setLoading(true);
    setProgress(0);

    let fakeProgress = 0;

    const interval = setInterval(() => {
      fakeProgress += 20;
      setProgress(fakeProgress);

      if (fakeProgress >= 100) {
        clearInterval(interval);

        setTimeout(() => {

          // SAVE LOGIC
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
            const newCase = {
              id: Date.now(),
              date: new Date().toISOString(),
              name: form.inputs.name.value,
              case: Number(form.inputs.case.value),
              city: form.inputs.city.value,
            };

            setLcases([newCase, ...lcases]); // 🔥 NEW FIRST
          }

          // RESET FORM
          setForm({
            method: "create",
            inputs: {
              name: { value: "", stat: true, msg: "" },
              case: { value: "", stat: true, msg: "" },
              city: { value: "", stat: true, msg: "" },
            },
          });

          setLoading(false);
          setShowModal(false);

          // 🔥 TOAST SUCCESS
          setToast({
            show: true,
            message: "Case saved successfully!"
          });

          setTimeout(() => {
            setToast({ show: false, message: "" });
          }, 2000);

          // REFRESH LIST TRIGGER
          history.push("/list?reload=true");

        }, 500);
      }
    }, 300);
  };

  return (
    <div className="form-main-container">
      {loading && (
        <div className="global-loader">
        <div className="spinner"></div>
            <p>Saving case...</p>
      </div>
        )}
      {/* TOAST */}
      {toast.show && (
        <div className="toast">
          {toast.message}
        </div>
      )}

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
            className={!form.inputs.name.stat ? "error-input" : ""}
          />
          {!form.inputs.name.stat && (
            <span className="error-text">{form.inputs.name.msg}</span>
          )}
        </div>

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
        </div>

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
        </div>

        <button onClick={openModal}>
          Save Case
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="confirm-modal" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-title">Confirm Save</div>

            <div className="modal-sub">
              Are you sure you want to save this case?
            </div>


            <div className="modal-actions">
              <button
                className="yes"
                onClick={confirmSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Yes"}
              </button>

              <button
                className="no"
                onClick={closeModal}
                disabled={loading}
              >
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