import React, { Component, PropTypes } from 'react';
import { View,
  Text,
  TouchableHighlight,
  Navigator,
  StyleSheet,
  Image,
  Dimensions,
  TextInput


 } from 'react-native';
import * as firebase from 'firebase';
const window= Dimensions.get('window');

export default class MyScene extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      password: '',
      account:[

      ]
    }
  }
  componentWillMount(){
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const currentaccount=snapshot.val();
      console.log(currentaccount);
      if(currentaccount != null){
        this.setState({
          account:currentaccount
        })
      }
    })
  }
  _handlepress(){
    var i;
    for(i=0;i<this.state.account.length;i++){
      if(this.state.username ==this.state.account[i].username && this.state.password==this.state.account[i].password)
      {
        this.props.navigator.push({
          id:2,
          passProps:{
            username:this.state.username
          }
        })
      }
    }
  }
  _handlepressSignup(){
    this.props.navigator.push({
      id:3,
    })
  }
  render() {
    return (

          <View style={styles.container}>
              <Image style={styles.background}
              source={require('./2.png')}
                  />
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
                  </View>
                  <TouchableHighlight style={styles.loginbutton}
                  onPress={this._handlepress.bind(this)}
                  underlayColor="white">
                  <Text >
                  Sign in
                  </Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.signup} onPress={this._handlepressSignup.bind(this)}>
                  <Text>
                  Sign up
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
    marginTop:window.height*0.1,
  }

})
