
import React, { useEffect } from "react";
import RootNavigation from "./src/navigation/RootNavigation";
import { View, Text, StyleSheet } from 'react-native';
import {Provider } from 'react-redux';
import {RootReducer } from './src/redux/RootReducer';

import { LogBox } from 'react-native';
 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();

  const store=RootReducer();


function App(props) {


    return (
        <Provider store={store}>
            <RootNavigation />
        </Provider>
    );
}


export default App;