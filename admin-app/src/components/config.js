import * as msal from 'msal'
const msalConfig = {
    auth: {
      clientId: "c9869064-dd4e-4245-a1a6-e655c72a3e06",
      // identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
      authority: 'https://login.microsoftonline.com/a320d17d-ed3d-4f13-9043-96e69f4481fb',
      redirectUri: 'http://localhost:8081',
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
  }
  
  export const graphScopes = { scopes: ['user.read'] }
  
  export const myMSALObj = new msal.UserAgentApplication(msalConfig)
  
