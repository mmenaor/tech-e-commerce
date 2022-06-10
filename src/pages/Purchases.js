import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, [ dispatch ]);

    const getDate = purchaseDate => {
        const event = new Date(purchaseDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = event.toLocaleDateString('en-us', options);
        return date;  
    }

    return (
        <div>
            <div className="route route-purchase">
                <h3 className="route-home-link" onClick={() => navigate("/")}>Home</h3>
                <div className="route-circle"></div>
                <h2 className="route-title">Purchases</h2>
            </div>
            <h2 className="purchases-title">My purchases</h2>
            <ul>
                {
                    purchases.map((purchase) => (
                        <li key={purchase.id} className="purchase-product-list">
                            <h2 className="purchase-date">{getDate(purchase.createdAt)}</h2>
                            {
                                purchase.cart.products.map((product) => (
                                    <div className="purchase-item" key={product.id}>
                                        <h3 onClick={() => navigate(`/productDetail/${product.id}`)}>{product.title}</h3>
                                        <span>{product.productsInCart.quantity}</span>
                                        <span>$ {product.price}</span>
                                    </div>
                                ))
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;