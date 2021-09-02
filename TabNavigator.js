import React from "react";
import {View, Text, Image} from 'react-native';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import Donate from "../Screens/Donate";
import Request from "../Screens/Request";

export const Tab = createBottomTabNavigator({
    Donate:{
        screen: Donate, 
        navigationOptions: {
            tabBarIcon: <Image/>,
            tabBarLabel: "Donate Books"
        }},
    Request:{
        screen:Request,
        navigationOptions: {
            tabBarIcon: <Image/>,
            tabBarLabel: "Request Books"
        }
    }
    
})