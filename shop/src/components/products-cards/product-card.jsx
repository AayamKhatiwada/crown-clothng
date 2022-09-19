import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import "./product-card.scss"

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    // console.log(name,price,imageUrl)

    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="prce">{price}</span>
            </div>
            <button className="btn btn-primary" onClick={addProductToCart}>Add to cart</button>
        </div>
    );
}
export default ProductCard;