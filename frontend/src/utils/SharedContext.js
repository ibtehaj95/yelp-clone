import React, { createContext, useContext } from 'react';

const sharedContext = createContext(); //create context

export const useSharedContext = () => useContext(sharedContext); //custom hook

export const SharedContextProvider = ({children}) => {
    // the real code that needs to be shared
    const displayDollarSigns = (count) => {
        let string = "";
        for(let i=0; i<count; ++i){
            string = string + "$";
        }
        return string;
    };
    //put all the items to be shared here
    const sharedContextItems = {
        displayDollarSigns
    }
    return(
        <sharedContext.Provider value={sharedContextItems}>
            {children}
        </sharedContext.Provider>
    );
};