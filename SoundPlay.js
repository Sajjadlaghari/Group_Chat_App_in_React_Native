// Import React native Components
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    PermissionsAndroid,
  } from 'react-native';
  import React from 'react';
  import Sound from 'react-native-sound';
    
  sound = new Sound('mp3.mp3');
  
  const play = playSound = () => {
    sound.play()
  }
  
  
  const stop = playSound = () => {
    sound.play()
  }
  
  
  const SoundPlay = () => {
    return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1,flexDirection:'row'}}>
        <TouchableOpacity style={{margin:10,backgroundColor:'green',padding:10,width:100,borderRadius:20}} 
        onPress={()=>{
          play();
        }}>
          <View>
            <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>Start</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{margin:10,backgroundColor:'red',padding:10,width:100,borderRadius:20}} 
          onPress={()=>{
          stop();
            
          }}
          >
          <View>
            <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>Stop</Text>
          </View>
        </TouchableOpacity>
      </View>
  
    );
  };
   
  export default SoundPlay;
  