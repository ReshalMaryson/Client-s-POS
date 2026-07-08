import { useEffect, useState } from "react";
import "../../css/dashboard/createProduct.css";

export default function AddProduct({ closeModal, create, reloadData }) {
  // Basic Info
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Specs
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("8GB");
  const [storage, setStorage] = useState("256GB");
  const [gpu, setGpu] = useState("");

  function clearCreateFields() {
    setName("");
    setBrand("");
    setCost("");
    setPrice("");
    setStock("");
    setCpu("");
    setRam("");
    setStorage("");
    setGpu("");
  }

  const payload = {
    name: name,
    brand: brand,
    cost: Number(cost),
    price: Number(price),
    stock: Number(stock),

    specs: {
      cpu: cpu,
      ram: ram,
      storage: storage,
      gpu: gpu,
    },
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="update-modal">
          <h2>Create Product</h2>
          <div className="fields">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Cost</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Stock</label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <h3 className="spec-heading">Specifications</h3>

            <div className="field">
              <label>CPU</label>
              <input
                type="text"
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
              />
            </div>

            <div className="field">
              <label>RAM</label>
              <select value={ram} onChange={(e) => setRam(e.target.value)}>
                <option>8GB-DDR4</option>
                <option>8GB-DDR5</option>

                <option>16GB-DDR4</option>
                <option>16GB-DDR5</option>

                <option>32GB-DDR4</option>
                <option>32GB-DDR5</option>

                <option>64GB-DDR4</option>
                <option>64GB-DDR5</option>
              </select>
            </div>

            <div className="field">
              <label>Storage</label>
              <select
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              >
                <option>256GB</option>
                <option>256GB Nvme</option>
                <option>512GB</option>
                <option>512GB Nvme</option>
                <option>1TB</option>
                <option>1TB Nvme</option>
                <option>2TB</option>
                <option>2TBNvme</option>
              </select>
            </div>

            <div className="field">
              <label>GPU</label>
              <input
                type="text"
                value={gpu}
                onChange={(e) => setGpu(e.target.value)}
              />
            </div>
          </div>
          {/* {error && <p className="error">{error}</p>} */}

          <div className="modal-buttons">
            <button
              className="cancel-btn"
              onClick={() => {
                clearCreateFields();
                closeModal(false);
              }}
            >
              Cancel
            </button>

            <button
              className="save-btn"
              onClick={async () => {
                await create(payload);
                reloadData();
                clearCreateFields();
                closeModal(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
