import React from 'react';
import { Button, Text, View } from 'react-native';
import { APP_CONFIG } from '../helpers/config';


export const LogOut = ()=>{
    const [data, setData] = React.useState()


    const logout =()=>{
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
    }


    return <View style={{ flex: 1, justifyContent: 'center', margin:20 }}>
        <Text style={{textAlign:"center", fontSize:24}}>Are you sure to logout?</Text>
        <Button color={"red"} title="Yes"></Button>
        <Button color={"cyan"} title="No"></Button>
        </View>
}