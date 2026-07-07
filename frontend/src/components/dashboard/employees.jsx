import "../../css/dashboard/employee.css";
import { useState } from "react";

import {
  deleteUserAccount,
  updateUser,
} from "../user/controllers/userController";
import UpdateEmployee from "./popUpEmpUpdate";

export default function Employees({ emps, setEmps, reloadData }) {
  const [updateModalActive, setupdateModalActive] = useState(false);

  // show update modal
  function showUpdateModal() {
    if (!updateModalActive) {
      setupdateModalActive(true);
    }
  }

  return (
    <>
      <div className="emp-header">
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Role</p>
        <p>Created</p>
        <p>Actions</p>
      </div>

      {emps.length === 0 ? (
        <h3 className="loading">Loading employees...</h3>
      ) : (
        emps.map((emp, index) => (
          <div
            key={emp._id}
            className={`emp-row ${index % 2 === 0 ? "light" : "dark"}`}
          >
            <p>{emp.name}</p>
            <p>{emp.email}</p>
            <p>{emp.phone}</p>
            <p>{emp.roleid.role}</p>
            <p>{new Date(emp.createdAt).toLocaleDateString()}</p>

            <div className="actions">
              <button className="edit-btn" onClick={showUpdateModal}>
                Update
              </button>
              <button
                className="delete-btn"
                onClick={async () => {
                  await deleteUserAccount(emp._id);
                  reloadData();
                }}
              >
                Delete
              </button>
            </div>

            <div
              className={
                updateModalActive ? "updateModal active" : "updateModal"
              }
            >
              <UpdateEmployee
                employee={emp}
                setEmps={setEmps}
                updateUser={updateUser}
                reloadData={reloadData}
                closeModal={setupdateModalActive}
              />
            </div>
          </div>
        ))
      )}
    </>
  );
}
