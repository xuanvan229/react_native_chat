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
var acc=[];

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      allaccount:[

      ],
      youraccount:[

      ]
    }
  }
  componentDidMount(){
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
  render(){
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
      source={require('./back.jpg')}
          >
          <View style={styles.centeruser}>
          <Image source={{uri:acc.imgsrc}}
          style={styles.avatar}
          />
          <Text style={styles.name}>
          {acc.username}
          </Text>
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
