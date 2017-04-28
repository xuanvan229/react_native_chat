import React, { Component, PropTypes } from 'react';
import { View,
  Text,
  TouchableHighlight,
  Navigator,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  InteractionManager


 } from 'react-native';
 import { Icon } from 'react-native-elements'

import * as firebase from 'firebase';
const window= Dimensions.get('window');
var acc=[];

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      allaccount:[

      ],
      youraccount:[

      ],
      renderPlaceholderOnly:true
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const currentaccount=snapshot.val();
      console.log(currentaccount);
      if(currentaccount != null){
        this.setState({
          allaccount:currentaccount
        })
      }
    })
    console.log(this.state.allaccount);
  }
  _onPress(){
      this.props.navigator.push({
        id:6,
        passProps:{
          username:this.props.username
        }
      })
    }
    _presshome(){
      this.props.navigator.push({
        id:4,
        passProps:{
          username:this.props.username
        }
      })
    }
    _pressuser(){

    }
  render(){
    if(this.state.renderPlaceholderOnly==true) return(
      <View style={{flex:1,backgroundColor:'white'}}>

      </View>
    )
    var i;
    for(i=0;i<this.state.allaccount.length;i++){
      if(this.props.username==this.state.allaccount[i].username)
        acc=this.state.allaccount[i];
    }
    console.log(this.props.username);
    console.log(this.state.allaccount);
    console.log(acc);
    return(
      <Image style={styles.background}
      source={require('./back.jpg')}>
              <View style={styles.topprofile}>
                  <View style={styles.header}>
                      <TouchableHighlight onPress={this._onPress.bind(this)}>
                          <View>
                          <Icon
                          name='mode-edit'
                          color='#00aced' />
                          </View>
                      </TouchableHighlight>
                      </View>
                        <View style={styles.centeruser}>
                            <Image source={{uri:acc.imgsrc}}
                            style={styles.avatar}
                            />
                            <Text style={styles.name}>
                            {acc.fullname}
                        </Text>
                        </View>
              </View>
          <View style={styles.navbar}>
                <TouchableHighlight   onPress={this._presshome.bind(this)} >
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
  background:{
    flex:1,
    resizeMode: 'cover',
    width:window.width*1,
    height:window.height*1,
    alignItems:'center',
    backgroundColor:'#fff'
  },
  navbar:{
    flexDirection:'row',
    height:window.height*0.07,
  },
  home:{
    width:window.width*0.5,
    backgroundColor:'pink',
    height:window.height*0.07,
  },
  topprofile:{
    width:window.width*1,
    height:window.height*0.93,
  },
  header:{
    width:window.width*1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  name:{
    fontSize:40,
    color:"#fff",
    top:window.height*0.1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  centeruser:{
    alignItems:'center',
  },
   avatar:{
      width:window.height*0.2,
      height:window.height*0.2,
      borderRadius:window.height*0.1,
    },


})
