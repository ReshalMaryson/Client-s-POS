import { useEffect, useState } from "react";
import "../../css/dashboard/updateEmp.css";

export default function UpdateEmployee({
  employee,
  updateUser,
  reloadData,
  closeModal,
  // onClose,
  //   onUpdate,
  //   loading,
  //   error,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPhone(employee.phone);
    }
  }, [employee]);

  const payload = {
    name: name,
    phone: phone,
    email: employee.email,
  };

  return (
    <div className="modal-overlay">
      <div className="update-modal">
        <h2>Update Employee</h2>

        <div className="field">
          <label>Name</label>

          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="field">
          <label>Phone</label>

          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="field">
          <label>Email</label>

          <input value={employee.email} disabled />
        </div>

        <div className="field">
          <label>Role</label>

          <input value={employee.roleid.role} disabled />
        </div>

        {/* {error && <p className="error">{error}</p>} */}

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={() => closeModal(false)}>
            Cancel
          </button>

          <button
            className="save-btn"
            // disabled={loading}
            onClick={async () => {
              await updateUser(employee._id, payload);
              closeModal(false);
              reloadData();
            }}
          >
            save
            {/* {loading ? "Updating..." : "Update"} */}
          </button>
        </div>
      </div>
    </div>
  );
}

// updateUser()
//   onUpdate({
//     ...employee,
//     name,
//     phone,
//   })
