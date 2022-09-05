import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity, ImageBackground,Platform,PermissionsAndroid } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux';
import { logout_success } from '../redux/actions/logoutAction';
import { get_message } from '../redux/actions/getMessageAction'
import { send_message } from '../redux/actions/sendMessageAction'
import uuid from 'react-native-uuid';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob';



const { width, height } = Dimensions.get('window');



const checkPermission = async (fileUrl) => {

    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
        downloadFile(fileUrl);
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message:
                        'Application needs access to your storage to download File',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Start downloading
                downloadFile(fileUrl);
                console.log('Storage Permission Granted.');
            } else {
                // If permission denied then show alert
                Alert.alert('Error', 'Storage Permission Not Granted');
            }
        } catch (err) {
            // To handle permission related exception
            console.log("++++" + err);
        }
    }
};

const downloadFile = (fileUrl) => {

    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            path:
                RootDir +
                '/file_' +
                Math.floor(date.getTime() + date.getSeconds() / 2) +
                file_ext,
            description: 'downloading file...',
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,
        },
    };
    config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
            // Alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            alert('File Downloaded Successfully.');
        });
};

const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
        /[^.]+$/.exec(fileUrl) : undefined;
};


const mapStateToProps = (state) => {
    return {
        user: state.user,
        message: state.message
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout_success())
        },
        getMessage: () => {
            dispatch(get_message())
        },
        send: (data, messageData) => {

            dispatch(send_message(data, messageData))
        }
    }
}

const Message = ({ message = null, isSender = true, userName = null, image_path = null, file_path = null }) => {
    return (
        <View style={{ width: '100%' }}>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: isSender ? 'flex-start' : 'flex-end' }}>
                <View style={isSender ? styles.messageSender : styles.messageReciever}>
                    {
                        isSender && <Text style={{ paddingTop: 0, color: 'purple' }}>{userName}</Text>

                    }
                    <View style={{backgroundColor:'white',width:'100%',padding:5,borderRadius:10}}>
                    {file_path && <Text style={{color:'black'}}>{file_path}</Text>}
                    
                    {file_path && <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            checkPermission('http://192.168.18.20:8000/'+file_path)
                        }}>
                        <Text style={{color:'purple'}}>
                            Download File
                        </Text>
                    </TouchableOpacity>}
                        </View>

                        <View style={{width:'100%',borderRadius:10,backgroundColor:'white',marginTop:4}}>
                            
                    {image_path && <Image style={{ width: 200, height: 200, borderWidth: 2, borderColor: 'black' }} source={{ uri: 'http://192.168.18.20:8000/' + image_path }} />}
                    <Text style={[isSender ? styles.messageRecieverText : styles.messageSenderText,{paddingLeft:8}]}>
                        {message}
                    </Text>
                        </View>
                
                </View>
            </View>

        </View>
    )
}


function HomeScreen(props) {

    const [message, setMessage] = useState();
    const [image, setImage] = useState();
    const flatlistRef = useRef();
    const [singleFile, setSingleFile] = useState('');

    // This is DocumentPicker with this you can pick any file and also image
    const selectOneFile = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],

        });
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        // setSingleFile([{ name: response[0].name, uri: response[0].uri, id: uuid.v4() }]);
        setSingleFile(res[0]);
        // alert(singleFile);
        alert(JSON.stringify(singleFile, null, 2))
    }


    useEffect(() => {
        props.getMessage();

   
        if (props.message) {
        

        }
        return () => {
        }
    }, []);


    // This Part is for Select Image From Gallery
    const openGallery = (setImage) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image.path);
            // console.log(image);
        });
    }


    return (

        <View style={{ flex: 1, width: '100%' }}>

            <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png' }}>

                <View style={styles.Topbar}>
                    <View >
                        <View style={{ flexDiretion: 'row' }}>
                            <View style={{ justifyContent: 'center', padding: 10 }}>
                                <TouchableOpacity style={styles.logout}

                                    onPress={() => {
                                        props.logout();
                                    }}
                                >
                                    <Text style={styles.logoutText} >Logout</Text>
                                </TouchableOpacity>
                            </View>




                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.userName}>Sajjad Ali</Text>

                        <Image style={styles.userImage} source={{ uri: 'https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000' }} />

                    </View>


                </View>
                <View style={{ flex: 1, width: '100%' }}>


                    <FlatList
                        contentContainerStyle={{ width, paddingVertical: 10, paddingHorizontal: 7 }}
                        data={props?.message?.message}
                        renderItem={({ item, index }) => {
                            return (
                                <Message
                                    key={uuid.v4()}
                                    message={item.message}
                                    // userName={item.user.name}
                                    isSender={item.user_id != props?.user?.user?.Data?.id}
                                    image_path={item.image_path}
                                    file_path={item.file_path}
                                />
                            )
                        }}
                    // ref={flatlistRef}
                    />
                </View>



                <View style={styles.bottom}>
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', }}>
                        <TextInput
                            multiline
                            onChangeText={(text) => setMessage(text)}
                            style={styles.input}
                            placeholder="Message....!"

                        />
                        <TouchableOpacity
                            onPress={() => {
                                openGallery(setImage);
                            }}
                        >
                            <Icon name="camera" size={30} color={'grey'} style={{ paddingBottom: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                selectOneFile();
                            }}
                        >
                            <IconMaterial name="attach-file" size={30} color={'grey'} style={{ paddingBottom: 10 }} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', width: '20%' }}>

                        <TouchableOpacity style={[styles.send, { backgroundColor: 'green', padding: 13 }]}
                            onPress={() => {
                                // console.log(data_)


                                const data_ = new FormData()

                                data_.append('user_id', props?.user?.user?.Data?.id),
                                    data_.append('message', message),
                                    image ?
                                        data_.append('image_path', { uri: image, name: `${uuid.v4()}.jpg`, type: 'image/jpg' })
                                        :
                                        data_.append('image_path', null)
                                singleFile ?
                                    data_.append('file_path', singleFile)
                                    :
                                    data_.append('file_path', null)

                                //   alert(JSON.stringify(singleFile,null,2))

                                const messageData = {
                                    message: message,
                                    user_id: props?.user?.user?.Data?.id,
                                    user_name: props?.user?.user?.Data?.name,
                                    image_path: image,
                                    file_path: singleFile
                                }

                                props.send(data_, messageData);

                                setMessage('');


                                // flatlistRef.current.scrollToIndex({
                                //     animated: true,
                                //     index: 1,
                                //     viewPosition: 0
                                // })
                            }}
                        >
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>
                                Send
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    Topbar:
    {
        height: 60,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#2B5F54',
        justifyContent: 'space-between',
    },
    bottom:
    {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 1,
        borderWidth: 1,

    },
    input:
    {
        maxWidth: '99%',
        maxHeight: 200,
        border: 'none',
        backgroundColor: '#fff',
        flex: 1


    },
    messageSender:
    {
        paddingVertical: 3,
        paddingHorizontal: 5,
        maxWidth: '61%',
        paddingLeft:6,
        marginVertical: 4,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    messageReciever:
    {
        paddingLeft:6,
        paddingVertical: 14,
        paddingHorizontal: 5,
        maxWidth: '80%',
        marginVertical: 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    messageRecieverText:
    {
        color: '#000'
    },
    messageSenderText:
    {
        color: '#000'
    },
    send:
    {

    },
    TextInput:
    {

    },
    userImage:
    {
        height: 58,
        width: 58,
        marginTop: 3,
        marginLeft: 5,
        borderRadius: 30,
        justifyContent: 'center'

    },
    logoutText:
    {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    userName:
    {
        fontSize: 17,
        marginLeft: 10,
        color: '#fff',
        fontWeight: 'bold',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);