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
      avatarsrc:'',
      allaccount:[

      ],
      listimg:[

      ],
    }


  }
  componentWillMount(){
      firebase.database().ref('username/').on('value',(snapshot)=>{
      const account=snapshot.val();
      console.log(account);
      if(account != null){
        this.setState({
          allaccount:account
        })
      }
    });
    firebase.database().ref('images/').on('value',(snap)=>{
      const listavatar=snap.val();
      console.log(listavatar);
      if(listavatar != null){
        this.setState({
          listimg:listavatar
        })
      }
    })
  }
  _handlepress(){
    var x= Math.floor((Math.random() * 9) + 1);
    console.log(x);
    var i;
    var check=true;
    for(i=0; i<this.state.allaccount.length; i++){
        if(this.state.name == this.state.allaccount[i].username && this.state.pass1==this.state.pass2)
          check=false;
    }
    var j;
    var url
    for(j=0;j<this.state.listimg.length;j++){
        if(x==this.state.listimg[j].id){
          url=this.state.listimg[j].url
        }
    }
    if(check==true){
      const nextMessage={
      id: this.state.allaccount.length,
      password:this.state.pass1,
      imgsrc:url,
      username:this.state.name
    }
    firebase.database().ref('username/'+nextMessage.id).set(nextMessage);
    this.props.navigator.pop();
    }
  }
  _handlepressSignup(){
    this.props.navigator.pop();
  }
  render(){
    return(
          <Image style={styles.background}
          source={require('./back.jpg')} >

            <View style={styles.input}>
              <TextInput style={styles.username}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholderTextColor='#fff'
              onChangeText={(name) => this.setState({name})}
              placeholder="username"
              />
              <TextInput style={styles.password}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholderTextColor='#fff'
              secureTextEntry={true}
              onChangeText={(pass1) => this.setState({pass1})}
              placeholder="password"
              />
              <TextInput style={styles.password}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholderTextColor='#fff'
              secureTextEntry={true}
              onChangeText={(pass2) => this.setState({pass2})}
              placeholder="password"
              />
          </View>
          <TouchableHighlight style={styles.loginbutton}
          onPress={this._handlepress.bind(this)}
          underlayColor="white">
          <Text style={styles.textlogin}>
          Sign up
          </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.signup} onPress={this._handlepressSignup.bind(this)}>
          <Text style={styles.textlogin}>
          Sign in
          </Text>
          </TouchableHighlight>
          </Image>

    )
  }
}
const styles= StyleSheet.create({
  container:{
    backgroundColor:'#fff'
  },
  background:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:window.width*1,
    height:window.width*1,
  },
  input:{
    top:-window.height*0.05,
  },
  username:{
    width: window.width*0.8,
    borderWidth: 1,
    borderColor:"#fff",
    borderRadius:window.height*0.05,
    color:"#fff",
    textAlign: 'center',
    height: window.height*0.1,
    marginTop: window.height*0.04,
  },
  password:{
    width: window.width*0.8,
    borderWidth: 1,
    borderColor:"#fff",
    borderRadius:window.height*0.05,
    color:"#fff",
    textAlign: 'center',
    height: window.height*0.1,
    marginTop: window.height*0.04,
  },
  textlogin:{
    color:'#fff',
  },
  loginbutton:{
    width: window.width*0.8,
    height: window.height*0.1,
    backgroundColor:'#33ff99',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
  },
  signup:{
    marginTop: window.height*0.04,
  }

})
