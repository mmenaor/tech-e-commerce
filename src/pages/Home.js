import React, { useEffect, useState } from 'react';
import { getProducts, filterHeadline, filterCategory } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);

    const products = useSelector(state => state.products);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        dispatch(getProducts());

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories));
    }, [dispatch]);

    const filterProducts = () => {
        dispatch(filterHeadline(search));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const selectCategory = (categoryId) => {
        dispatch(filterCategory(categoryId));
        setSearch("");
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="home-section">
            <aside className="aside-container">
                <h3 className="aside-title">Category</h3>
                <ul className="aside-category-list">
                    {
                        categories.map(category => (
                            <li className="aside-category-items" key={category.id} onClick={() => selectCategory(category.id)}>{category.name}</li>
                        ))
                    }
                </ul>
            </aside>
            <section className="products-section">
                <div className="search-container">
                    <form className="search-container-2">
                        <input className="search-input" type="text" onChange={e => setSearch(e.target.value)} value={search} placeholder="What are you looking for?"/>
                        <button type="submit" className="search-button" onClick={filterProducts}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
                <ul className="cards-wrap">
                    {
                        products.map(product => (
                            <li className="card-container" key={product.id} onClick={() => navigate(`/productDetail/${product.id}`)}>
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
            </section>
        </div>
    );
};

export default Home;