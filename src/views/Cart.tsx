import { CartItem } from "../components/CartItem";
import { useShopContext } from "../context/useCartContext";
import productsJSON from '../fake-db/products.json'
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const products: (ProductInterface | ExtendedProductInterface)[] = productsJSON.products; //creates products variable to hold the products array from the JSON file
  const { cartItems, getCartAmount, emptyCart } = useShopContext();
  const totalAmount = getCartAmount()
  const navigate = useNavigate();

  const addToOrder = () => {
    const order = {
      cart: cartItems,
      date: new Date().toISOString(), // add a timestamp for the order
    };
    // get the existing orders from localStorage or create an empty array
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    // add the new order to the array of orders
    orders.push(order);
    // Store the updated orders array back in localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    //clear current cart
    emptyCart();
    //navigate to order page
    navigate("/webshop-ts/orders");
  }
  return (
    <section className="cart">
      <h1>Kundvagn</h1>
      <ul className="cart-list">
        {products.map((product) => {//maps through products array
          if (cartItems[product.id] !== 0) {//if product id isnt 0 (product ids starts at 1 and increases)
            return <CartItem key={product.id} data={product} />//passes product object through props
          }
        })}
      </ul>
      {totalAmount > 0 ?//if totalAmount is greater than 0
        <div className="checkout">
          <p>Totalt pris: {new Intl.NumberFormat('sv-SV').format(totalAmount)} kr</p>
          <button onClick={() => addToOrder()}> Beställ </button>
        </div>//else
        : <li className='cart-item'>
          <h3 className="empty-cart-h3">Här var det tomt!  </h3>
          </li>}
      <Link className="shop-link" to='/webshop-ts/'>Fortsätt handla</Link>
    </section>
  )
}
export default Cart