import React, { useState } from 'react';
import { Space, Table, Button, Modal } from 'antd';
import { message } from 'antd';
import axios from 'axios'

export default function UserRequestComponent(props) {
    const initialstate = {
        first_name: "",
        last_name: "",
        email: "",
        verification_image: [],
        _id: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { first_name, last_name, email, verification_image, _id } = FormData;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (e) => {
        console.log('show model', e)
        setIsModalVisible(true);
        setFormData({
            ...FormData,
            first_name: e.first_name + " " + e.last_name,
            last_name: e.last_name,
            email: e.email,
            verification_image: e.verification_image,
            _id: e._id
        })
    };

    const handleOk = (id) => {
        setIsModalVisible(false);
        // console.log(e)
        axios.put("Https://blackbooking.org/api/admin/approve_user/" + id)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success("Approved Successfull")
                    props.getUserDetail()
                }
            })

            .catch(function (error) {
                message.error(error);
            });
    };

    const handleCancel = (e) => {
        setIsModalVisible(false);
        console.log(e)
    };

    const RenderVerificationImage = verification_image.map((source) => {
        return (
            <img src={source} alt="images" className="col-6 p-2"></img>
        )
    })

    const columns = [
        {
            title: 'ID',
            render: (value) => value._id.slice(-4),
            sorter: {
                compare: (a, b) => a._id.localeCompare(b._id)
            },
        },
        {
            title: 'First Name',
            render: (value) => value.first_name,
            sorter: {
                compare: (a, b) => a.first_name.localeCompare(b.first_name)
            },
        },
        {
            title: 'Last Name',
            render: (value) => value.last_name,
            sorter: {
                compare: (a, b) => a.last_name.localeCompare(b.last_name)
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Space size="middle">

                <Button type="primary" className="skyblue White border-0" onClick={(e) => { showModal(record) }}>Details</Button>
                <Modal okText="Approve" title="Business Details" visible={isModalVisible} onOk={(e) => { handleOk(_id) }} onCancel={(e) => { handleCancel(record) }}>

                    <div className="row">
                        <div className="col-6">
                            <p><strong>First Name:</strong></p>
                            <p><strong>Last Name:</strong></p>
                            <p><strong>Email:</strong></p>
                        </div>
                        <div className="col-6">
                            <p>{first_name}</p>
                            <p>{last_name}</p>
                            <p>{email}</p>
                        </div>
                    </div>

                    <div className="padding30px">
                        <p className=""><strong>Identity Vefication Images:</strong></p>
                        <div className="row ">
                            {RenderVerificationImage}
                        </div>
                    </div>
                </Modal>,
                <button type="button" className="btn skyblue White" onClick={(e) => { Reject(record._id) }}>Reject</button>
            </Space>,

        },
    ];

    const data = props.data;

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }
    // eslint-disable-next-line
    const Reject = (id) => {
        // console.log('Content: ', id);
        axios.put("Https://blackbooking.org/api/admin/reject_user/" + id)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success("Rejected Successfully")
                    props.getUserDetail()
                }
            })

            .catch(function (error) {
                message.error(error);
            });
    }
    return (
        <>
            {console.log(data)}
            <Table columns={columns} dataSource={data} onChange={onChange} className="table-responsive" />
        </>
    )
}

