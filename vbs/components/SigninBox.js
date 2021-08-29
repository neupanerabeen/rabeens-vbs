import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { APP_CONFIG } from '../helpers/config';

export const SigninBox = () =>{
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [msg, setMsg] = React.useState()
    const [loader, setLoader] = React.useState(false)


    const signin =() =>{
        setLoader(true)
        setMsg()
        console.log(`${APP_CONFIG.api_path}/signin`)
        fetch(`${APP_CONFIG.api_path}/signin`,{
            method:"POST",
            data:JSON.stringify({
                username:username,
                password:password
            }),
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        })
        .then(res=>{console.log(res); return res})
        .then(res=>res.json())
        .then(res=>{
            setLoader(false)
            if(res.status === 200){
                props.storeToken(res.token)
            }
            else if(res.status === 401){
                setMsg(res.msg)
                // props.storeToken(res.token)
            }
            else{
                setMsg("Failed to Login!")
            }
        })
        .catch(err=>{
            console.log(err)
            setLoader(false)
            setMsg("Error to Login!")
        })
    }

    if(loader){
        return <Text>Signing In...</Text>
    }

    return <View
        style={style.box}
    >
        <StatusBar style="auto" />
        {
            msg?
                <Text
                    style={style.msgStyle}
                >
                    {msg}
                </Text>
                :null
        }

        <TextInput 
            autoFocus={true}
            placeholder={"Username"}
            value={username} 
            onChangeText={(e)=>setUsername(e)}
            style={style.input}
        >
        </TextInput>
        <TextInput 
            secureTextEntry={true}
            placeholder={"Password"}
            value={password} 
            onChangeText={(e)=>setPassword(e)}
            style={style.input}
        >
        </TextInput>
        <Button 
            title="Signin"
            onPress={e=>{
                signin()
            }}
        >
        </Button>

    </View>
} 


const style=StyleSheet.create({
    input:{
        borderBottomWidth:1,
        marginBottom:20,
        textAlign:"center",
        fontSize:24
    },
    box:{
        flex:1,
        alignContent:"center",
        justifyContent:"center",
        width:360,
        alignSelf:"center",
        // alignItems:"center"
    },
    msgStyle:{
        color:"red",
        textAlign:"center",
        marginTop:10
    }
})