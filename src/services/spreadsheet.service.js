
import { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } from '../common/constants';

class SpreadsheetService {

    static async makeApiCall() {
        var params = {
          spreadsheetId: '1i-0Tq2Bc5lzJqoizxMeBA95dgQDSkmHLXt6eWLv94Cc',
          range: 'Danh sách',
          valueRenderOption: 'FORMATTED_VALUE',
          dateTimeRenderOption: 'SERIAL_NUMBER',
        };
        return window.gapi.client.sheets.spreadsheets.values.get(params);
    }
  
    static initClient() {
        const API_KEY = GOOGLE_API_KEY ; 
        const CLIENT_ID = GOOGLE_CLIENT_ID; 
        const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

        return window.gapi.client.init({
            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'scope': SCOPE,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        })
    }

    static isSignedIn = () => window.gapi.auth2.getAuthInstance().isSignedIn.get();

    static handleClientLoad() {
        return new Promise((resolve, reject) => {
            window.gapi.load('client:auth2', () => {
                resolve(true);
            }); 
        })
    }

    static signIn() {
        return window.gapi.auth2.getAuthInstance().signIn();
    }

    static signOut() {
        return window.gapi.auth2.getAuthInstance().signOut();
    }
}


export default SpreadsheetService;