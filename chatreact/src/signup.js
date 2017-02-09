/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
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
  constructor(props){
    super(props);
    this.state={
      name:'',
      pass1:'',
      pass2:'',
      allaccount:[

      ]
    }


  }
  componentWillMount(){
      firebase.database().ref('username/').on('value',(snapshot)=>{
      const account=snapshot.val();
      if(account != null){
        this.setState({
          allaccount:account
        })
      }
    })
  }
  _handlepress(){
    var x= Math.floor((Math.random() * 10) + 1);
    var i;
    var check=true;
    for(i=0; i<this.state.allaccount.length; i++){
        if(this.state.name == this.state.allaccount[i].username && this.state.pass1==this.state.pass2)
          check=false;
    }
    if(check==true){
      const nextMessage={
      id: this.state.allaccount.length,
      password:this.state.pass1,
      imgsrc:x,
      username:this.state.name
    }
    console.log(nextMessage.id);
    console.log(this.state.allaccount);
    firebase.database().ref('username/'+nextMessage.id).set(nextMessage);
    this.props.navigator.pop();
    }
  }
  _handlepressSignup(){
    this.props.navigator.pop();
  }
  render(){
    return(
      <View style={styles.container}>
          <Image style={styles.background}
          source={require('./2.png')} />
            <View style={styles.input}>
              <TextInput style={styles.username}
              underlineColorAndroid='#ff8b8b'
              placeholderTextColor='#ff8b8b'
              onChangeText={(name) => this.setState({name})}
              placeholder="username"
              />
              <TextInput style={styles.password}
              underlineColorAndroid='#ff8b8b'
              placeholderTextColor='#ff8b8b'
              secureTextEntry={true}
              onChangeText={(pass1) => this.setState({pass1})}
              placeholder="password"
              />
              <TextInput style={styles.password}
              underlineColorAndroid='#ff8b8b'
              placeholderTextColor='#ff8b8b'
              secureTextEntry={true}
              onChangeText={(pass2) => this.setState({pass2})}
              placeholder="password"
              />
          </View>
          <TouchableHighlight style={styles.loginbutton}
          onPress={this._handlepress.bind(this)}
          underlayColor="white">
          <Text >
          Sign up
          </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.signup} onPress={this._handlepressSignup.bind(this)}>
          <Text>
          Sign in
          </Text>
          </TouchableHighlight>
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
  },
  signup:{
    marginTop: window.height*0.01,
  }

})
