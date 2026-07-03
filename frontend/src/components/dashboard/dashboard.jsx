import Employees from "./employees";
import Product from "./products";
import Sales from "./sales";
import Customer from "./customer";

import "../../css/dashboard/dashboard.css";
import { useState } from "react";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);
  return (
    <>
      <div className="container">
        <div className="buttons">
          <button onClick={() => setActiveSection("employees")}>
            Employees
          </button>

          <button onClick={() => setActiveSection("products")}>Products</button>

          <button onClick={() => setActiveSection("customers")}>
            Customers
          </button>

          <button onClick={() => setActiveSection("sales")}>Sales</button>
        </div>

        <div className={activeSection === "employees" ? "emp active" : "emp"}>
          <Employees />
        </div>
        <div className={activeSection === "products" ? "prod active" : "prod"}>
          <Product />
        </div>
        <div className={activeSection === "sales" ? "sales active" : "sales"}>
          <Sales />
        </div>
        <div className={activeSection === "customers" ? "cust active" : "emp"}>
          <Customer />
        </div>
      </div>
    </>
  );
}
