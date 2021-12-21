import React from 'react';

import { message } from 'antd';
import axios from 'axios'

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            TotalUser: 0,
            TotalBookings: 0,
            TotalSaloons: 0
        }
    }
    componentDidMount() {
        this.getUser()
    }
    getUser = () => {
        axios.get("Https://blackbooking.org/api/admin/total_users")
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    this.setState({
                        TotalUser: response.data.data
                    })
                }

                this.getBookings();
            })

            .catch(function (error) {
                message.error(error);
            });
    }
    getBookings = () => {
        axios.get("Https://blackbooking.org/api/admin/total_bookings")
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    this.setState({
                        TotalBookings: response.data.data
                    })
                }
                this.getSaloons();
            })

            .catch(function (error) {
                message.error(error);
            });
    }
    getSaloons = () => {
        axios.get("Https://blackbooking.org/api/admin/total_vendors")
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    this.setState({
                        TotalSaloons: response.data.data
                    })
                }
            })

            .catch(function (error) {
                message.error(error);
            });
    }

    render() {

        return (
            <>
                <div className="row mr-0 ">
                    <h2 className=" pt-3 col-11 mx-auto">Dashboard</h2>

                    <div className="row mr-0 col-11 mx-auto Dashboard">
                        <div className="col-sm-4 col-12 my-3">
                            <div className="card Radius_10">
                                <div className="card-body padding30px">
                                    <h5 className="card-title text-center mb-0">Total Saloons</h5>
                                    <p className="card-text text-center font40">{this.state.TotalSaloons}</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-12 my-3">
                            <div className="card Radius_10">
                                <div className="card-body padding30px">
                                    <h5 className="card-title text-center mb-0">Total Bookings</h5>
                                    <p className="card-text text-center font40">{this.state.TotalBookings}</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-12 my-3">
                            <div className="card Radius_10">
                                <div className="card-body padding30px">
                                    <h5 className="card-title text-center mb-0">Total Users</h5>
                                    <p className="card-text text-center font40">{this.state.TotalUser}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard;