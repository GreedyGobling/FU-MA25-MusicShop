import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeItem, clearCart } from "../features/cartSlice.ts";
import type { RootState } from "../main.tsx";
import { albumCoverUrl } from "../api/coverart.ts";
import "./Kassa.css";

function Kassa() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Kassa</h1>
      <Link to="/">Continue shopping</Link>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id}>
                <img src={albumCoverUrl(item.id)} alt={item.name} width={100} height={100} />
                <span className="cart-item-title">{item.artistName}: {item.name}</span>
                <span>{item.quantity} × {item.price} kr = {item.quantity * item.price} kr</span>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total: {total} kr</p>
          <p>Demo cart — no payment is taken.</p>
          <button type="button" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
}

export default Kassa;
