import React, { useEffect, useState } from 'react';
import db from '../../firebase.config'
import { collection, getDocs, doc, addDoc, deleteDoc, collectionGroup } from 'firebase/firestore/lite';

const Restaurants = () => {
    const initialstate = {
        first_name: "",
        email: "",
        contact: "",
        password: ""
    }
    const [FormData, setFormData] = useState(initialstate);
    const [RestaurantData, setRestaurantData] = useState([{
        id:'',
        restaurants:''
    }]);
    const { first_name, email, contact, password } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    useEffect(() => {
        getRestaurants()
    }, [])

    async function getRestaurants() {
        let arrayData = []
        const citiesCol = collectionGroup(db, 'Restaurants')
        const citySnapshot = await getDocs(citiesCol);
        console.log(citySnapshot._docs)
        citySnapshot.forEach(item => {
            arrayData.push({id:item.id,
                restaurants:item.data()});
        })
        setRestaurantData(arrayData);
    }

    async function addRestuarants() {
        const docRef = await addDoc(collection(db, "Restaurants"), {
            email: email,
            name: first_name,
            passoword: password,
            phone: contact
        });
        console.log("Document written with ID: ", docRef.id);
        window.location="/restaurants"
    }

    async function deleteUser(e) {
        console.log(e)
        // Add a new document in collection "cities"
        await deleteDoc(doc(db, "Restaurants", e));
        window.location="/restaurants"
    }
    
    return (
        <>
            <div className="row pt-3 mr-0">
                <div className="col-11 mx-auto">
                    <form>
                        {console.log(RestaurantData)}
                        <h3>Restaurants</h3>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <input type="text"
                                    className="form-control Radius_10 m-1"
                                    placeholder="Name"
                                    name="first_name"
                                    onChange={onHandleChange}></input>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <input type="email"
                                    className="form-control Radius_10 m-1"
                                    placeholder="Email"
                                    name="email"
                                    onChange={onHandleChange}></input>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <input type="phone"
                                    className="form-control Radius_10 m-1"
                                    placeholder="Phone"
                                    name="contact"
                                    onChange={onHandleChange}></input>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <input type="password"
                                    className="form-control Radius_10 m-1"
                                    placeholder="password"
                                    name="password"
                                    onChange={onHandleChange}></input>
                            </div>
                        </div>
                        <button className="btn White skyblue d-block mx-auto mt-4" type="button" onClick={addRestuarants}>
                            Add Restaurant
                        </button>
                    </form>
                    <hr></hr>
                    <div className="pt-3">
                        <h4>All Restaurants</h4>
                        <table class="table table-responsive table-bordered w-100 d-block d-md-table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RestaurantData && RestaurantData.map((index)=>{
                                    console.log(index)
                                    return(
                                    <tr>
                                    <td scope="col">{index.id}</td>
                                    <td scope="col">{index.restaurants.name}</td>
                                    <td scope="col">{index.restaurants.phone}</td>
                                    <td scope="col">{index.restaurants.email}</td>
                                    <td scope="col"><button className="btn btn-danger" onClick={()=>deleteUser(index.id)}>Delete</button></td>
                                </tr>     
                                    )
                                })}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Restaurants;