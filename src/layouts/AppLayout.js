import React, { useContext } from 'react';
import { Layout, Menu, Button } from 'antd';
import SpreadsheetService from '../services/spreadsheet.service';
import { SharedContext } from '../context/shared.context';
import AppSpinner from '../components/AppSpinner';
const { Header, Content, Footer } = Layout;

const buttonStyle = { 
    float: 'right', 
    marginTop: '15px' 
}

const AppLayout = (props) => {
    const sharedContext = useContext(SharedContext);
    const { signedIn, isLoadingGoogleResource, isLoadedGoogleResource } = sharedContext;

    const signIn = async () => {
        try {
            const res = await SpreadsheetService.signIn();
            sharedContext.setSignedIn(true);
        } catch (error) {
            console.log(error);
        }
    }

    const signOut = async () => {
        try {
            const res = await SpreadsheetService.signOut();
            sharedContext.setSignedIn(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" style={{ float: 'left', color: '#fff' }} >Vexere</div>
                {(!signedIn && isLoadedGoogleResource) && (
                    <Button  onClick={signIn} style={buttonStyle}>
                        Sign In With Goolge Account
                    </Button>
                )}
                {signedIn && isLoadedGoogleResource && (
                    <Button  onClick={signOut} style={buttonStyle}>
                        Sign Out
                    </Button>
                )}
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: '100vh' }}>
                    {isLoadedGoogleResource && props.children}
                    {isLoadingGoogleResource && (<AppSpinner/>)}
                </div>
            </Content>
            
            <Footer style={{ textAlign: 'center' }}>Develeped by Bui Duc Tai for Vexere company</Footer>
        </Layout>
    );
};


export default AppLayout;