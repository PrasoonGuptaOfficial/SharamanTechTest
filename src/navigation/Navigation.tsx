import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UserInformation from '../pages/UserInformation';
import UserList from '../pages/UserList';

const stack = createStackNavigator();

function Navigation(): JSX.Element {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="UserInfo" component={UserInformation} />
      <stack.Screen name="UserList" component={UserList} />
    </stack.Navigator>
  );
}

export default Navigation;
