import React from 'react';
import { Space, Table } from 'antd';
// const MenuData = [
//     {
//         id: '1',
//         name: 'Menu-1',
//         price: 20,
//         description: 'extra sauce',
//         imgUrl: 'google.com',
//         type: 'Burger'
//     },
//     {
//         id: '2',
//         name: 'Menu-1',
//         price: 20,
//         description: 'extra sauce',
//         imgUrl: 'google.com',
//         type: 'Burger'
//     },
//     {
//         id: '3',
//         name: 'Menu-1',
//         price: 20,
//         description: 'extra sauce',
//         imgUrl: 'google.com',
//         type: 'Burger'
//     },
//     {
//         id: '4',
//         name: 'Menu-1',
//         price: 20,
//         description: 'extra sauce',
//         imgUrl: 'google.com',
//         type: 'Burger'
//     },
//     {
//         id: '5',
//         name: 'Menu-1',
//         price: 20,
//         description: 'extra sauce',
//         imgUrl: 'google.com',
//         type: 'Burger'
//     },
// ]

export default function MenuComponent(props) {
    console.log(props)

    const columns = [
        {
            title: 'Type',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Image URL',
            dataIndex: 'img_url',
            key: 'img_url'
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            key: 'x',
            render: (text, record, index) => <Space size="middle">
                <button type="button" className="btn btn-primary">Edit</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </Space>,

        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <Table columns={columns} dataSource={props.data} onChange={onChange} className="table-responsive" />
    )
}

