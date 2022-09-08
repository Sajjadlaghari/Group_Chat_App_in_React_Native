
import React, { useEffect } from "react";
import { StatusBar, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/splashScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import {connect} from 'react-redux';
import Voice from '../screens/Voice'
import VoiceMessageAttachment from '../screens/AudioRecord'




const Screen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: 'red' }}>Itmeenan</Text>
        </View>
    )
}

const Stack = createStackNavigator();

const AuthRoute = () => {

    return (
        <>
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
                 <Stack.Screen
                name="Voice"
                component={Voice}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{
                    headerShown: false,
                }}
            />
        </>
    );
}



const HomeRoute = () => {

    return (
        <>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Setting"
                component={Screen}
                options={{
                    headerShown: false,
                }}
            />
        </>
    );
}


const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}


function RootNavigation(props) {

    
    const isUser = props?.user?.user==null? false:true;
    //  alert(JSON.stringify(isUser,null,2));

    return (
        <NavigationContainer  >

            <>
                <Stack.Navigator
                    initialRouteName="Splash"
                    screenOptions={{
                        headerTintColor: "#fff",
                        headerStyle: {
                            backgroundColor: "tomato",
                        },
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        // animationEnabled: false
                    }}
                >
                    {

                        isUser ? HomeRoute() : AuthRoute()
                    }
                </Stack.Navigator>
            </>
        </NavigationContainer>
    );
}


export default connect(mapStateToProps,null)(RootNavigation);