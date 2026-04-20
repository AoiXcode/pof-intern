import { useHistory } from "react-router-dom";
import { Bottom } from "../navigations/Bottom";
import "../../assets/css/list.css";

import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/pencil.svg";

// ✅ Encode ID (for URL)
const encodeId = (id) => btoa(id.toString());

export const List = ({ lcases, cases, setLcases }) => {
  const history = useHistory();

  // ➕ Add new
  const acHandler = () => {
    history.push("/list/form");
  };

  // ✏️ Edit
  const selectCaseHandler = (id) => {
    history.push(`/list/form/${id}`);
  };

  // ❌ Delete
  const deleteHandler = (id, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this case?"
    );
    if (!confirmDelete) return;

    const filtered = lcases.filter((item) => item.id !== id);
    setLcases(filtered);
  };

  return (
    <div className="list-main-container">
      {/* TOP BUTTON */}
      <div className="list-container-1">
        <button onClick={acHandler}>Add Case</button>
      </div>

      {/* TABLE */}
      <div className="list-container-2">

        {/* HEADER */}
        <div>
          <div>Name</div>
          <div>Case</div>
          <div>City</div>
          <div>Actions</div>
        </div>

        {/* DATA */}
        <div>
          {lcases !== null ? (
            lcases.length !== 0 ? (
              lcases.map((v, k) => (
                <div key={k}>

                  <div>{v.name}</div>

                  <div>
                    {cases.find((c) => c.id === v.case)?.name || "Unknown"}
                  </div>

                  <div>{v.city}</div>

                  <div className="actions">

                    {/* EDIT */}
                    <img
                      src={editIcon}
                      alt="edit"
                      title="Edit"
                      onClick={() => selectCaseHandler(encodeId(v.id))}
                    />

                    {/* DELETE */}
                    <img
                      src={deleteIcon}
                      alt="delete"
                      title="Delete"
                      onClick={(e) => deleteHandler(v.id, e)}
                    />

                  </div>

                </div>
              ))
            ) : (
              <div>No record Found</div>
            )
          ) : (
            <div>Please wait fetching records</div>
          )}
        </div>

      </div>

      <Bottom />
    </div>
  );
};