import React from 'react';
import { message } from 'antd';
import axios from 'axios';
import UserRequestComponent from './UserRequestComponent';
class UserRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserData: []
        }
    }
    componentDidMount = () => {
        this.getUserDetail()
    }
    getUserDetail = () => {
        axios.get("Https://blackbooking.org/api/admin/user_verification_requests")
            .then((response) => {
                console.log(response)
                // eslint-disable-next-line
                if (response.data.success == true) {
                    this.setState({
                        UserData: response.data.data
                    })
                }
                // eslint-disable-next-line
                else if (response.data.success == false) {
                    message.error(response.data.message)
                }
            })

            .catch(function (error) {
                message.error(error);
            });
    }
    render() {
        return (
            <>
                <div className="row h-100 mr-0">
                    <div className="col-11 mx-auto pt-3">
                        <h6>User Requests</h6>
                        {this.state.UserData.length > 0 ? <>
                            <UserRequestComponent data={this.state.UserData} getUserDetail={this.getUserDetail} />
                        </> :
                            <div className="container h-100 center Pt25" >
                                <div className="my-auto px-auto h-100 d-block">
                                    <div className="d-flex h-100 justify-content-center">
                                        <div className="my-auto">

                                            <p>No Requests Available</p>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                    </div>
                </div>
            </>
        )
    }
}

export default UserRequests;