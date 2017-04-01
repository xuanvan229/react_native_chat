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
import { Icon } from 'react-native-elements'

const window= Dimensions.get('window');
var acc=[];

export default class EditProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      allaccount:[

      ],
      youraccount:[

      ],
      fullname:'',
      password:'',
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
  _onPress(){
    const update={
      id:acc.id,
      imgsrc:acc.imgsrc,
      username:acc.username,
      password:acc.password,
      fullname:this.state.fullname
    }
    firebase.database().ref('username/'+update.id).set(update);
    this.props.navigator.push({
      id:5,
      passProps:{
        username:this.props.username
      }
    })
  }
  render(){
    var i;
    for(i=0;i<this.state.allaccount.length;i++){
      if(this.props.username==this.state.allaccount[i].username)
        acc=this.state.allaccount[i];
    }
    console.log(this.state.fullname);
    return(
      <Image style={styles.background}
      source={require('./back.jpg')}
          >
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
                </View>
                <View>
                      <View style={styles.onechoose}>
                          <Text style={styles.username}>
                          Username:
                          </Text>
                          <Text style={styles.username2}>
                          {acc.username}
                          </Text>
                      </View>
                      <View style={styles.onechoose1}>
                          <Text style={styles.username3}>
                          Fullname:
                          </Text>
                          <TextInput placeholder={acc.fullname} style={styles.fullname}
                          onChangeText={(fullname)=>this.setState({fullname})}>
                          </TextInput>
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
  username:{
    color:"#fff",
    fontSize:25,
  },
  username2:{
    color:"#fff",
    fontSize:25,
  },
  username3:{
    color:"#fff",
    fontSize:25,

  },
  onechoose:{
    flexDirection:'row',
    width:window.width*0.6,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems:'center',

  },
  onechoose1:{
    flexDirection:'row',
    width:window.width*0.6,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent:'center',
    height:window.height*0.08,
  },
  header:{
    width:window.width*1,
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:window.height*0.04,
  },
  fullname:{
    width:window.width*0.3,
    height:window.height*0.05,
    borderWidth:1,
    borderColor: '#fff',

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
