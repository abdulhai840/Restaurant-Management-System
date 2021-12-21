
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const OwnerLogin = (props) => {
    const initialstate = {
        email: "",
        password: "",
    }
    const auth = getAuth();

    const [FormData, setFormData] = useState(initialstate);
    const { email, password } = FormData; 
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const loginfunc = (email, password) => {
        signInWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                console.log(userCredential)
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                localStorage.setItem('Login', true)
                localStorage.setItem('uid', user.uid)
                localStorage.setItem('type', 'owner')
                // localStorage.setItem('type', 'owner')
                window.location="/deals"
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    const check = localStorage.getItem('Login')
    return (
        check === "true" ? <Redirect to="/deals" /> :
        <>
            <div className="col-11 mx-auto pt-3 ">
                <div className=" mx-auto row   marginTop">
                    <div className="col-md-6 col-11 mx-auto mt-2 bg-white p-5 shadow Radius_4">
                        <div className="col-md-6 col-10 mx-auto">
                            <h6>Restaurant Management System</h6>
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
                            <button type="button" className="btn skyblue White col-12" onClick={()=>loginfunc(email, password)} >Login</button>
                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}

export default OwnerLogin;