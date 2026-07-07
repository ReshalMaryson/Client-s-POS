import "../../css/dashboard/employee.css";
import { deleteUserAccount } from "../user/controllers/userController";

export default function Employees({ emps }) {
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
              <button className="edit-btn">Update</button>
              <button
                className="delete-btn"
                onClick={() => deleteUserAccount(emp._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
