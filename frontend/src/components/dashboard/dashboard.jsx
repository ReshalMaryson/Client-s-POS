import Employees from "./employees";
import Product from "./products";
import Sales from "./sales";
import Customer from "./customer";

import "../../css/dashboard/dashboard.css";
import { useState } from "react";

//controllers
import { getEmp, getProds } from "../dashboard/controller/dashboardController";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);

  const [emps, setEmps] = useState([]);
  const [empLoaded, setEmpLoaded] = useState(false);

  const [prods, setProds] = useState([]);
  const [prodLoaded, setProdLoaded] = useState(false);

  // fetch employee and show the emp section when clicked
  async function showEmployees() {
    setActiveSection("employees");

    if (!empLoaded) {
      await getEmp(setEmps);
      setEmpLoaded(true);
    }
  }

  // fetch products and show the products section when clicked
  async function showProducts() {
    setActiveSection("products");

    if (!prodLoaded) {
      await getProds(setProds);
      setProdLoaded(true);
    }
  }

  return (
    <>
      <div className="container">
        <div className="buttons">
          <button onClick={showEmployees}>Employees</button>

          <button onClick={showProducts}>Products</button>

          <button onClick={() => setActiveSection("customers")}>
            Customers
          </button>

          <button onClick={() => setActiveSection("sales")}>Sales</button>
        </div>

        {activeSection === "employees" && <Employees emps={emps} />}

        {activeSection === "products" && <Product products={prods} />}

        {activeSection === "customers" && <Customer />}

        {activeSection === "sales" && <Sales />}
      </div>
    </>
  );
}
