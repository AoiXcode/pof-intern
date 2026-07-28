import { useHistory } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Bottom } from "../navigations/Bottom";
import "../../assets/css/list.css";

import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/pencil.svg";

export const List = ({ lcases, cases, setLcases }) => {
  const history = useHistory();

  const [search, setSearch] = useState("");
  const [filterCase, setFilterCase] = useState("");
  const [filterCity, setFilterCity] = useState("");

  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCase, setSelectedCase] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [serverData, setServerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showWarningModal, setShowWarningModal] = useState(false);

  // =========================
  // FETCH DATA
  // =========================
 const fetchData = useCallback(() => {
  setIsLoading(true);

  setTimeout(() => {
    const sorted = [...lcases].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setServerData(sorted);
    setIsLoading(false);
  }, 1000);
}, [lcases]);

useEffect(() => {
  fetchData();
}, [fetchData]);

  const acHandler = () => {
    history.push("/list/form");
  };

  // =========================
  // DELETE
  // =========================
  const deleteHandler = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const updated = lcases.filter((item) => item.id !== deleteId);

      setLcases(updated);

      setShowDeleteModal(false);
      setDeleteId(null);
      setIsSubmitting(false);

      fetchData();
    }, 1200);
  };

  // =========================
  // EDIT
  // =========================
  const saveEdit = () => {

  if (!editData.name || !editData.case || !editData.city) return;

  setIsSubmitting(true);

  setTimeout(() => {
    const updated = lcases.map((item) =>
      item.id === editData.id ? editData : item
    );

    setLcases(updated);
    setShowEditModal(false);
    setIsSubmitting(false);
    fetchData();
  }, 1200);
};

  // =========================
  // FILTER
  // =========================
  const filteredData = serverData.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCase = filterCase
      ? item.case === Number(filterCase)
      : true;

    const matchCity = filterCity
      ? item.city === filterCity
      : true;

    return matchSearch && matchCase && matchCity;
  });

  return (
    <div className="list-main-container">

      {/* GLOBAL LOADER */}
      {isSubmitting && (
        <div className="global-loader">
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      {/* ================= FULL PAGE SKELETON ================= */}
     {isLoading ? (
  <div className="page-skeleton">

    {/* ADD BUTTON */}
    <div className="skeleton skeleton-button"></div>

    <div className="skeleton-filters">
  {/* SEARCH */}
  <div className="skeleton-input"></div>

  {/* FILTER ROW */}
  <div className="skeleton-filter-row">
    <div className="skeleton-select"></div>
    <div className="skeleton-select"></div>
  </div>
</div>

    {/* LIST (FIXED HERE) */}
    <div className="skeleton-container">
      {[1,2,3,4,5,6,7].map((i) => (
        <div className="skeleton skeleton-card" key={i}>

          <div className="skeleton-text-group">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text small"></div>
            <div className="skeleton skeleton-badge"></div>
          </div>

          <div className="skeleton-actions">
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton skeleton-icon"></div>
          </div>

        </div>
      ))}
    </div>

  </div>
) : (
        <>
          {/* ADD BUTTON */}
          <div className="list-container-1">
            <button onClick={acHandler} disabled={isSubmitting}>
              Add Case
            </button>
          </div>

          {/* FILTERS */}
          <div className="list-controls">
           {/* SEARCH (leave as-is) */}
<input
  type="text"
  placeholder="Search name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  disabled={isSubmitting}
  className="search-input"
/>

{/* FILTER ROW (ONLY CASE + CITY) */}
<div className="filter-row">
  <select
    value={filterCase}
    onChange={(e) => setFilterCase(e.target.value)}
    disabled={isSubmitting}
  >
    <option value="">All Cases</option>
    {cases.map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>

  <select
    value={filterCity}
    onChange={(e) => setFilterCity(e.target.value)}
    disabled={isSubmitting}
  >
    <option value="">All Cities</option>
    <option value="Makati">Makati</option>
    <option value="Mandaluyong">Mandaluyong</option>
    <option value="Manila">Manila</option>
    <option value="Pasig">Pasig</option>
    <option value="Taguig">Taguig</option>
  </select>
</div>
          </div>

          {/* LIST */}
<div className="list-container-2">
  <div className="list-data">

    {filteredData.length ? (
      filteredData.map((v) => {
        const caseData = cases.find((c) => c.id === v.case);

        return (
          <div
            key={v.id}
            className="list-card"
            onClick={() => {
              setSelectedCase(v);
              setShowDetails(true);
            }}
          >
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
          {/* EDIT MODAL */}
          {showEditModal && editData && (
            <div className="confirm-modal" onClick={() => setShowEditModal(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <div className="modal-title">Edit Case</div>

                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />

               <select
                  value={editData.case}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);

                    // find selected case name
                    const currentCase = cases.find(c => c.id === editData.case);

                    // 🚫 if current is Death, block change
                    if (currentCase?.name.toLowerCase() === "death") {
                      setShowWarningModal(true);
                      return;
                    }

                    setEditData({ ...editData, case: newValue });
                  }}
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
                  <button onClick={saveEdit} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>

                  <button onClick={() => setShowEditModal(false)} disabled={isSubmitting}>
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* DELETE MODAL */}
          {showDeleteModal && (
            <div className="confirm-modal" onClick={() => setShowDeleteModal(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <div className="modal-title">Delete this case?</div>

                <div className="modal-actions">
                  <button onClick={() => setShowDeleteModal(false)} disabled={isSubmitting}>
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="danger"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Deleting..." : "Delete"}
                  </button>
                </div>

              </div>
            </div>
          )}

        </>
      )}
        {/* Warning Modal */}
                {showWarningModal && (
            <div className="confirm-modal" onClick={() => setShowWarningModal(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <div className="modal-title">⚠️ Cannot Edit Case</div>

                <p className="modal-sub">
                  This case is already marked as <strong>Death</strong>.
                  It cannot be changed to another status.
                </p>

                <div className="modal-actions">
                  <button onClick={() => setShowWarningModal(false)}>
                    Okay
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