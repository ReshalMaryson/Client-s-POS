import api from "../../../api/axios";

//load employees
export const getEmp = async (setEmps) => {
  try {
    const employees = await api.get("/users");
    if (employees.status == 200) {
      // console.log("employees");
      // console.log(employees.data.data);
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
      // console.log("products");
      // console.log(prods.data.data);
      setProds(prods.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

//load all sales
export const getAllSales = async (setAllSales) => {
  try {
    const sales = await api.get("/sales");
    if (sales.status == 200) {
      // console.log(sales.data.data);
      setAllSales(sales.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

// delete product
export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    // console.log(res);
    if (res.status == 200) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

// create product
export const createProduct = async (payload) => {
  try {
    const res = await api.post(`/products`, payload);
    // console.log(res);
    if (res.status == 201) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
