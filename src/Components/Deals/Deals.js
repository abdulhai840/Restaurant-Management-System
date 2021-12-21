import React, { useEffect, useState } from 'react';
import db from '../../firebase.config'
import { collection, addDoc, getDocs, doc, deleteDoc, collectionGroup } from 'firebase/firestore/lite';
import { getStorage, ref } from "firebase/storage";
import UploadComponent from '../UploadComponent';

const Deals = () => {
    let Usertype = localStorage.getItem('type')
    const initialstate = {
        restaurantName: "",
        menuName: "",
        price: "",
        type: "",
        img_url: "",
        error: "",
        img: [],
        UserData: []
    }
    const storage = getStorage();
    console.log(storage)
    const [FormData, setFormData] = useState(initialstate);
    const { restaurantName, menuName, price, type, img_url, img } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value,
            error: ""
        })
    }

    const [menuData, setmenuData] = useState([{
        id: '',
        deals: ''
    }]);

    useEffect(() => {
        getRestaurants()
    }, [])
    const mountainsRef = ref(storage, img.name);
    const mountainImagesRef = ref(storage, `files/${img}`);
    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name;           // true
    mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 

    console.log(mountainImagesRef)
    async function getRestaurants() {
        let arrayData = []
        const citiesCol = collectionGroup(db, 'deals')
        const citySnapshot = await getDocs(citiesCol);
        console.log(citySnapshot._docs)
        citySnapshot.forEach(item => {
            arrayData.push({
                id: item.id,
                deals: item.data()
            });
        })
        setmenuData(arrayData);
    }
    async function deleteUser(e) {
        console.log(e)
        // Add a new document in collection "cities"
        await deleteDoc(doc(db, "deals", e));
        window.location = "/deals"
    }

    const imagesSet = (imageArray) => {
        console.log(imageArray);
        // eslint-disable-next-line
        imageArray.map((detail) => {
            setFormData({
                ...FormData,
                img: detail.originFileObj,
            })
        })
    }
    console.log(mountainsRef)
    async function addDeals() {
        const docRef = await addDoc(collection(db, "deals"), {
            restaurant: restaurantName,
            name: menuName,
            img_url: mountainsRef.toString(),
            type: type,
            price: price
        });
        console.log("Document written with ID: ", docRef.id);
        window.location = "/deals"
    }

    return (
        <>
            <div className="row pt-3 mr-0">
                <div className="col-11 mx-auto">
                    {Usertype === 'owner' &&
                        <>
                            <form>
                                <h3>Add Deal</h3>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <input type="text"
                                            className="form-control Radius_10 m-1"
                                            placeholder="Restaurant Name"
                                            name="restaurantName"
                                            onChange={onHandleChange}></input>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <input type="text"
                                            className="form-control Radius_10 m-1"
                                            placeholder="Menu Name"
                                            name="menuName"
                                            onChange={onHandleChange}></input>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <input type="number"
                                            className="form-control Radius_10 m-1"
                                            placeholder="price"
                                            name="price"
                                            onChange={onHandleChange}></input>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <input type="text"
                                            className="form-control Radius_10 m-1"
                                            placeholder="type"
                                            name="type"
                                            onChange={onHandleChange}></input>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <UploadComponent imagesSet={imagesSet} limit={1} display={img} />
                                    </div>
                                </div>
                                <button className="btn White skyblue d-block mx-auto mt-4" type="button" onClick={addDeals}>
                                    Add Deal
                                </button>
                            </form>
                            <hr></hr>
                        </>
                    }
                    <h3>All Deals</h3>
                    <div className="pt-3">
                        <table class="table table-responsive table-bordered w-100 d-block">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Restaurant</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Img URL</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuData && menuData.map((index) => {
                                    console.log(index)
                                    return (
                                        <tr>
                                            <td scope="col">{index.id}</td>
                                            <td scope="col">{index.deals.restaurant}</td>
                                            <td scope="col">{index.deals.name}</td>
                                            <td scope="col">{index.deals.type}</td>
                                            <td scope="col">{index.deals.price}</td>
                                            <td scope="col">{index.deals.img_url}</td>
                                            {Usertype === 'owner' && <td scope="col"><button className="btn btn-danger" onClick={() => deleteUser(index.id)}>Delete</button></td>}
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

export default Deals;