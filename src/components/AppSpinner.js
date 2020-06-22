import React from 'react';
import { Spin } from 'antd';

const AppSpinner = () => {
    return (
        <div className="text-center">
            <Spin />
            <Spin />
            <Spin />
        </div>
    );
};


export default AppSpinner;