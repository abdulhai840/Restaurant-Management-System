import React from 'react';
import { Table } from 'antd';
import dateFormat from 'dateformat';

export default function OrderComponent(props) {
console.log(props)
    const columns = [
        {
            title: 'User',
            render: (value) => value.current_user
        },
        {
            title: 'Description',
            render: (value) => value.description
        },
        {
            title: 'Name',
            render: (value) => value.name
        },
        {
            title: 'Price',
            render: (value) => value.price
        },
        {
            title: 'Img URL',
            render: (value) => value.img_url
        },
    ];

    const data = props.data;

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <Table columns={columns} dataSource={data} onChange={onChange} className="table-responsive" />

    )
}

