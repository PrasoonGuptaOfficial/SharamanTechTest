import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {saveInformation} from '../redux/UserInformationSlice';

const ImagePickerOptions: ImagePicker.CameraOptions = {
  mediaType: 'photo',
  includeExtra: true,
  includeBase64: false,
  quality: 1,
  saveToPhotos: true,
};

function UserInformation({navigation}: {navigation: any}): JSX.Element {
  const dispatch = useDispatch();
  const [isImageCapturedFlag, setIsImageCapturedFlag] = useState(false);
  const [imageDisplayUri, setImageDisplayUri] = useState('');
  const [coordsDisplayLatitude, setCoordsDisplayLatitude] = useState('');
  const [coordsDisplayLongitude, setCoordsDisplayLongitude] = useState('');
  const [coordsError, setCoordsError] = useState('');
  Geolocation.getCurrentPosition(
    pos => {
      const {latitude, longitude} = pos.coords;
      setCoordsDisplayLatitude(latitude.toFixed(3).toString());
      setCoordsDisplayLongitude(longitude.toFixed(3).toString());
    },
    error => setCoordsError(error.message),
    {enableHighAccuracy: true},
  );
  const onImagePickerHandler = useCallback(() => {
    ImagePicker.launchCamera(ImagePickerOptions, response => {
      if (response.errorCode) {
        setIsImageCapturedFlag(false);
        setImageDisplayUri('');
      } else {
        response.assets?.map(imageUri => {
          setImageDisplayUri(imageUri.uri);
          setIsImageCapturedFlag(true);
        });
      }
    });
  }, []);
  const onSubmitButtonHandler = () => {
    const submitObject = {
      deviceid: DeviceInfo.getDeviceId(),
      photo: imageDisplayUri,
      lat: coordsDisplayLatitude,
      log: coordsDisplayLongitude,
    };
    dispatch(saveInformation(submitObject));
    navigation.navigate('UserList');
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.headingText}>User Information</Text>
      <View style={styles.dividerLine} />
      <TouchableOpacity
        style={styles.imagePickerBox}
        onPress={onImagePickerHandler}>
        {!isImageCapturedFlag && (
          <Text style={styles.imageUnavailableText}>Photo</Text>
        )}
        {isImageCapturedFlag && (
          <Image source={{uri: imageDisplayUri}} style={styles.imageDisplay} />
        )}
      </TouchableOpacity>
      <View style={styles.dataView}>
        <Text style={styles.titleText}>Device ID</Text>
        <Text style={styles.titleText}>{DeviceInfo.getDeviceId()}</Text>
      </View>
      {coordsError ? (
        <Text style={styles.errorLocation}>{coordsError}</Text>
      ) : (
        <>
          <View style={styles.dataView}>
            <Text style={styles.titleText}>Lat</Text>
            <Text style={styles.titleText}>{coordsDisplayLatitude}</Text>
          </View>
          <View style={styles.dataView}>
            <Text style={styles.titleText}>Long</Text>
            <Text style={styles.titleText}>{coordsDisplayLongitude}</Text>
          </View>
        </>
      )}
      <Pressable
        style={styles.buttonView}
        onPress={onSubmitButtonHandler}
        disabled={!isImageCapturedFlag}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  headingText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  dividerLine: {
    marginTop: 7,
    borderWidth: 1.5,
    borderColor: '#000000',
    height: 0.5,
    width: '100%',
  },
  imagePickerBox: {
    marginTop: 7,
    width: '30%',
    height: 100,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUnavailableText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000000',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  imageDisplay: {
    width: '100%',
    height: '100%',
  },
  dataView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  titleText: {
    marginHorizontal: 60,
    fontSize: 14,
    textAlign: 'center',
    color: '#000000',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  errorLocation: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'red',
  },
  buttonView: {
    marginTop: 10,
    width: '40%',
    height: '6%',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#000000',
  },
});

export default UserInformation;
