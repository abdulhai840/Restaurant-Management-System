import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import {  Redirect } from 'react-router-dom'

const Login = (props) => {
    const initialstate = {
        email: "",
        password: "",
    }
    const [FormData, setFormData] = useState(initialstate);
    const { email, password } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const validation = () => {
        if (email !== "") {
            if (email.includes('@') && email.includes('.')) {
                if (password !== "") {
                    LoginApi()
                }
                else if (password === "") {
                    setFormData({
                        ...FormData,
                        error: "Password is Required"
                    })
                    message.error("Password is Required", [4])
                }
            }
            else {
                setFormData({
                    ...FormData,
                    error: "Email is not valid"
                })
                message.error("Email is not valid", [4])
            }
        }
        else if (email === "") {
            setFormData({
                ...FormData,
                error: "Email is Required"
            })
            message.error("Email is Required", [4])
        }
    }

    const LoginApi = () => {
        // const link = "Https://blackbooking.org/api/admin/login"
        // axios.post(link,
        //     {
        //         email: email,
        //         password: password
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         if (res.data.success) {
                    localStorage.setItem('Login', true)
                    localStorage.setItem('type', 'admin')
                    setFormData({
                        login: true
                    })
            //     }
            //     else {
            //         message.error(res.data.message)
            //     }
            // })
    }
    const check = localStorage.getItem('Login')
    return (
        check === "true" ? <Redirect to="/deals" /> :
            <>
                <div className="col-11 mx-auto pt-3 ">
                    <div className=" mx-auto row   marginTop">
                        <div className="col-md-6 col-11 mx-auto mt-2 bg-white p-5 shadow Radius_4">
                            <div className="col-md-6 col-10 mx-auto">
                                <h6>Admin Login</h6>
                            </div>

                            <form className="pt-4">
                                <div className="form-group">
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"
                                        name="email" value={email} onChange={onHandleChange}></input>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                        name="password" value={password} onChange={onHandleChange}></input>
                                </div>
                                <button type="button" className="btn skyblue White col-12" onClick={validation}>Login</button>
                            </form>
                        </div>
                    </div>

                </div>

            </>
    )
}

export default Login;