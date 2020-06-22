import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const AppTabs = (props) => {
    const { setTabs, totalEmployees, totalDepartments } = props;
    
    return (
        <Tabs defaultActiveKey="1" onChange={(key) => setTabs(key)}>
            <TabPane tab={`Departments (${totalDepartments})`} key="1">
                { props.children }
            </TabPane>
            <TabPane tab={`Employees (${totalEmployees})`} key="2">
                { props.children }
            </TabPane>
        </Tabs>
    );
};


export default AppTabs;