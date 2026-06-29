import ItemCard from "../ItemCard/ItemCard";
import "./ItemList.css";

const ItemList = ({ products }) => {
  return (
    <div className="ilc-grid" id="grid-productos" role="list">
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ItemCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
