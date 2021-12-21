import React from 'react';
import { Table, message } from 'antd';
import axios from 'axios'

export default function UserComponent(props) {
    console.log(props)

    const columns = [
    //     {
    //        title: 'ID',
    //        dataIndex: props.id,
    //    },
         {
            title: 'First Name',
            dataIndex: 'fName',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        // {
        //     title: 'First Name',
        //     dataIndex: 'first_name',
        //     sorter: {
        //         compare: (a, b) => a.first_name.localeCompare(b.first_name)
        //     },
        // },
        // {
        //     title: 'Last Name',
        //     dataIndex: 'last_name',
        // },
        // // {
        // //     title: 'Phone',
        // //     dataIndex: 'contact',
        // // },
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        // },
        // {
        //     title: 'Actions',
        //     dataIndex: '_id',
        //     key: 'x',
        //     render: (text, record, index) => <Space size="middle">
        //         <button type="button" className="btn btnClass" onClick={(e) => { deleteUser(record._id) }}>Delete</button>
        //     </Space>,

        // },
    ];

    const data = props.data;

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <Table columns={columns} dataSource={data} onChange={onChange} className="table-responsive" />

    )
}

