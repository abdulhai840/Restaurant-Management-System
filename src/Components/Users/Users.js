import React, { useEffect, useState } from 'react';
import db from '../../firebase.config'
import { getDocs, doc, deleteDoc, collectionGroup } from 'firebase/firestore/lite';

const Users = () => {
    
    const [UserData, setUserData] = useState([{
        id:'',
        users:''
    }]);

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers() {
        let arrayData = []
        const citiesCol = collectionGroup(db, 'users')
        const citySnapshot = await getDocs(citiesCol);
        console.log(citySnapshot._docs)
        citySnapshot.forEach(item => {
            arrayData.push({id:item.id,
                users:item.data()});
        })
        setUserData(arrayData);

    }

    async function deleteUser(e) {
        console.log(e)
        await deleteDoc(doc(db, "users", e));
        window.location="/users"
    }
    
    return (
        <>
            <div className="row pt-3 mr-0">
                <div className="col-11 mx-auto">
                 
                    <div className="pt-3">
                        <h4>All Users</h4>
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
                                {UserData && UserData.map((index)=>{
                                    console.log(index)
                                    return(
                                    <tr>
                                    <td>{index.id}</td>
                                    <td>{index.users.fName}</td>
                                    <td>{index.users.phone}</td>
                                    <td>{index.users.email}</td>
                                    <td><button className="btn btn-danger" onClick={()=>deleteUser(index.id)}>Delete</button></td>
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

export default Users;