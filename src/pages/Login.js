import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import avatar from '../images/avatar.png'

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("user_name", "");
        navigate("/login");
    }

    const submit = data => {
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login/", data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                localStorage.setItem("user_name", `${res.data.data.user.firstName} ${res.data.data.user.lastName}`)
                navigate("/")
            })
            .catch(error => {
                console.log(error.response);
                if(error.response.status === 404){
                    alert("Credenciales incorrectas");
                }
            })
    }

    return (
        <>
            {
                localStorage.getItem("token") ? (
                    <div className="form form-container">
                        <div className="main-form-container logout-container">
                            <img className="avatar-logout" src={avatar} alt="avatar" />
                            <span className="name-logout">{localStorage.getItem("user_name")}</span>
                            <span className="button-logout" onClick={logout}>Log out</span>
                        </div>
                    </div>
                ) : (
                    <div className="form form-container">
                        <div className="main-form-container">
                            <h3 className="form-title">Welcome! Enter your email and password to continue</h3>
                            <div className="test-data-container">
                                <h3>Test data</h3>
                                <i className="fa-solid fa-envelope"></i>
                                <span>react@gmail.com</span>
                                <br />
                                <i className="fa-solid fa-lock"></i>
                                <span>react1212</span>
                            </div>
                            <form onSubmit={handleSubmit(submit)}>
                                <div className="input-container">
                                    <label className="form-txt">Email </label> <br />
                                    <input {...register("email")} className="form-input" type="email" placeholder="Enter your email"required />
                                </div>
                                <div className="input-container">
                                    <label className="form-txt">Password </label> <br />
                                    <input {...register("password")} className="form-input" type="password" placeholder="Enter your password" required />
                                </div>
                                <div className="button-container">
                                    <button type="submit" className="login-button">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Login;