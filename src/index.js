
import { createRoot } from "react-dom/client";
import { MoralisProvider } from "react-moralis";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


const APP_ID = "glKSCAWH3oGNrzbG581lYX25mXu7qh84qCH4nd7d";
const SERVER_URL = "https://hbnfhwab61xo.usemoralis.com:2053/server";
// const masterKey = "SGhkgqsHuTGvIojq1lLkzq068zX2k5nQF1SPZ8I7";

root.render( 
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <App />
    </MoralisProvider> 
);
