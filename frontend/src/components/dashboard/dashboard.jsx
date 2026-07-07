import Employees from "./employees";
import Product from "./products";
import Sales from "./sales";
import Customer from "./customer";

import "../../css/dashboard/dashboard.css";
import { useState } from "react";

//controllers
import {
  getEmp,
  getProds,
  getAllSales,
} from "../dashboard/controller/dashboardController";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);

  const [emps, setEmps] = useState([]);
  const [empLoaded, setEmpLoaded] = useState(false);

  const [prods, setProds] = useState([]);
  const [prodLoaded, setProdLoaded] = useState(false);

  const [allSales, setAllSales] = useState([]);
  const [salesLoaded, setSalesLoaded] = useState(false);

  // fetch employee and show the emp section when clicked
  async function showEmployees() {
    setActiveSection("employees");

    if (!empLoaded) {
      await getEmp(setEmps);
      setEmpLoaded(true);
    }
  }

  //reload employee data
  async function reLoadEmployees() {
    if (activeSection == "employees" || empLoaded) {
      await getEmp(setEmps);
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

  // fetch sales and show the sales section when clicked
  async function showSales() {
    setActiveSection("sales");

    if (!salesLoaded) {
      await getAllSales(setAllSales);
      setSalesLoaded(true);
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

          <button onClick={showSales}>Sales</button>
        </div>

        {activeSection === "employees" && (
          <Employees emps={emps} reloadData={reLoadEmployees} />
        )}

        {activeSection === "products" && <Product products={prods} />}

        {activeSection === "customers" && <Customer />}

        {activeSection === "sales" && <Sales sales={allSales} />}
      </div>
    </>
  );
}
