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
          id:4,
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


              <Image style={styles.background}
              source={require('./back.jpg')}
                  >
                    <Text style={styles.welcome}>Welcome</Text>
                  <View style={styles.input}>
                      <TextInput style={styles.username}
                      placeholderTextColor='#fff'
                      underlineColorAndroid='rgba(0,0,0,0)'
                      onChangeText={(username) => this.setState({username})}
                      placeholder="username"
                      />
                      <TextInput style={styles.password}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholderTextColor='#fff'
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({password})}
                      placeholder="password"
                      />
                  </View>
                  <TouchableHighlight style={styles.loginbutton}
                  onPress={this._handlepress.bind(this)}
                  underlayColor="white">
                  <Text style={styles.textlogin}>
                  Login
                  </Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.signup} onPress={this._handlepressSignup.bind(this)}>
                  <Text style={styles.textlogin}>
                  Register
                  </Text>
                  </TouchableHighlight>
        </Image>


    )
  }
}

const styles= StyleSheet.create({
  container:{
    flex:1,

  },
  welcome:{
    fontSize:40,
    color:"#fff",
    top:-window.height*0.1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  background:{
    flex:1,
    resizeMode: 'cover',
    width:window.width*1,
    height:window.height*1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  input:{
    top:-window.height*0.05,
  },
  username:{
    width: window.width*0.8,
    borderWidth: 1,
    borderColor:"#fff",
    color:"#fff",
    borderRadius:window.height*0.05,
    textAlign: 'center',
    height: window.height*0.1,
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
  loginbutton:{
    width: window.width*0.8,
    height: window.height*0.1,
    backgroundColor:'#33ff99',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
  },
  textlogin:{
    color:'#fff',
  },
  signup:{
    marginTop:window.height*0.04,
  }

})
