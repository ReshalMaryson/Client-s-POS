import { useState } from "react";
import "../../css/dashboard/sales.css";

export default function Sales({ sales }) {
  const [expandedSale, setExpandedSale] = useState(null);

  function toggleSale(id) {
    setExpandedSale((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {/* Header */}
      <div className="sale-header">
        <p>Invoice</p>
        <p>Sold By</p>
        <p>Total</p>
        <p>Date & Time</p>
        <p></p>
      </div>
      <div className="sales-wrapper">
        {sales.length === 0 ? (
          <h3 className="loading">Loading sales...</h3>
        ) : (
          sales.map((sale, index) => (
            <div
              key={sale._id}
              className={`sale-container ${index % 2 === 0 ? "light" : "dark"}`}
            >
              {/* ================= COLLAPSED ROW ================= */}
              <div className="sale-row" onClick={() => toggleSale(sale._id)}>
                <p>{sale.invoiceNumber}</p>

                <p>{sale.soldBy?.name}</p>

                <p>Rs. {sale.totalAmount.toLocaleString()}</p>

                <p>
                  {new Date(sale.createdAt).toLocaleDateString()}{" "}
                  {new Date(sale.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p
                  className={
                    expandedSale === sale._id ? "arrow rotate" : "arrow"
                  }
                >
                  ▼
                </p>
              </div>

              {/* ================= EXPANDED SECTION ================= */}

              <div
                className={`sale-expanded ${
                  expandedSale === sale._id ? "open" : ""
                }`}
              >
                {/* -------- Sale Details -------- */}

                <div className="section-title">Sale Details</div>

                <div className="details-header">
                  <p>Customer</p>
                  <p>Phone</p>
                  <p>Subtotal</p>
                  <p>Discount</p>
                  <p>Total</p>
                </div>

                <div className="details-row">
                  <p>{sale.customer?.name || "-"}</p>

                  <p>{sale.customer?.phone || "-"}</p>

                  <p>Rs. {sale.subtotal.toLocaleString()}</p>

                  <p>Rs. {sale.discount.toLocaleString()}</p>

                  <p>Rs. {sale.totalAmount.toLocaleString()}</p>
                </div>

                {/* -------- Items -------- */}

                <div className="section-title">Items</div>

                <div className="items-header">
                  <p>Product ID</p>
                  <p>Description</p>
                  <p>Qty</p>
                  <p>Price</p>
                  <p>Subtotal</p>
                </div>

                {sale.items.map((item, itemIndex) => {
                  const description = `${item.product.name} ${item.product.specs.cpu} ${item.product.specs.ram}GB ${item.product.specs.storage}GB ${item.product.specs.gpu}`;

                  return (
                    <div
                      key={item._id}
                      className={`items-row ${
                        itemIndex % 2 === 0 ? "item-light" : "item-dark"
                      }`}
                    >
                      <p>{item.product._id}</p>

                      <p>{description}</p>

                      <p>{item.quantity}</p>

                      <p>
                        Rs.
                        {item.price.toLocaleString()}
                      </p>

                      <p>
                        Rs.
                        {item.subtotal.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
