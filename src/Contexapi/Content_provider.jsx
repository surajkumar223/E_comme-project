import React, {createContext, useState, useContext} from 'react';


const StateContext = createContext(); 
export const ContextProvider12 = ({children}) => {

    const [cart1, setCart1] = useState([]);

    return (
        <StateContext.Provider value={{cart1, setCart1}}>
            {children}
        </StateContext.Provider>
    );

};

export const useStateContext1 = () => useContext(StateContext);
