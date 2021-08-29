import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';


import { APP_CONFIG } from './helpers/config';
import { SigninBox } from './components/SigninBox';
import { MainApp } from './components/MainApp';
export default function App() {

  const [token, setToken] = React.useState()
  React.useEffect(()=>{
    getToken()
  },[])

  const getToken =e=>{
    AsyncStorage.getItem(APP_CONFIG.token_store_key)
    .then((res)=>{
      if(res === null){
        // setToken(false)
        setToken("false")
      }else{
        setToken(res)
      }        
    })
    .catch(err=>{
      console.log(err)
      setToken(false)
    })
  }

  const storeToken =(token)=>{
    AsyncStorage.setItem(APP_CONFIG.token_store_key, token)
    .then((res)=>{
        setToken(token)
    })
    .catch(err=>{
      console.log(err)
      setToken(false)
    })
  }


  React.useEffect(()=>{
    // getToken()
  },[])

  if(token === undefined || token === null){
    return <View style={styles.container}>
    <Text>Opening app...</Text>
    <StatusBar style="auto" />
  </View>
  }

  if(token === false){
    return <SigninBox 
      storeToken={token=>storeToken(token)}
    />
  }

  const signout = () =>{
    AsyncStorage.removeItem(APP_CONFIG.token_store_key)
    .then((res)=>{
        storeToken(false)
    })
    .catch(err=>{
      // setToken(false)
    })

  }


  return (
    <MainApp/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
