import React from 'react';
import { Button, Text, View } from 'react-native';
import { MyActiveRentals } from './MyActiveRentals';
import { MyRequests } from './MyRequests';


export const Dashboard = props =>{
    return <View>
        <MyRequests/>
        <MyActiveRentals />
        <View>
            <Text 
                style={{
                    fontSize:18,
                    textAlign:"center",
                    marginTop:20,
                    marginBottom:20
                }}
            >
                Hello
            </Text>
        </View>
        <View
            style={{
                margin:10
            }}
        >
            <Button 
                title="Book Now" 
                onPress={()=>{
                    props.navigation.navigate("BookVehicle")
                }}
            ></Button>
        </View>
    </View>
}