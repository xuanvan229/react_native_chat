import React, { Component, PropTypes } from 'react';
import { View,
   Text,
   ScrollView,
   StyleSheet,
   TextInput,
   Dimensions,
   TouchableHighlight,
   Navigator
 } from 'react-native';
import * as firebase from 'firebase';
const window= Dimensions.get('window');

export default class LOGIN extends Component {
  constructor(props){
    super(props);
    this.state={
      text:'',
      messages:[

      ]
    }
  }
  componentDidMount(){
    firebase.database().ref('testmessage/').on('value',(snapshot)=>{
      const currentmessage =snapshot.val();
      if(currentmessage != null){
        this.setState({
          messages:currentmessage
        })
      }
    })
  }
  _handlepress(){
    const nextms={
    id: this.state.messages.length,
    message:this.state.text,
    name:this.props.username
  }
  firebase.database().ref('testmessage/'+nextms.id).set(nextms);
  this.refs['textInput1'].setNativeProps({text: ''});
  }
  render() {
    console.log(">>>>",this.props);
    const MESSAGE=this.state.messages.map((message,i)=>{
      return(
        <View key={i} style={styles.chat}>
        <Text style={styles.chatleft}>
        {message.name} :
        </Text>
        <Text style={styles.chatright}>
        {message.message}
        </Text>
        </View>
      )
    })
    return (
      <View style={styles.container}>
      <ScrollView style={styles.listchat}>
            {MESSAGE}
      </ScrollView>
      <View style={styles.bottom}>
          <TextInput style={styles.username} ref={'textInput1'}
          underlineColorAndroid='#ff8b8b'
          placeholderTextColor='#ff8b8b'
          onChangeText={(text) => this.setState({text})}
          placeholder="type your message">
          </TextInput>
          <TouchableHighlight style={styles.submit}
          onPress={this._handlepress.bind(this)}
          underlayColor="white">
          <Text>
          Send
          </Text>
          </TouchableHighlight>
      </View>

      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1
  },
  listchat:{
    flex:0.92,
  },
  chat:{
    alignItems:'center',
    flexDirection:'row',
    height:window.height*0.05,
    marginTop:10,
  },
  bottom:{
    flexDirection:'row',
  },

  chatright:{
    marginLeft:20,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:10,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'pink',
  },
  submit:{
    width:window.width*0.1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e88565',
  },
  username:{
    width: window.width*0.9,
    height: window.height*0.08,
  },
})
