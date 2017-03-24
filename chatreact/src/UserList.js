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
      idmessage:[

      ],
      getid:'',
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
    firebase.database().ref('images/').on('value',(snapshot)=>{
      const imglist=snapshot.val();
      if(imglist != null){
        this.setState({
          img:imglist
        })
      }
    })
    firebase.database().ref('roommessage/').on('value',(snapshot)=>{
      const messid=snapshot.val();
      console.log(messid);
      if(messid!=null){
        this.setState({
          idmessage:messid
        })
      }
    })



  }
  _handlepress(targetUser){
    var i;
    console.log(this.state.idmessage[0].username1);
    var check=false;
    var id;
      console.log(targetUser);
      console.log(this.state.idmessage.length);
      for(i=0;i<this.state.idmessage.length;i++){
        if((this.props.username == this.state.idmessage[i].username1 || this.props.username == this.state.idmessage[i].username2 )&&(targetUser ==this.state.idmessage[i].username1 || targetUser==this.state.idmessage[i].username2) )
        {
          id=i
            check=true;
            console.log(check);

        }
      }
      if(check==false){
        const nextroom={
          id:this.state.idmessage.length,
          username1:this.props.username,
          username2:targetUser,
        }
        firebase.database().ref('roommessage/'+nextroom.id).set(nextroom);
        id=nextroom.id
      }
    this.props.navigator.push({
      id:2,
      passProps:{
        username:this.props.username,
        targetUser,
        id
      }
    })
  }
  _pressuser(){
    console.log("hello");
  }
  render(){
    const USER=this.state.alluser.map((user,i)=>{
      return(
        <TouchableHighlight key={i} onPress={this._handlepress.bind(this,user.username)}>
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
