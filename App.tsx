import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/Store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.screen}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
