import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Bottom } from "../navigations/Bottom";
import "../../assets/css/list.css";

import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/pencil.svg";

export const List = ({ lcases, cases, setLcases }) => {
  const history = useHistory();

  const [search, setSearch] = useState("");
  const [filterCase, setFilterCase] = useState("");

  // EDIT MODAL
  const [editData, setEditData] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCase, setSelectedCase] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const acHandler = () => {
    history.push("/list/form");
  };

  // ❌ DELETE
  const deleteHandler = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setLcases(lcases.filter((item) => item.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // 🔥 FILTER
  const filteredData = lcases.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCase = filterCase
      ? item.case === Number(filterCase)
      : true;

    return matchSearch && matchCase;
  });

  // 💾 UPDATE
  const saveEdit = () => {
    if (!editData.name || !editData.case || !editData.city) return;

    const updated = lcases.map((item) =>
      item.id === editData.id ? editData : item
    );

    setLcases(updated);
    setShowEditModal(false);
  };

  return (
    <div className="list-main-container">

      {/* ADD BUTTON */}
      <div className="list-container-1">
        <button onClick={acHandler}>Add Case</button>
      </div>

      {/* SEARCH */}
      <div className="list-controls">
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterCase}
          onChange={(e) => setFilterCase(e.target.value)}
        >
          <option value="">All Cases</option>
          {cases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* LIST */}
      <div className="list-container-2">
        <div className="list-data">

          {filteredData.length ? (
            filteredData.map((v) => {
              const caseData = cases.find((c) => c.id === v.case);

              return (
                <div key={v.id} className="list-card"  onClick={() => 
                  {setSelectedCase(v); setShowDetails(true);
                   }}>
                  <div className="card-left">
                    <div className="name">{v.name}</div>
                    <div className="city">{v.city}</div>

                    <div className={`badge ${caseData?.name?.toLowerCase()}`}>
                      {caseData?.name}
                    </div>
                  </div>

                  <div className="actions">

                    <img
                      src={editIcon}
                      alt="edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditData(v);
                        setShowEditModal(true);
                      }}
                    />

                  <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={(e) => {
                     e.stopPropagation();
                     deleteHandler(v.id);
                    }}
                  />
                  </div>

                </div>
              );
            })
          ) : (
            <div className="empty">No results found</div>
          )}

        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {showEditModal && editData && (
        <div className="confirm-modal" onClick={() => setShowEditModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-title">Edit Case</div>

            <input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              placeholder="Name"
            />

            <select
              value={editData.case}
              onChange={(e) =>
                setEditData({ ...editData, case: Number(e.target.value) })
              }
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={editData.city}
              onChange={(e) =>
                setEditData({ ...editData, city: e.target.value })
              }
            >
              <option value="Makati">Makati</option>
              <option value="Mandaluyong">Mandaluyong</option>
              <option value="Manila">Manila</option>
              <option value="Pasig">Pasig</option>
              <option value="Taguig">Taguig</option>
            </select>

            <div className="modal-actions">
              <button className="yes" onClick={saveEdit}>
                Save
              </button>
              <button className="no" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="confirm-modal" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-title">Delete this case?</div>

            <div className="modal-actions">
              <button className="no" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>

              <button className="yes danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
       {/* ================= SHOW DETAILS MODAL ================= */}
      {showDetails && selectedCase && (
        <div className="sheet-overlay" onClick={() => setShowDetails(false)}>

         <div
          className="bottom-sheet"
          onClick={(e) => e.stopPropagation()}
         >

         {/* DRAG HANDLE */}
           <div className="sheet-handle"></div>

           {/* TITLE */}
           <h3>Case Details</h3>

           {/* CONTENT */}
           <div className="sheet-content">

          <div className="sheet-item">
          <span>Name</span>
          <strong>{selectedCase.name}</strong>
        </div>

        <div className="sheet-item">
          <span>City</span>
          <strong>{selectedCase.city}</strong>
        </div>

        <div className="sheet-item">
          <span>Case Type</span>
          <strong>
            {
              cases.find(c => c.id === selectedCase.case)?.name
            }
          </strong>
        </div>

        <div className="sheet-item">
          <span>Date</span>
          <strong>
            {new Date(selectedCase.date).toLocaleDateString()}
          </strong>
        </div>

      </div>

      {/* ACTION BUTTON */}
      <button
        className="sheet-close"
        onClick={() => setShowDetails(false)}
      >
        Close
      </button>

    </div>
  </div>
)}

      <Bottom />
    </div>
  );
};