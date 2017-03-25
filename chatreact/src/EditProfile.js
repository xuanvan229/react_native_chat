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

export default class EditProfile extends Component{
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
      if(currentaccount != null){
        this.setState({
          allaccount:currentaccount
        })
      }
    })
  }
  render(){
    var i;
    for(i=0;i<this.state.allaccount.length;i++){
      if(this.props.username==this.state.allaccount[i].username)
        acc=this.state.allaccount[i];
    }
    console.log(this.props.username);
    return(
      <Image style={styles.background}
      source={require('./back.jpg')}
          >
                <View style={styles.centeruser}>
                      <Image source={{uri:acc.imgsrc}}
                      style={styles.avatar}
                      />
                </View>
                <View>
                      <View style={styles.onechoose}>
                          <Text>
                          Username:
                          </Text>
                          <Text>
                          {acc.username}
                          </Text>
                      </View>
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
  onechoose:{
    flexDirection:'row',
    width:window.width*0.6,
    backgroundColor: 'rgba(0,0,0,0)',

  },
  header:{
    width:window.width*1,
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:window.height*0.04,
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
