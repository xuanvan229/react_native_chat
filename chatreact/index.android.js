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
import MyScene from './MyScene';
import LOGIN from './login';

export default class chatreact extends Component {
  constructor(props){
    super(props);
  }
  renderScene(route, navigator) {
   if(route.id == 1) {
     return <MyScene navigator={navigator} />
   }
   else if(route.id ==2){
     return <LOGIN navigator={navigator} />
   }
  }
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ id: 1 }}
        renderScene={ this.renderScene } />

    )
  }
}

AppRegistry.registerComponent('chatreact', () => chatreact);
