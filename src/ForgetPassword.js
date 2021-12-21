import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import blacklogo from './assests/blacklogo.png'

const ForgetPassword = (props) => {
    const initialstate = {
        email: "",
    }
    const [FormData, setFormData] = useState(initialstate);
    const { email } = FormData;
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
                ForgetApi()

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

    const ForgetApi = () => {
        const link = "Https://blackbooking.org/api/admin/forget_password"
        axios.post(link,
            {
                email: email
            })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success(res.data.message)
                    window.location = "/login"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }
    return (
        <>
            <div className="col-11 mx-auto pt-3 ">
                <div className=" mx-auto row   marginTop">
                    <div className="col-md-6 col-11 mx-auto mt-2 bg-white p-5 shadow Radius_4">
                        <div className="col-md-6 col-10 mx-auto">
                            <img src={blacklogo} alt="" className=" mx-auto"></img>
                        </div>

                        <form className="pt-4">
                            <div className="form-group">
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"
                                    name="email" value={email} onChange={onHandleChange}></input>
                            </div>
                            <button type="button" className="btn skyblue White col-12" onClick={validation}>Forget Password</button>
                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ForgetPassword;