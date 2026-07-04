import "../../css/dashboard/products.css";

export default function Product({ products }) {
  return (
    <>
      <div className="prod-header">
        <p>Name</p>
        <p>Brand</p>
        <p>CPU</p>
        <p>RAM</p>
        <p>Storage</p>
        <p>GPU</p>
        <p>Cost</p>
        <p>Price</p>
        <p>Stock</p>
        <p>Created</p>
        <p>Actions</p>
      </div>

      {products.map((product, index) => (
        <div
          key={product._id}
          className={`prod-row ${index % 2 === 0 ? "light" : "dark"}`}
        >
          <p>{product.name}</p>
          <p>{product.brand}</p>
          <p>{product.specs.cpu}</p>
          <p>{product.specs.ram}</p>
          <p>{product.specs.storage}</p>
          <p>{product.specs.gpu}</p>
          <p>Rs. {product.cost.toLocaleString()}</p>
          <p>Rs. {product.price.toLocaleString()}</p>
          <p>{product.stock}</p>
          <p>{new Date(product.createdAt).toLocaleDateString()}</p>

          <div className="actions">
            <button className="edit-btn">Update</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
