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

const window= Dimensions.get('window');

export default class MyScene extends Component {
  constructor(props){
    super(props);
    this.state={
      username: '',
      password: '',
    }
  }
  _handlepress(){
    this.props.navigator.push({
      id:2
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
                      placeholder="hello"
                      />
                      <TextInput style={styles.username}
                      underlineColorAndroid='#ff8b8b'
                      placeholderTextColor='#ff8b8b'
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({password})}
                      placeholder="hello"
                      />
                  </View>
                  <TouchableHighlight>
                  <Text>
                  Send
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

})
