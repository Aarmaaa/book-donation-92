import React from 'react'
import {View, Text, TextInput, TouchableOpacity,Alert, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Alert} from 'react-native'
import firebase from "firebase";
import db from '../config';

export default class Login extends React.Component{

    constructor(){
        super()
        this.state={
            email: "",
            password: "",
            firstName:"",
            lastName:"",
            address:"",
            contact: "",
            confirmPassword:"",
            isModalVisible: false
        }
    }

    showModal = () => {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer} >
                    <ScrollView style={{width:"100%"}} >
                        <KeyboardAvoidingView style={styles.keyboardAvoidingView} >
                            <Text style={styles.modalTitle} > Sign Up </Text>

                    

                            <TextInput
                            placeholder="First Name"
                            style={styles.formTextInput}
                            maxLength={10}
                            onChangeText={(data)=>{
                                this.setState({
                                    firstName: data
                                })
                            }}
                            />

                            <TextInput
                            placeholder="Last Name"
                            style={styles.formTextInput}
                            maxLength={10}
                            onChangeText={(data)=>{
                                this.setState({
                                    lastName: data
                                })
                            }}
                            />

                            <TextInput
                            placeholder="Address"
                            style={styles.formTextInput}
                            onChangeText={(data)=>{
                                this.setState({
                                    address: data
                                })
                            }}
                            multiline = {true}
                            />

                            <TextInput
                            placeholder="Contact"
                            style={styles.formTextInput}
                            maxLength={10}
                            onChangeText={(data)=>{
                                this.setState({
                                    contact: data
                                })
                            }}
                            keyboardType={"numeric"}
                            />

                            <TextInput
                            placeholder="Email-Address"
                            style={styles.formTextInput}
                            maxLength={10}
                            onChangeText={(data)=>{
                                this.setState({
                                    email: data
                                })
                            }}
                            keyboardType="email-address"
                            />

                            <TextInput
                            placeholder="Password"
                            style={styles.formTextInput}
                            maxLength={10}
                            onChangeText={(data)=>{
                                this.setState({
                                    password: data
                                })
                            }}
                            secureTextEntry
                            
                            />

                            <TextInput
                            placeholder="Confirm Password"
                            style={styles.formTextInput}
                            maxLength={10}
                            onChangeText={(data)=>{
                                this.setState({
                                    confirmPassword: data
                                })
                            }}
                            secureTextEntry
                            />

                            <View style={styles.registerButtonContainer} >
                                <TouchableOpacity style={styles.registerButton} onPress={()=>{
                                    this.signUp(this.state.email, this.state.password, this.state.confirmPassword)
                                }} >
                                    <Text style={styles.registerButtonText} > Register </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.CancelButtonContainer} >
                                <TouchableOpacity style={styles.cancelButton} onPress={()=>{
                                this.setState({
                                    isModalVisible: false
                                })
                            }} >
                                    <Text style={styles.registerButtonText} > Cancel </Text>
                                </TouchableOpacity>
                            </View>
                            
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    signUp=(email, password, confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("Passwords do not match")
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                ()=>{
                    db.collection("users").add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        contact: this.state.contact,
                        email_id: this.state.email,
                        address: this.state.address
                    })
                    return Alert.alert("Account Created","",[{text: "Ok",onPress:()=>this.setState({isModalVisible: false})}])
                }
            )
            .catch(
                (error)=>{
                    return Alert.alert(error.message)
                }
            )
        }
    }

    userLogin=(email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            ()=>{
                this.props.navigation.navigate("Donate")
            }
        ).catch(
            (error)=>{
                return Alert.alert(error.message)
            }
        )

    }

    render(){
        return(
            <View style={styles.container} >
                <View style={{justifyContent:'center', alignItems:"center"}} >
                    <View>{this.showModal()}</View>
                    <View style={styles.headerContainer} >
                        <Text style={styles.title} > Book Donation </Text>
                    </View>
                </View>
                
                <View style={styles.buttonContainer} >
                    <TextInput
                    placeholder="Email"
                    style={styles.loginBox}
                    placeholderTextColor="#ffff"
                    keyboardType="email-address"
                    onChangeText={(data)=>{
                        this.setState({
                            email: data
                        })
                    }}
                    />

                    <TextInput
                    placeholder="Password"
                    style={styles.loginBox}
                    placeholderTextColor="#ffff"
                    secureTextEntry={true}
                    onChangeText={(data)=>{
                        this.setState({
                            password: data
                        })
                    }}
                    />

                    <TouchableOpacity style={[styles.button,{marginBottom:20, marginTop:20}]} onPress={()=>{
                        this.userLogin(this.state.email, this.state.password)
                    }} >
                        <Text style={styles.buttonText} > Login </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.setState({
                            isModalVisible: true
                        })
                    }} >
                        <Text style={styles.buttonText} > Sign up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: "#ff8a65",
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    container: {
        flex: 1,
        backgroundColor: "#F8BE85"
    },
    button: {
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#ff9800",
        borderRadius:25,
        shadowColor:"black",
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius:10,
        elevation: 16
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:25
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
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
      buttonContainer:{
        flex:1,
        alignItems:'center'
      },
      keyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:10,
        marginBottom:5
      },
})