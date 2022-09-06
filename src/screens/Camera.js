import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, TouchableOpacity,Button } from "react-native";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';


var path = 'test3.m4a'


const onStartRecord = async (audioRecorderPlayer, setRecordSecs, setRecordTime) => {

  const path = path;
  const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
  };
  console.log('audioSet', audioSet);
  const uri = await audioRecorderPlayer.current.startRecorder(path, audioSet);
  audioRecorderPlayer.current.addRecordBackListener((e) => {

      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.current.mmssss(
          Math.floor(e.currentPosition),
      ))

  });
  console.log(`uri: ${uri}`);
};



const onStopRecord = async (audioRecorderPlayer, setRecordSecs) => {
  const result = await audioRecorderPlayer.current.stopRecorder();
  audioRecorderPlayer.current.removeRecordBackListener();
  setRecordSecs(0)
  console.log(result);
};

const onStartPlay = async (audioRecorderPlayer, setDuration, setPlayTime, setCurrentDurationSec, setCurrentPositionSec) => {
  console.log('onStartPlay');
  const path = path
  const msg = await audioRecorderPlayer.current.startPlayer(path);
  audioRecorderPlayer.current.setVolume(1.0);
  console.log(msg);
  audioRecorderPlayer.current.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
          console.log('finished');
          audioRecorderPlayer.current.stopPlayer()
      }

      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.current.mmssss(
          Math.floor(e.currentPosition),
      ));
      setDuration(audioRecorderPlayer.current.mmssss(Math.floor(e.duration)));
  });
};


 const onPausePlay = async (audioRecorderPlayer) => {
  audioRecorderPlayer.current.pausePlayer();
};

 const onStopPlay = async (audioRecorderPlayer) => {
  console.log('onStopPlay');
  audioRecorderPlayer.current.stopPlayer();
  audioRecorderPlayer.current.removePlayBackListener();
}

export default Camera = () => {
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());
  audioRecorderPlayer.current.setSubscriptionDuration(0.09);


  return (
       <View style={{justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'black'}}>
         <TouchableOpacity 
         onPress={()=>{
          onStartRecord(audioRecorderPlayer, setRecordSecs, setRecordTime);
         }}
         >
           <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>START</Text>
         </TouchableOpacity>

         <TouchableOpacity 
         onPress={()=>{
          onStopRecord(audioRecorderPlayer, setRecordSecs);
         }}
         >
           <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>Stop</Text>
         </TouchableOpacity>

         <TouchableOpacity 
         onPress={()=>{
          onStartPlay(audioRecorderPlayer, setDuration, setPlayTime, setCurrentDurationSec, setCurrentPositionSec);
         }}
         >
           <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>Play</Text>
         </TouchableOpacity>

         <TouchableOpacity 
         onPress={()=>{
          onPausePlay(audioRecorderPlayer);
         }}
         >
           <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>Pause</Text>
         </TouchableOpacity>
         
         <TouchableOpacity 
         onPress={()=>{
          onStopPlay(audioRecorderPlayer);
         }}
         >
           <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>On Stop Play</Text>
         </TouchableOpacity>


       </View>
    );
};