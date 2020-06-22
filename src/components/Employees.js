import React from 'react';
import { Card, Col, Row } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

const Employees = (props) => {
    const { employees } = props;

    return (
        <Row gutter={16}>
            {employees.map(employee => (
                <Col xs={24} sm={12} md={8} lg={6}
                    style={{marginBottom: '15px'}} 
                    key={employee.id}
                >
                    <Card 
                        className="card-employee"
                        style={{ borderLeft: '2px solid blue', borderBottom: '2px solid blue' }}
                        bordered={true}
                    >
                        <Row gutter={0}>
                            <Col span={18}>
                                <div className="text-primary">{employee.departmentTitle}</div>
                                <div>{employee.fullname}</div>
                                <div>
                                    <span className="text-primary"><PhoneOutlined /></span> {employee.phone}
                                </div>
                                <div>
                                    <span className="text-primary"><MailOutlined /></span> {employee.email}
                                </div>
                            </Col>
                            <Col span={6}>
                                <a className="text-primary" href={`tel:${employee.phone}`}>
                                    <PhoneOutlined style={{ fontSize: '3.5em' }} />
                                </a>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};


export default Employees;