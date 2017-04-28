import React, { Component, PropTypes } from 'react';
import { View,
   Text,
   ScrollView,
   StyleSheet,
   TextInput,
   Image,
   Dimensions,
   TouchableHighlight,
   Navigator,
   FlatList,
   InteractionManager
 } from 'react-native';
import { Icon } from 'react-native-elements'

import * as firebase from 'firebase';
import NavJs from './nav.js'

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
      renderPlaceholderOnly:true

    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const userlist=snapshot.val();
      // console.log(userlist);
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
      // console.log(messid);
      if(messid!=null){
        this.setState({
          idmessage:messid
        })
      }
    })



  }
  _handlepress(targetUser){
    var i;
    // console.log(this.state.idmessage[0].username1);
    var check=false;
    var id;
      // console.log(targetUser);
      // console.log(this.state.idmessage.length);
      for(i=0;i<this.state.idmessage.length;i++){
        if((this.props.username == this.state.idmessage[i].username1 || this.props.username == this.state.idmessage[i].username2 )&&(targetUser ==this.state.idmessage[i].username1 || targetUser==this.state.idmessage[i].username2))
        {
            id=i
            check=true;
            // console.log(check);

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
    this.props.navigator.push({
      id:5,
      passProps:{
        username:this.props.username
      }
    })
  }
  _renderItem=({item})=>{
    return(
      <TouchableHighlight key={item.id} onPress={this._handlepress.bind(this,item.username)}>
            <View style={styles.viewuser}>
                    <Image source={{uri:item.imgsrc}}
                    style={styles.avatar}
                    />
                        <Text style={styles.username}>{item.fullname}</Text>
            </View>
      </TouchableHighlight>
    )
  }
  render(){
    if(this.state.renderPlaceholderOnly==true) return(
      <View style={{flex:1,backgroundColor:'white'}}>

      </View>
    )

    return(
      <Image style={styles.background}
      source={require('./back.jpg')} >
            <FlatList
              data={this.state.alluser}
              renderItem={this._renderItem}
              keyExtractor={item=>item.id}
              style={{flex:1,    marginRight:16,
                  marginLeft:16,}}
            />
          <NavJs navigator={this.props.navigator} username={this.props.username} id={4}/>
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
    width:window.width*1,
    height:window.width*1,
    paddingTop:24,
  },
  navbar:{
    flexDirection:'row',
    height:window.height*0.07,

  },
  listuser:{
    flexDirection:'column',
    width:window.width*1,
    height:window.height*0.93,
  },
  home:{
    width:window.width*0.5,
    backgroundColor:'pink',
    height:window.height*0.07,

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
