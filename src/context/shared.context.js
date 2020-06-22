import React, { useState, useEffect } from 'react';
import SpreadsheetService from '../services/spreadsheet.service';

export const SharedContext = React.createContext();

export const SharedProvider = (props) => {
    
    const [signedIn, setSignedIn] = useState(false);
    const [isLoadedGoogleResource, setLoadedGoogleResource] = useState(false);
    const [isLoadingGoogleResource, setLoadingGoogleResource] = useState(false);

    useEffect(() => {
        initGoogleClientLoad();
    }, []);
   
    const initGoogleClientLoad = async () => {
        setLoadingGoogleResource(true);
        try {
            await SpreadsheetService.handleClientLoad();
            await SpreadsheetService.initClient();
            
            setLoadedGoogleResource(true);
        } catch (error) {
            console.log(error);
            setLoadedGoogleResource(false);
        }
        setLoadingGoogleResource(false);
    }
   
    const state = { signedIn, isLoadedGoogleResource, isLoadingGoogleResource };
    const methods = { setSignedIn, setLoadedGoogleResource };

    return (
        <SharedContext.Provider value={{
            ...state,
            ...methods
        }}>
            { props.children }
        </SharedContext.Provider>
    )
}