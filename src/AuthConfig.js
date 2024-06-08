import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "c40f08d9-e1ec-49d4-a35c-fe39df23a401", // Your Client ID
    authority: "https://login.microsoftonline.com/22df4783-35a0-479e-84bb-178af5648ba5", // Your Authority (Tenant ID)
    redirectUri: "http://localhost:3000/admin/accueil" // Your Callback Path
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  },
  protectedResourceMap: null // Set protectedResourceMap to null
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
