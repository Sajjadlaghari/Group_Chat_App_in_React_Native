import React from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const onStartRecord = async () => {
 await audioRecorderPlayer.startRecorder();
 audioRecorderPlayer.addRecordBackListener(e => {
   console.log('Recording . . . ', e.current_position);
    return;
   });
 };

const onStopRecord = async () => {
 const audio = await audioRecorderPlayer.stopRecorder();
 audioRecorderPlayer.removeRecordBackListener();
 };


export const Recorder = () => {
 return (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'space-between'}}>
   <TouchableOpacity onPress={onStartRecord}>
     <Text>Start</Text>
   </TouchableOpacity>

   <TouchableOpacity onPress={onStopRecord}>
     <Text>Stop</Text>
   </TouchableOpacity>
  </View>
 );
};
