import React, { useEffect, useState } from 'react';
import db from '../../firebase.config'
import { addDoc, collection} from 'firebase/firestore/lite';

const Restaurant = () => {
    let Usertype = localStorage.getItem('type')
    let uuid= localStorage.getItem('uid')
    const initialstate = {
        name: "",
        uid:''
    }
    
    const [FormData, setFormData] = useState(initialstate);
    const { name, uid} = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value,
            error: ""
        })
    }
    
    async function addRestuarants() {
        const docRef = await addDoc(collection(db, "restaurants"), {
            name: name,
            uid: uuid
        });
        console.log("Document written with ID: ", docRef.id);
        window.location = "/restaurant"
    }
    return (
        <>
            <div className="row pt-3 mr-0">
                <div className="col-11 mx-auto">
                <form>
                                <h3>Add Deal</h3>
                                <div className="">
                                    <div className="col-xs-12 col-sm-6">
                                        <input type="text"
                                            className="form-control Radius_10 m-1"
                                            placeholder="ID"
                                            // name="restaurantName"
                                            value={uuid}
                                            readOnly
                                            onChange={onHandleChange}></input>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <input type="text"
                                            className="form-control Radius_10 m-1"
                                            placeholder="Restaurant Name"
                                            name="name"
                                            onChange={onHandleChange}></input>
                                    </div>
                                </div>
                                <button className="btn White skyblue d-block mx-auto mt-4" type="button" onClick={addRestuarants}>
                                    Add Deal
                                </button>
                            </form>
                </div>
            </div>

        </>
    )
}

export default Restaurant;