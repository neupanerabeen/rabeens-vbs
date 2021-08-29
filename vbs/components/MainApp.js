import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

import { MyRequests } from './MyRequests';
import { MyActiveRentals } from './MyActiveRentals';
import {Dashboard} from './Dashboard';
import {Admin} from './Admin';
import { APP_CONFIG } from '../helpers/config';
import { AllRequests } from './AllRequests';
import { Users } from './Users';
import { Holidays } from './Holidays';
import { LogOut } from './LogOut';
import { BookVehicle } from './BookVehicle';


const Drawer = createDrawerNavigator();


export const MainApp = props =>{
    const [isAdmin, setIsAdmin] = React.useState()


    React.useEffect(()=>{
      fetch(`${APP_CONFIG.api_path}/`,{
          "ContentType":"application/json",
          "Authentication":`Bearer token`
      })
      .then(res=>res.json())
      .then(res=>{
          if(res.status===200){
            if(res.msg === true){
              setIsAdmin(res.msg)
            }else{
              setIsAdmin(false)
            }
              
          }else if(res.status === 401){
              // signout
          }
          else{
              setIsAdmin(false)
          }
      })
      .catch(err=>{
        setIsAdmin(false)
      })
  },[])

    if(isAdmin === undefined){
      return <View
        style={{
          flex:1,
          alignItems:"center",
          justifyContent:"center"
        }}
      >
        <Text>Loading app...</Text>
      </View>
    }

    return <NavigationContainer> 
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen 
          name="Dashboard"
          component={Dashboard}
          options={{
            title:APP_CONFIG.appTitle||"Dashboard"
          }}
        />
        {/* <Drawer.Screen name="MyRequests" component={MyRequests}/> */}
        <Drawer.Screen name="BookVehicle" component={BookVehicle}/>
        
        {
          isAdmin?<>
            <Drawer.Screen name="AllRequests" component={AllRequests}/>
            <Drawer.Screen name="Users" component={Users}/>
            <Drawer.Screen name="Holidays" component={Holidays}/>
          </>
          :null
        }

        <Drawer.Screen name="LogOut" component={LogOut}/>



      </Drawer.Navigator>

    </NavigationContainer>
}