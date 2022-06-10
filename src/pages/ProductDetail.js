import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../store/slices/cart.slice';
import { filterCategory } from '../store/slices/products.slice';

const ProductDetail = () => {

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState(0);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(state => state.products);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
            .then(res => {
                const productAux = res.data.data.products.find(productItem => productItem.id === Number(id));
                setProduct(productAux);
                dispatch(filterCategory(productAux.category.id));
            });
    }, [dispatch, id]);

    const addCart = () => {
        const productToCart = {
            id: id,
            quantity: quantity
        }
        if(localStorage.getItem("token") === ""){
            navigate("/login");
        } else {
            dispatch(addToCart(productToCart));
        }
    }

    const nextImg = () => image === 2 ? setImage(0) : setImage(image + 1);
    const prevImg = () => image === 0 ? setImage(2) : setImage(image - 1);

    const addQuantity = () => setQuantity(quantity + 1);
    const subsQuantity = () => quantity !== 1 && setQuantity(quantity - 1)

    return (
        <>
            <div className="route">
                <h3 className="route-home-link" onClick={() => navigate("/")}>Home</h3>
                <div className="route-circle"></div>
                <h2 className="route-title">{product.title}</h2>
            </div>
            <div className="product-detail">
                <div className="detail-image-container">
                    <button className="detail-image-button detail-left-button" onClick={prevImg}>&#10094;</button>
                    <img className="detail-image" src={product.productImgs?.[image]} alt="" />
                    <button className="detail-image-button detail-right-button" onClick={nextImg}>&#10095;</button>
                </div>
                <div className="detail-info-container">
                    <h1 className="detail-info-title">{product.title}</h1>
                    <p className="detail-info-description">{product.description}</p>
                    <div className="detail-price-quantity-container">
                        <div className="detail-price-container">
                            <span className="detail-txt-price">Price</span>
                            <span className="detail-price">$ {product.price}</span>
                        </div>
                        <div className="detail-quantity-container">
                            <span className="detail-txt-quantity">Quantity</span>
                            <br />
                            <button className="detail-quantity-button" onClick={subsQuantity}>-</button>
                            <span className="detail-quantity">{quantity}</span>
                            <button className="detail-quantity-button" onClick={addQuantity}>+</button>
                        </div>
                    </div>
                    <button className="add-cart-button" onClick={addCart}>Add to cart<i className="add-cart-icon fa-solid fa-cart-shopping"></i></button>
                </div>
            </div>
            <h3 className="similar-items-title">Discover similar items</h3>
            <ul className="cards-wrap">
                {
                    products.map(product => (
                        <li className="card-container" id="similar-item-card-container" key={product.id} onClick={() => navigate(`/productDetail/${product.id}`)}>
                            <div className="card-image-container">
                                <img className="card-image" src={product.productImgs[0]} alt="" />
                            </div>
                            <div className="card-information-container">
                                <h2 className="card-title">{product.title}</h2>
                                <p className="card-txt">Price</p>
                                <span className="card-price">$ {product.price}</span>
                            </div>
                            <div className="card-button-container">
                                <i className="card-button-icon navbar-items fa-solid fa-cart-shopping"></i>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default ProductDetail;