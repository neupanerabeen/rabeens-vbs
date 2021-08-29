import React from 'react';


export const userContext = React.createContext({
    "token":"",
    "signin":()=>{},
    "signout":()=>{}
})