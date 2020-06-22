import React from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';

const DepartmentCardHeader = (props) => {
    const { totalEmployees } = props;
    return (
        <div className="department-card-header">
            <UsergroupAddOutlined style={{ fontSize: '2em' }} />
            <div>Total: {totalEmployees}</div>
        </div>
    )
}

const cardStyle = {
    borderRadius: '20px'
}

const cardBodyStyle = {
    textAlign: 'center', 
    background: 'blue', 
    color: '#fff', 
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1.1em'
}

const Departments = (props) => {
    const { departments } = props;

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {departments.map(department => (
                    <Col xs={12} sm={12} md={8} lg={6} xl={4} key={department.title} style={{ marginBottom: '10px' }}>
                        <Card 
                            title={<DepartmentCardHeader totalEmployees={department.totalEmployees} />} 
                            style={cardStyle} 
                            bodyStyle={cardBodyStyle}
                            bordered={true}
                        >
                            {department.title}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};


export default Departments;