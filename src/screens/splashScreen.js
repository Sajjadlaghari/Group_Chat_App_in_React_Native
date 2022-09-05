import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function SplashScreen(props) {

    useEffect(() =>{
    
        setTimeout(()=>{props.navigation.navigate('LoginScreen')},3000)

    },[])
  return (
    <View style={{justifyContent:'center',backgroundColor:'#4091D0',flex:1,alignItems:'center'}}>
      <Text style={{fontSize:30,fontWeight:'bold',color:'#fff',fontFamily:'sans-serif'}}>GROUP CHAT</Text>
    </View>
  )
}

const styles = StyleSheet.create({})