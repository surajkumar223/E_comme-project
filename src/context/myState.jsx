import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, {createContext, useContext, useEffect, useState} from 'react';
import { fireDB } from '../firebase/FirebaseConfig';


const StateContext = createContext(); 


export const ContextProvider = ({children}) => { //app

    const [loading, setloading]=useState(false);
    //get all product state
    const [getAllProduct, setGetAllProduct] = useState([]);

    const getAllProductFunction= async()=>{

        setloading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy("time")
            );  
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setloading(false);
            });
            return () => data;
        } catch (error) {
            console.error(error);
            setloading(false);
            
        }
    }

    
    useEffect(() => {
        getAllProductFunction();
    }, []);
    return (
        <StateContext.Provider value={
           {
            loading,
            setloading,
            getAllProduct,
            getAllProductFunction
        }
        }>
            {children}
        </StateContext.Provider>
    );  

};

export const useStateContext = () => useContext(StateContext);//homeoages   , signup
