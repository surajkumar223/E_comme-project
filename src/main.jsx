import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import ConteProvider from './Contexapi/ConteProvider.jsx';

import { ContextProvider12 } from './Contexapi/Content_provider.jsx';

//  ConteProvider   
// import { ContextProvider } from './context/myState.jsx';
// import  {store } from './redux/store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    {/* <Provider store={store}> */}
    <ContextProvider12>
      <ConteProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      </ConteProvider>
      
    </ContextProvider12>


    {/* </Provider> */}
  </React.StrictMode>,
) 