/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements'

export default class NavJS extends Component {
  _handlePress=(id)=>{
    if(id!=this.props.id)
    this.props.navigator.replace({
      id:id,
      passProps:{
        username:this.props.username
      }
    })
  }
  render() {
    return (
      <View style={styles.navbar}>
            <Icon
              onPress={this._handlePress.bind(this,4)}
              name='home'
              color='#fff'
              containerStyle={styles.icon}
              size={50} />
              <Icon
                onPress={this._handlePress.bind(this,5)}
                name='people'
                color='#fff'
                containerStyle={styles.icon}
                size={50} />
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar:{
    flexDirection:'row',
    height:window.height*0.07,
    backgroundColor:'red',
  },
  icon:{
    flex:1,
    // backgroundColor:'yellow',
    // height:200
  },
  home:{
    // width:window.width*0.5,
    flex:1,
    backgroundColor:'pink',
    height:window.height*0.07,
  },
});
