import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const DepartmentSelect = (props) => {
    const { departments, onChange, value } = props;

    return (
        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Select Department"
            optionFilterProp="children"
            onChange={onChange}
            value={value}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
        <Option value={'0'}>All</Option>
        {departments.map(dep => (
            <Option key={dep.title} value={dep.title}>{dep.title}</Option>
        ))}
      </Select>
    );
};


export default DepartmentSelect;