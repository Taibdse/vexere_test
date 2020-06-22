import React from 'react';
import { Skeleton, Row, Col } from 'antd';


const SkeletonLoading = () => {
    const skeletons = [1,2,3,4,5,6];
    
    return (
        <Row gutter={16}>
            {skeletons.map(item => (
                <Col xs={12} sm={12} md={8} lg={6} xl={4} key={item} span={8}>
                    <Skeleton loading={true} active />
                </Col>
            ))}
        </Row>
    );
};


export default SkeletonLoading;