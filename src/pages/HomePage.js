import React, { useContext, useState, useEffect } from 'react';
import { SharedContext } from '../context/shared.context';
import AppTabs from '../components/AppTabs';
import Departments from '../components/Departments';
import Employees from '../components/Employees';
import SpreadsheetService from '../services/spreadsheet.service';
import SkeletonLoading from '../components/SkeletonLoading';
import AppLayout from '../layouts/AppLayout';
import DepartmentSelect from '../components/DepartmentSelect';
import SearchEmployeeInput from '../components/SearchEmployeeInput';
import StringUtils from '../common/utils/string';
import { Row, Col } from 'antd';

const mapSpreadsheetData = (data) => {
    const employees = data.map(item => ({
        id: item[0],
        fullname: item[4],
        departmentTitle: item[3],
        phone: item[7],
        email: item[8]
    }));

    const departmentsObj = employees.reduce((acc, emp) => {
        acc[emp.departmentTitle] = acc[emp.departmentTitle] === undefined ? 1 : acc[emp.departmentTitle] + 1;
        return acc;
    }, {});


    const departments = Object.keys(departmentsObj).map((key, index) => ({
        title: key,
        totalEmployees: departmentsObj[key]
    }));

    return { employees, departments }
}

let searchTimeout = null;

const HomePage = (props) => {

    const sharedContext = useContext(SharedContext);
    const { signedIn, isLoadedGoogleResource } = sharedContext;

    const [currentTab, setCurrenttab] = useState(1);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [renderedEmployees, setRenderedEmployees] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ department: '0', keyword: '' });

    useEffect(() => {
        if(isLoadedGoogleResource){
            sharedContext.setSignedIn(SpreadsheetService.isSignedIn());
        }
    }, [isLoadedGoogleResource]);

    useEffect(() => {
        if(signedIn){
            getSpreadsheetData();
        }
    }, [signedIn]);
    
    
    const getSpreadsheetData = async () => {
        setLoading(true);
        try {
            const res = await SpreadsheetService.makeApiCall();
            const data = mapSpreadsheetData(res.result.values.slice(8));
            setDepartments(data.departments);
            setEmployees(data.employees);
            filterEmployees(data.employees, filters);
            
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const changeFilters = (prop, value) => {
        const newFilters = { ...filters, [prop]: value };
        setFilters(newFilters);
        if(prop === 'keyword'){
            window.clearTimeout(searchTimeout);
            searchTimeout = window.setTimeout(() => {
                filterEmployees(employees, newFilters);
            }, 300);
        } else {
            filterEmployees(employees, newFilters);
        }
    } 

    const filterEmployees = (employees, filters) => {
        const newEmps = employees.filter(emp => {
            const { department, keyword } = filters;
            const depCond = (department === '0' || emp.departmentTitle === department);
            const keywordCond = StringUtils.contain(emp.fullname, keyword) || StringUtils.contain(emp.email, keyword) 
            return depCond && keywordCond;
        });
        setRenderedEmployees(newEmps);
    }

    return (
        <AppLayout>
            {isLoading && <SkeletonLoading/>}
            {(!isLoading && sharedContext.signedIn) && (
                <AppTabs setTabs={setCurrenttab} 
                    totalEmployees={employees.length} 
                    totalDepartments={departments.length}
                >
                    { currentTab === 1 && <Departments departments={departments} /> }
                    { currentTab === 2 && (
                        <Row gutter={16}>
                           <Col xs={12} sm={8} lg={4}>
                                <DepartmentSelect 
                                    departments={departments} 
                                    onChange={value => changeFilters('department', value)} 
                                    value={filters.department}
                                />
                           </Col>
                           <Col xs={12} sm={8} lg={6}>
                                <SearchEmployeeInput 
                                    value={filters.keyword} 
                                    onChange={(value) => changeFilters('keyword', value)} />
                           </Col>
                            
                            <Col span={24} style={{ marginTop: '25px' }}>
                                <Employees employees={renderedEmployees} />
                            </Col>
                        </Row>
                    ) }
                </AppTabs>
            )}
            {(!sharedContext.signedIn && sharedContext.isLoadedGoogleResource) && <h3 className="text-center">Please login to view employees list</h3>}
        </AppLayout>
    );
};

export default HomePage;