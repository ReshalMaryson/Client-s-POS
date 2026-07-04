import "../../css/dashboard/employee.css";

export default function Employees({ emps }) {
  return (
    <>
      <div className="emp-header">
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Role</p>
        <p>Created</p>
      </div>

      {emps.map((emp, index) => (
        <div
          key={emp._id}
          className={`emp-row ${index % 2 === 0 ? "light" : "dark"}`}
        >
          <p>{emp.name}</p>
          <p>{emp.email}</p>
          <p>{emp.phone}</p>
          <p>{emp.roleid.role}</p>
          <p>{new Date(emp.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </>
  );
}
