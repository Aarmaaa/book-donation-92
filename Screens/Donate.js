import React from 'react';
import { StyleSheet, Text, View , FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from "react-native-elements";
import firebase from "firebase";
import db from '../config';


export default class Donate extends React.Component {

  constructor(){
    super()
    this.state={
      requestedBooks: []
    }
  }

  getRequestedBooks=()=>{
    db.collection("requested_books").onSnapShot((doc)=>{
      var requestedBooks = doc.docs.map(document=> document.data())
      this.setState({
        requestedBooks: requestedBooks
      })
    })
  }

  componentDidMount(){
    this.getRequestedBooks();
  }
  
    keyExtractor=(item, index)=> index.toString();

    renderItem=(item, index)=>{
      return(
        <ListItem 
        key={index}
        title={item.book_name}
        subtitle={item.reason}
        titleStyle={{color:"black", fontWeight:"bold"}}
        bottomDivider
        rightElement={
          <TouchableOpacity style={styles.button} >
            <Text style = {{color: "#ffff"}}>view</Text>
          </TouchableOpacity>
        }
        />
      )
    }  
  
    render(){
    return (
        <View style={styles.container}>
          <View style={styles.headerContainer} >
            <Text style = {styles.title}>Donate Books</Text>
          </View>
          <View style = {{flex: 1}}>
            {this.state.requestedBooks.length === 0 ? (<View><Text style = {{fontSize: 20}}>No Request Aviable </Text></View>) : (
              <FlatList
              keyExtractor={thitSlop.keyExtractor}
              data={this.state.requestedBooks}
              renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00',
},
headerContainer:{
    flex:0.4,
    justifyContent:'center',
    alignItems:'center',
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})