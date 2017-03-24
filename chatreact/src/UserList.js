import React, { Component, PropTypes } from 'react';
import { View,
   Text,
   ScrollView,
   StyleSheet,
   TextInput,
   Image,
   Dimensions,
   TouchableHighlight,
   Navigator
 } from 'react-native';
import { Icon } from 'react-native-elements'

import * as firebase from 'firebase';

const window= Dimensions.get('window');

export default class LISTUSER extends Component{
  constructor(props){
    super(props);
    this.state={
      alluser:[
      ],
      username:'',
      img:[

      ],
      url:'http://i.imgur.com/NJgWnCd.jpg',
    }
  }
  componentDidMount(){
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const userlist=snapshot.val();
      console.log(userlist);
      if(userlist != null){
        this.setState({
          alluser:userlist
        })
      }
    })
    firebase.database().ref('images/0').on('value',(snapshot)=>{
      const imglist=snapshot.val();
      if(imglist != null){
        this.setState({
          img:imglist
        })
      }
    })


  }
  _handlepress(targetUser){
    this.props.navigator.push({
      id:2,
      passProps:{
        username:this.props.username,
        targetUser
      }
    })
  }
  _pressuser(){
    console.log("hello");
  }
  render(){
    const USER=this.state.alluser.map((user,i)=>{
      return(
        <TouchableHighlight key={i} onPress={this._handlepress.bind(this,user)}>
        <View style={styles.viewuser}>
        <Image source={{uri:user.imgsrc}}
        style={styles.avatar}
        />
        <Text style={styles.username}>{user.fullname}</Text>
        </View>
        </TouchableHighlight>
      )
    })
    return(
      <Image style={styles.background}
      source={require('./back.jpg')} >
      <ScrollView style={styles.listuser}>
      {USER}
      </ScrollView>
      <View style={styles.navbar}>
      <TouchableHighlight   onPress={this._pressuser.bind(this)} >
      <View style={styles.home}>
      <Icon
        name='home'
        color='#fff'
        size={50} />
      </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={this._pressuser.bind(this)}>
      <View style={styles.home}>
      <Icon
        name='people'
        color='#fff'
        size={50} />
      </View>
      </TouchableHighlight>
      </View>
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
    flexDirection:'column',
    width:window.width*1,
    height:window.width*1,
  },
  navbar:{
    flexDirection:'row'
  },
  listuser:{
    flexDirection:'column',
    width:window.width*1,
    height:window.height*0.9,
  },
  home:{
    width:window.width*0.5,
    backgroundColor:'pink',
  },
  viewuser:{
    width:window.width*1,
    height:window.height*0.1,
    flexDirection:'row',
    alignItems:'center',

  },
  avatar:{
    width:window.height*0.1,
    height:window.height*0.1,
    borderRadius:window.height*0.05,
  },
  username:{
    color:'#fff',
  }
})
