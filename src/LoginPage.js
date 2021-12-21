import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
            <div className="pt-5 col-11 mx-auto">
                    <div className="card col-md-5 m-1 mx-auto col-12 shadow">
                        <div className="card-body">
                            <h5 className="card-title">Are you Admin?</h5>
                            <NavLink to="/login" className="Black"><h3>Click Here to Login</h3></NavLink>
                        </div>
                    </div>
                    <br/>
                    <div className="card col-md-5 m-1 mx-auto col-12 shadow">
                        <div className="card-body">
                            <h5 className="card-title">Are you a Restaurant Owner?</h5>
                            <NavLink to="/ownerlogin" className="Black pt-5"><h3>Click Here to Login</h3></NavLink>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default LoginPage;