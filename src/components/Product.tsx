import { useShopContext } from "../context/useCartContext";
import { Link } from 'react-router-dom';

export const Product = (props: ProductPropsInterface) => {
  const { id, name, price, imgURL } = props.data; //extracts some properties from object props.data and make them variables
  const { addToCart, cartItems } = useShopContext();  //extracts addToCart function and cartItems object from custom hook

  const cartItemAmount = cartItems[id]
  return (
    <li className="product">
      <div className="product-img">
        <img src={imgURL} />
      </div>
      <div className="product-text">
        <h3>{name}</h3>
        <h4>{price} kr</h4>
        {/* if frequency exists in props.data - render frequency as ExtendedProductInterface - type assertion*/}
        {('frequency' in props.data) && (
          <p>{(props.data as ExtendedProductInterface).frequency} Hz</p>
        )}
      </div>
      <div className="product-btn">
        <button className="addToCartBtn" onClick={() => addToCart(id)}> {/* runs addToCart function from ShopContext with id*/}
          Add to Cart ({cartItemAmount}) {/* if amount is greater than 0 display the amount*/}
        </button>
        <Link to={`/${id}`}>
          <button>Details</button>
        </Link>
      </div>
    </li>
  )
}