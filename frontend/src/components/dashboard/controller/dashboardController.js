import api from "../../../api/axios";

//load employees
export const getEmp = async (setEmps) => {
  try {
    const employees = await api.get("/users");
    if (employees.status == 200) {
      console.log("employees");
      console.log(employees.data.data);
      setEmps(employees.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

// load prouducts
export const getProds = async (setProds) => {
  try {
    const prods = await api.get("/products");
    if (prods.status == 200) {
      console.log("products");
      console.log(prods.data.data);
      setProds(prods.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};
