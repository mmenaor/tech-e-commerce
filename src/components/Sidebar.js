import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyItems, deleteItem } from '../store/slices/cart.slice';

const Sidebar = ({ handleSidebar }) => {

    const cart = useSelector(state => state.cart)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let totalAmount = 0;

    const countTotal = () => {
        for (let i = 0; i < cart.length; i++) {
            const price = cart?.[i].price;
            const quantity = cart?.[i].productsInCart.quantity;

            totalAmount += quantity * price;           
        }
        return totalAmount;
    }

    const buyCart = () => {
        dispatch(buyItems());
    };

    const deleteProduct = (productId) => {
        dispatch(deleteItem(productId));
    };

    return (
        <div className="sidebar-container">
            <section className="sidebar">
                <h3 className="cart-title">Shopping cart</h3>  
                <ul className="cart-container">
                    {
                        cart.map(cartItem => (
                            <li key={cartItem.id} className="cart-item">
                                <span className="cart-item-brand">{cartItem.brand}</span>
                                <span className="cart-item-title" onClick={() => navigate(`/productDetail/${cartItem.id}`)}>{cartItem.title}</span>
                                <span className="cart-item-quantity">{cartItem.productsInCart.quantity}</span>
                                <p className="cart-item-total">Total: <span className="cart-item-price">$ {cartItem.price * cartItem.productsInCart.quantity}</span></p>
                                <i onClick={() => deleteProduct(cartItem.id)} className="fa-solid fa-trash-can cart-icon-trash"></i>
                            </li>
                        ))
                    }
                </ul>
                <div className="cart-total">
                    <span className="cart-txt-total">Total:</span>
                    <span className="cart-item-price total-price">$ {countTotal()}</span>
                </div>
                <button onClick={buyCart} className="checkout-button">Chechout</button>
            </section>
            <div className="sidebar-overlay" onClick={handleSidebar}></div>
        </div>
    );
};

export default Sidebar;