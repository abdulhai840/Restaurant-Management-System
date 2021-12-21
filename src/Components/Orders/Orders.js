import React, { useEffect, useState } from 'react';
import OrderComponent from './OrderComponent';
import db from '../../firebase.config'
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';

const Orders = () => {
    let Usertype = localStorage.getItem('type')
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        getOrders()
        // eslint-disable-next-line
    }, []);

  const removeService=(e)=> {
        console.log(e)
        // idToRemove = e;
    
        let myArr = orderData.filter(function (item) {
          console.log('item', item)
          return item.user_id !== e;
        });
        console.log('removed', myArr)
        // this.setState({ services: myArr })
        setOrderData(myArr)
      }
    async function getOrders () {
        let arrayData = []
        const citiesCol = collection(db, 'orders');
        const citySnapshot = await getDocs(citiesCol);
        console.log(citySnapshot._docs) 
        citySnapshot.forEach(item => {
            console.log(item)
            arrayData.push(item.data());
        })
        setOrderData(arrayData);
    }

    async function addOrders(currentuser, description, name, price, img_url, quantity ,currentTime, currentDate) {
        const docRef = await addDoc(collection(db, "AcceptedOrders"), {
            User: currentuser,
            description: description,
            name:name,
            img_url: img_url,
            price: price,
            quantity: quantity,
            currentTime: currentTime,
            currentDate:currentDate
        });
        console.log("Document written with ID: ", docRef.id);
        removeService(currentuser)
        window.location = "/orders"
    }
    return (
        <>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <h6>Orders</h6>
                    {/* <OrderComponent data={orderData} /> */}
                    <div className="pt-3">
                        <table class="table table-responsive table-bordered w-100 d-block">
                            <thead>
                                <tr>
                                    <th scope="col">User</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Restaurant Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Current Time</th>
                                    <th scope="col">Current Date</th>
                                    <th scope="col">Img URL</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData && orderData.map((index) => {
                                    console.log(index)
                                    return (
                                        <tr>
                                            <td scope="col">{index.user_id}</td>
                                            <td scope="col">{index.description}</td>
                                            <td scope="col">{index.restaurant_name}</td>
                                            <td scope="col">{index.quantity}</td>
                                            <td scope="col">{index.price}</td>
                                            <td scope="col">{index.currentTime}</td>
                                            <td scope="col">{index.currentDate}</td>
                                            <td scope="col">{index.img_url}</td>
                                            {Usertype === 'owner' && <td scope="col"><button className="btn btn-success" onClick={() => addOrders(index.user_id,index.description,index.name,index.price,index.img_url,index.quantity,index.currentTime,index.currentDate)}>Accept</button></td>}
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

export default Orders;