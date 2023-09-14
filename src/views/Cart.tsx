import { allProducts } from "../products";
import { CartItem } from "../components/CartItem";
import { useShopContext } from "../context/useShopContext";

const Cart = () => {
    const { cartItems, getCartAmount } = useShopContext();
    const totalAmount = getCartAmount()
  return (
    <div className="cart">
        <div className="cart-title-container">
          <h1>Cart</h1>
        </div>
        <ul className="cart-items">
          {allProducts.map((product) => {//maps through allProducts array
            if (cartItems[product.id] !== 0) {//if product id isnt 0 (product ids starts at 1 and increases)
              return <CartItem key={product.id} data={product}/>//passes product object through props
            }
          })}
        </ul>
        {totalAmount > 0 ?//if totalAmount is greater than 0
        <div className="checkout">
            <p>Total amount: {totalAmount} kr</p>
            <button> Checkout </button>
        </div>//else
        :<h4>Your Cart is Empty</h4>}
    </div>
  )
}
export default Cart