import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const client_id = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
console.log(window.location.origin + "/profile");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={client_id}
      authorizationParams={{
        redirect_uri: window.location.origin + "/profile",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
