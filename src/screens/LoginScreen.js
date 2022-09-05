import { StyleSheet, Text, TouchableOpacity, View,Dimensions,ScrollView } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { user_login } from '../redux/actions/loginAction'


const { width, height } = Dimensions.get('window');

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch(user_login(data))
        }
    }
}


function LoginScreen(props) {
    
    useEffect(()=>{
        if(props.user.errorMsg)
        {
            // alert(JSON.stringify(props.user.errorMsg.error,null,2))
        }
        
    },[props.user.errorMsg])


    
    const [email, setUserEmail] = useState();
    const [password, setUserPassword] = useState();


    return (
        <View style={styles.container}>
              <ScrollView
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width, height }}
            >
             <View style={styles.login}>
                    <Text style={styles.loginText}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Email'
                        onChangeText={(text) => setUserEmail(text)}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}

                        onChangeText={(pass) => setUserPassword(pass)}
                        placeholder='Enter Password'
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'green', borderRadius: 15, width: '85%', padding: 10 }}
                    onPress={() => {
                        props.login({ email,password });


                    }}
                >
                    <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                        Login
                    </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 6 }}
                        onPress={() => {
                            props.navigation.navigate('SignupScreen');
                        }}
                    >
                        <Text style={{ color: 'blue', fontWeight: 'bold', marginTop: 30, marginLeft: 10 }}>Sign Up</Text>
                    </TouchableOpacity>       
                    <Text style={{ fontSize: 16, marginTop: 30, fontWeight: 'bold', color: '#000', fontFamily: 'sans-serif' }}>Don't have Account
                    </Text>
                 
                </View>

                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 6 }}
                        onPress={() => {
                            props.navigation.navigate('Camera');
                        }}
                    >
                        <Text style={{ color: 'purple', fontWeight: 'bold', marginTop: 30, marginLeft: 10 }}>VOICE RECORDER</Text>
                    </TouchableOpacity>       
                   
                 
                </View>
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
    },
    loginText:
    {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'sans-serif'
    }
    ,
    login:
    {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    input:
    {
        width: '85%',
        borderWidth: 1,
        textAlign: 'center',
        marginTop: 9,
        borderRadius: 15,
        color:'black'

    }

})
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)