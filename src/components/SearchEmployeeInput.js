import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

const SearchEmployeeInput = (props) => {
    const { value, onChange } = props;
    return (
        <Search
            value={value}
            placeholder="Search by name or email"
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '100%' }}
        />
    );
};


export default SearchEmployeeInput;