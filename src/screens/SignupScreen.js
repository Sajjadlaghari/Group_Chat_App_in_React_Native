import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Directions, ScrollView, TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { signup_user} from '../redux/actions/signupAction';

const { width, height } = Dimensions.get('window');



const mapStateToProps=(state)=>{
    return {
        user:state.user
    }
}


const mapDispatchToProps=(dispatch)=>{
    return {
        signup:(data)=>dispatch(signup_user(data))
    }
}


function SignupScreen(props) {

    const [name,setUserName]=useState();
    const [email,setUserEmail]=useState();
    const [password,setUserPassword]=useState();


    useEffect(()=>{
        if(props.user.errorMsg)
        {
            alert(JSON.stringify(props?.user?.errorMsg?.email[0],null,2))
        }
        
    },[props.user.errorMsg])
    return (
        <View style={{width:'100%',flex:1,}}>
        <ScrollView
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width, height }}
        >
            <View style={styles.SignView}
            
           
            >
                <Text style={styles.SignText}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Name'
                    onChangeText={(name)=> setUserName(name)}
                    />
                <TextInput
                    style={styles.input}
                    
                    placeholder='Enter email'
                    onChangeText={(email)=> setUserEmail(email)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter password'
                    secureTextEntry={true}
                    onChangeText={(pass)=> setUserPassword(pass)}
                />
                <TouchableOpacity style={styles.Signupbtn}
                  onPress={()=>{
                    props.signup({name,email ,password})
                  }}
                >
                    <Text style={styles.signuptext}>Sign Up</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.Loginbtn}
                
                onPress={()=>{
                    props.navigation.navigate('LoginScreen');
                 }}
                >
                    <Text style={{color:'black',fontWeight:'bold'}}>Already have accounnt ? <Text style={{color:'blue'}}>Login</Text></Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    SignView:
    {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
    },
    SignText:
    {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:10
    },
    Loginbtn:
    {
       marginTop:20
    },
    input:
    {
         borderWidth:1,
         width:'100%',
         marginTop:10,
         borderRadius:15,
         textAlign:'center'
    },
    Signupbtn:
    {
        padding:14,
        width:'100%',
        borderRadius:15,
        marginTop:15,
        backgroundColor:'green'
    },
    signuptext:
    {
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16,
        color:'white'
    
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(SignupScreen)