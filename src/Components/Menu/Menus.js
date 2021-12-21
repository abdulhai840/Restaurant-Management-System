import React, { useEffect, useState } from 'react';
import db from '../../firebase.config'
import { collection, addDoc, getDocs, doc, deleteDoc, collectionGroup } from 'firebase/firestore/lite';
import { getStorage, ref } from "firebase/storage";
import UploadComponent from '../UploadComponent';

const Menus = () => {
    let type = localStorage.getItem('type')
    const initialstate = {
        restaurantName: "",
        menuName: "",
        price: "",
        Menutype:"",
        description: "",
        img_url: "",
        error: "",
        img: [],
        UserData: []
    }
    
    const [FormData, setFormData] = useState(initialstate);
    const { restaurantName, menuName, price, description, img_url, img, Menutype } = FormData;
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
        menus: ''
    }]);

    useEffect(() => {
        getRestaurants()
    }, [])

    async function getRestaurants() {
        let arrayData = []
        const citiesCol = collectionGroup(db, 'menu')
        const citySnapshot = await getDocs(citiesCol);
        console.log(citySnapshot._docs)
        citySnapshot.forEach(item => {
            arrayData.push({
                id: item.id,
                menus: item.data()
            });
        })
        setmenuData(arrayData);

    }

    async function deleteUser(e) {
        console.log(e)
        // Add a new document in collection "cities"
        await deleteDoc(doc(db, "menu", e));
        window.location = "/menu"
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
    const storage = getStorage();
    const mountainsRef = ref(storage, img.name);
    const mountainImagesRef = ref(storage, `files/${img}`);
    console.log(img.name)
    async function addMenu() {
        const docRef = await addDoc(collection(db, "menu"), {
            restaurant: restaurantName,
            name: menuName,
            img_url: mountainsRef.toString(),
            description: description,
            price: price,
            type: Menutype
        });
        console.log("Document written with ID: ", docRef.id);
        window.location = "/menu"
    }
    return (
        <>
            <div className="row pt-3 mr-0">
                <div className="col-11 mx-auto">
                    {type === 'owner' &&
                        <>
                            <form>
                                <h3>Add Menu</h3>
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
                                            placeholder="Description"
                                            name="description"
                                            onChange={onHandleChange}></input>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <input type="text"
                                            className="form-control Radius_10 m-1"
                                            placeholder="Type"
                                            name="Menutype"
                                            onChange={onHandleChange}></input>
                                    </div>
                                    <br/>
                                    <br/>
                                </div>
                                    <div className="col-xs-12 ">
                                        <UploadComponent imagesSet={imagesSet} limit={1} display={img} />
                                        {/* <input type="password"
                                    className="form-control Radius_10 m-1"
                                    placeholder="password"
                                    name="password"
                                    onChange={onHandleChange}></input> */}
                                    </div>
                                <button className="btn White skyblue d-block mx-auto mt-4" type="button" onClick={addMenu}>
                                    Add Menu
                                </button>
                            </form>
                            <hr></hr>
                        </>
                    }
                    <h3>All Menus</h3>
                    <div className="pt-3">
                        <table class="table table-responsive table-bordered w-100 d-block ">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Restaurant</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">price</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Type</th>
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
                                            <td scope="col">{index.menus.restaurant}</td>
                                            <td scope="col">{index.menus.name}</td>
                                            <td scope="col">{index.menus.price}</td>
                                            <td scope="col">{index.menus.description}</td>
                                            <td scope="col">{index.menus.type}</td>
                                            <td scope="col">{index.menus.img_url}</td>
                                            {type === 'owner' &&  <td scope="col"><button className="btn btn-danger" onClick={() => deleteUser(index.id)}>Delete</button></td>}
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

export default Menus;