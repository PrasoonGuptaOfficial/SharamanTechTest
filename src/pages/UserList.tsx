import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';

function UserList({navigation}: {navigation: any}): JSX.Element {
  const userInformationList = useSelector((state: RootState) => state);
  const {deviceid, photo, lat, log} = userInformationList;
  const onBackHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.headingText}>User Information</Text>
      <View style={styles.dividerLine} />
      <View style={styles.dataPartition}>
        <View style={styles.imageView}>
          <Image source={{uri: photo}} style={styles.imageDisplay} />
        </View>
        <View style={styles.detailView}>
          <Text style={styles.listDetailsText}>Device ID: {deviceid}</Text>
          <Text style={styles.listDetailsText}>Lat: {lat}</Text>
          <Text style={styles.listDetailsText}>Log: {log}</Text>
        </View>
      </View>
      <Pressable style={styles.buttonView} onPress={onBackHandler}>
        <Text style={styles.buttonText}>BACK</Text>
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
  dataPartition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '15%',
  },
  imageView: {
    width: '30%',
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  detailView: {
    width: '70%',
    borderWidth: 0.5,
    borderColor: '#000000',
    alignItems: 'flex-start',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  imageDisplay: {
    width: '100%',
    height: '100%',
  },
  listDetailsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000000',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  buttonView: {
    marginTop: 10,
    width: '20%',
    height: '3%',
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

export default UserList;
