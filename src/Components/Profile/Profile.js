import React, { useState } from 'react';
import UploadComponent from '../UploadComponent';

const Profile = () => {
    const initialstate = {
        fname: "",
        lname: "",
        oldpassword: "",
        newpassword: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { fname, lname, oldpassword, newpassword } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    return (
        <>
            <div className="row mr-0">

                <h2 className="pt-3 row col-11 mx-auto">Profile</h2>

                <form className="col-11 mx-auto pt-3">
                    <div className="row mx-auto">
                        <div class="accordion" id="accordionExample">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Update Profile Picture
                                            </button>
                                    </h2>
                                </div>

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <UploadComponent />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-md-6 col-12">
                            <input type="text"
                                className="form-control Radius_20 m-1"
                                placeholder="First Name"
                                name="fname"
                                value={fname}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                        <div className="col-md-6 col-12">
                            <input type="text"
                                className="form-control Radius_20 m-1"
                                placeholder="Last Name"
                                name="lname"
                                value={lname}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-6 col-12">
                            <input type="password"
                                className="form-control Radius_20 m-1"
                                placeholder="Old Password"
                                name="oldpassword"
                                value={oldpassword}
                                onChange={onHandleChange} >
                            </input>
                        </div>

                        <div className="col-md-6 col-12">
                            <input type="password"
                                className="form-control Radius_20 m-1"
                                placeholder="New Password"
                                name="newpassword"
                                value={newpassword}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                    </div>

                    <button type="button" className="btn skyblue White mt-2">
                        Update
                </button>
                    <hr></hr>
                </form>
            </div>
        </>
    )
}

export default Profile;