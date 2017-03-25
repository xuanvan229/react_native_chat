/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';
import * as firebase from 'firebase';
import MyScene from './src/MyScene';
import LOGIN from './src/login';
import Signup from './src/signup';
import LISTUSER from './src/UserList';
import Profile from './src/Profile';
import EditProfile from './src/EditProfile';
var config = {
    apiKey: "AIzaSyABeJLAAf3o2HIzbL78A7ooamppx-_D-Ys",
    authDomain: "chat-react-native.firebaseapp.com",
    databaseURL: "https://chat-react-native.firebaseio.com",
    storageBucket: "chat-react-native.appspot.com",
    messagingSenderId: "898656107377"
  };
  firebase.initializeApp(config);
export default class chatreact extends Component {
  constructor(props){
    super(props);
  }
  renderScene(route, navigator) {
   if(route.id == 1) {
     return <MyScene navigator={navigator} />
   }
   else if(route.id ==2){
     return <LOGIN navigator={navigator} {...route.passProps}/>
   }
   else if(route.id ==3){
     return <Signup navigator={navigator} />
   }
   else if(route.id ==4){
     return <LISTUSER navigator={navigator} {...route.passProps} />
   }
   else if(route.id ==5){
     return <Profile navigator={navigator} {...route.passProps} />
   }
   else if(route.id==6){
     return <EditProfile navigator={navigator} {...route.passProps}/>
   }
  }
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ id: 1}}
        renderScene={ this.renderScene } />

    )
  }
}

AppRegistry.registerComponent('chatreact', () => chatreact);
