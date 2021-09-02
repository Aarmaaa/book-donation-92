import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createSwitchNavigator,createAppConatiner} from 'react-navigation'

import Login from './Screens/Login';
import { Tab } from './Navigation/TabNavigator';
import Donate from './Screens/Donate';

export default function App() {
  return (
    /* <AppConatiner/>
  ); */
  <Donate/>
  )
}

const switchNavigator = createSwitchNavigator({
  Login: {screen:Login},
  Tab: {screen:Tab}
})
const AppConatiner = createAppConatiner(switchNavigator)
