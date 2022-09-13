
import { createRoot } from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import {APP_ID, SERVER_URL} from "./config";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
 


root.render( 
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <App />
    </MoralisProvider> 
);
