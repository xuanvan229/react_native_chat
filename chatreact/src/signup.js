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
  Image,
  Navigator,
  Dimensions,
  TextInput,
  View
} from 'react-native';
import * as firebase from 'firebase';
const window= Dimensions.get('window');

export default class Signup extends Component{
  render(){
    return(
      <View style={styles.container}>
          <Image style={styles.background}
          source={require('./2.png')} />
            <View style={styles.input}>
              <TextInput style={styles.username}
              underlineColorAndroid='#ff8b8b'
              placeholderTextColor='#ff8b8b'
              onChangeText={(username) => this.setState({username})}
              placeholder="username"
              />
              <TextInput style={styles.password}
              underlineColorAndroid='#ff8b8b'
              placeholderTextColor='#ff8b8b'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              placeholder="password"
              />
              <TextInput style={styles.password}
              underlineColorAndroid='#ff8b8b'
              placeholderTextColor='#ff8b8b'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              placeholder="password"
              />
          </View>
      </View>
    )
  }
}
const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  background:{
    width:window.width*0.3,
    height:window.width*0.3,
    top:-window.height*0.15,
  },
  input:{
    top:-window.height*0.05,
  },
  username:{
    width: window.width*0.8,
    height: window.height*0.1,
  },
  password:{
    width: window.width*0.8,
    height: window.height*0.1,
    marginTop: window.height*0.01,
  },
  loginbutton:{
    width: window.width*0.8,
    height: window.height*0.1,
    backgroundColor:'#e88565',
    justifyContent:'center',
    alignItems:'center',
  }

})
