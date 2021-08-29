import React from 'react';
import { Text, TextInput, View, ScrollView, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';


import { APP_CONFIG } from '../helpers/config';
import { DateTime } from './DateTime';

const fields = [
    {
        title:"Purpose of travel",
        inputType:"text",
        keyLabel:"purpose",
        required:true
    },
    {
        title:"Start date",
        inputType:"date",
        keyLabel:"startDateRequest",
        mode:"date",
        minimumDate:APP_CONFIG.minBookStartDaysDelta,
        maximumDate:APP_CONFIG.minBookEndDaysDelta,
        required:true
    },
    {
        title:"End date",
        inputType:"date",
        keyLabel:"endDateRequest",
        mode:"date",
        minimumDate:APP_CONFIG.minBookStartDaysDelta,
        maximumDate:APP_CONFIG.minBookEndDaysDelta,
        required:true
        // options:["Yes", "No"]
    },
    {
        title:"Travel Source",
        inputType:"text",
        keyLabel:"travelSource",
        required:true
    },
    {
        title:"Travel Destination",
        inputType:"text",
        keyLabel:"travelDestination",
        required:true
    },
    {
        title:"Expected Travel Route",
        inputType:"text",
        keyLabel:"expectedTravelRoute"
    },
    {
        title:"Expected Travel Distance",
        inputType:"number",
        keyLabel:"expectedTravelDistance"
    },
    {
        title:"Is Driver required?",
        inputType:"options",
        keyLabel:"isDriverRequired",
        options:["Yes", "No"],
        required:true
    },
    {
        title:"Number of passangers",
        inputType:"number",
        keyLabel:"numOfPassangers",
        minimum:1,
        maximum:5,
        required:true
    },
    {
        title:"Name of passanger 1",
        inputType:"text",
        keyLabel:"namePassanger1"
    },
    {
        title:"Name of passanger 2",
        inputType:"text",
        keyLabel:"namePassanger2"
    },
    {
        title:"Name of passanger 3",
        inputType:"text",
        keyLabel:"namePassanger3"
    },
    {
        title:"Name of passanger 4",
        inputType:"text",
        keyLabel:"namePassanger4"
    },
    {
        title:"Name of passanger 5",
        inputType:"text",
        keyLabel:"namePassanger5"
    },
]

const addTimeDays = (numOfDays)=>{
    let myCurrentDate=new Date();
    let myFutureDate=new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate()+ numOfDays)
    return myFutureDate
}



export const BookVehicle = ()=>{
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(false)

    const validate = () =>{
        // return false
        return true
    }

    const submitRequest = ()=>{
        setLoading(true)
        fetch(`${APP_CONFIG.api_path}/`,{
            "ContentType":"application/json",
            "Authentication":`Bearer token`,
            method:"POST",
            data:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>{
            setLoading(false)
            if(res.status===200){
                alert(res.msg)
            }else if(res.status === 401){
                // signout
            }
            else{
                alert("Failed")
            }
        })
        .catch(err=>{
            alert("Failed to book your request!")
            setLoading(false)
        })
    }


    if(loading === true){
        return <View
            style={{
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            }}
        >
            <Text>
            Please wait...
            </Text>
        </View>
    }



    const get_input_field = field=>{
        if(field.inputType === undefined){
            return null
        }
        if(field.inputType.toLowerCase() === "text"){
            return <TextInput 
                style={styles.formUnitInput}
                placeholder={field.title}
                value={data[field.keyLabel]}
                defaultValue = {data[field.keyLabel]}
                onChangeText={e=>{
                    setData({
                        ...data,
                        [field.keyLabel]:e
                    })
                }}
            >
            </TextInput>
        }
        else if(field.inputType.toLowerCase() === "number"){
            return <TextInput 
                style={styles.formUnitInput}
                keyboardType="number-pad"
                placeholder={field.title}
                value={data[field.keyLabel]}
                defaultValue = {data[field.keyLabel]}
                onChangeText={e=>{
                    if(e === ""){
                        setData({
                            ...data,
                            [field.keyLabel]:null
                        })
                        return ;
                    }
                    if(field.maximum&&parseInt(field.maximum) < parseInt(e)){
                        // alert("max reached")
                        setData({
                            ...data,
                            [field.keyLabel]:"5"
                        })
                        return;
                    }
                    if(field.minimum&&parseInt(field.minimum) > parseInt(e)){
                        // alert("min reached")
                        setData({
                            ...data,
                            [field.keyLabel]:"1"
                        })
                        return;
                    }
                    setData({
                        ...data,
                        [field.keyLabel]:e
                    })
                }}
            >
            </TextInput>
        }
        else if(field.inputType.toLowerCase() === "options"){
            return <Picker 
                style={styles.formUnitInput}
                selectedValue={data[field.keyLabel]}
                status={"checked"}
                onValueChange={e=>{
                    setData({
                        ...data,
                        [field.keyLabel]:e
                    })
                }}
            >

                {
                    field.options!==undefined ?
                        field.options.map( (option, opt_index)=>{
                            return <Picker.Item key={opt_index} label={option} value = {option}/> 
                        } )
                    :
                    ["Yes", "No"].map( (option, opt_index)=>{
                        return <Picker.Item key={opt_index} label={option} value = {option}/> 
                    } )

                }
            </Picker>
        }
        else if(field.inputType.toLowerCase() === "date"){
            let _selected_date = data[field.keyLabel]
            let _minimumDate = field.minimumDate?addTimeDays(field.minimumDate) : null
            let _maximumDate = field.maximumDate?addTimeDays(field.maximumDate) : null

            return <DateTime 
                style={styles.formUnitInput}
                value = {_selected_date}
                mode={field.mode || "date"}
                minimumDate = {_minimumDate}
                maximumDate = {_maximumDate}
                setDate={e=>{
                    setData({
                        ...data,
                        [field.keyLabel]:e
                    })
                }}
            >
            </DateTime>
        }
        else{
            return null
        }
        
    }

    return <ScrollView
        style={styles.box}
    >
            {
                fields.map( (field,counter)=>{
                    return <View 
                        style={styles.formUnit}
                        key={counter}
                    >
                        <Text
                            style={styles.formUnitTitle}
                        >
                            {field.title|| ""}
                            {
                                field.required?
                                    <Text
                                        style={styles.formUnitRequiredTitle}
                                    >*</Text>
                                    :null
                            }
                        </Text>
                        {get_input_field(field)}
                    </View>

                } )
            }
            <View
                style={styles.submitBtnWrapper}
            >
                <Button
                    style={styles.submitBtn}
                    color="#5a5"
                    title={"Submit"}

                    onPress={e=>{
                        if(validate()){
                            submitRequest()
                        }else{
                            alert("Please fill all requiree fields!")
                        }
                        
                    }}
                >
                </Button>
            </View>
            <View
                style={styles.submitBtnWrapper}
            >
                <Button
                    style={styles.submitBtn}
                    color="#a55"
                    title={"Clear"}
                    style={{
                        color:"#fff"
                    }}
                    onPress={e=>{
                        setData({})
                    }}
                >
                </Button>
            </View>
        </ScrollView>
}

const styles = StyleSheet.create({
    box:{
        margin:10
    },
    formUnit:{
        marginTop:5,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:"rgba(200,200,200,0.2)"
    },
    formUnitTitle:{
        fontWeight:"bold",
    },
    formUnitInput:{
        fontSize:24
    },
    formUnitRequiredTitle:{
        color:"red",
        fontSize:18,
        fontWeight:"bold",
    },
    submitBtnWrapper:{
        marginTop:5,
        marginBottom:5,
        fontSize:18
    },
    submitBtn:{
        fontSize:18,
    }
})