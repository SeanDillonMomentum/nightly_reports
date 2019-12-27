// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

const config = {
  auth: {
    authority:
      'https://login.microsoftonline.com/e485c427-0599-4dbd-86d9-add2e5942a49',
    clientId: 'dd329dea-8c05-4e84-a4e6-1977bd2bc267',
    // redirectUri: "localhost"
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

const authenticationParameters = {
  scopes: ['openid'],
};

export const authProvider = new MsalAuthProvider(
  config,
  authenticationParameters,
  LoginType.Popup
);
