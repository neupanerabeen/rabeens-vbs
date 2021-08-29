import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Text, TextInput, View } from 'react-native';

export const DateTime = props =>{
    const [show, setShow] = React.useState(false)


    if(!show){
        return <View
            style={{
                flexDirection:"row",
                alignContent:"stretch"
            }}
        >
            <Text
                style={{
                    flex:4
                }}
            >{props.value&&props.value.toLocaleString()}
            </Text>
            
            <Button 
                style={{
                    flex:1
                }}
                title="Select Date" 
                onPress={e=>setShow(!show)}
            />
        </View>
    }

    if(show){
        return <View>
            
            <DateTimePicker 
                value = {new Date()}
                mode={props.mode || "date"}
                minimumDate= {props.minimumDate || null }
                maximumDate= {props.maximumDate || null }
                onChange={e=>{
                    setShow(false)
                    props.setDate(e.nativeEvent.timestamp)
                }}
            >
        </DateTimePicker>
    </View>
    }
}