import React from 'react';
import { Text, View } from 'react-native';
import { APP_CONFIG } from '../helpers/config';


export const MyActiveRentals = ()=>{
    const [data, setData] = React.useState()


    React.useEffect(()=>{
        fetch(`${APP_CONFIG.api_path}/`,{
            "ContentType":"application/json",
            "Authentication":`Bearer token`
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.status===200){
                setData(res.msg)
            }else if(res.status === 401){
                // signout
            }
            else{
                setData([])
            }
        })
        .catch(err=>{
            setData([])
        })
    },[])
    if(data === undefined){
        return <Text>Loading...</Text>
    }

    if(data.length === 0){
        return null
    }

    return <View >
        <Text>My active rentals</Text>
        </View>
}