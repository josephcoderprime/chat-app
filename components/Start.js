import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Alert,
  TextInput,
  Text,
  View, Button,
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";


const image = require('../assets/Background_Image.jpeg');

export default class Start extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        backgroundColor: "",
        name: "",
      }
  }

  onPressChat = (name, backgroundColor) => {
    if (name == "") {
      console.log(name);
      return Alert.alert('Please Enter a Name .');
    }
    this.props.navigation.navigate("Chat", {
      name: `${name}`,
      backgroundColor: `${backgroundColor}`,
    });
  };

  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.appTitle}>Chat Time</Text>
        <View style={styles.boxInput}>
          <TextInput style={styles.inputname}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeHolder='choose a name.'
          >
          </TextInput>
          <View style={styles.backgroundColorContainer}>
            <Text style={styles.backgroundColorText}>
              Choose Background Color:
            </Text>
            <View style={styles.chatButtonColor}>
              <TouchableOpacity accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Lets you choose the color chatinterface."
                onPress={() => this.setState({ backgroundColor: "#090C08" })}
                style={styles.chatButton1}>
              </TouchableOpacity>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Lets you choose the color chatinterface."
                onPress={() => this.setState({ backgroundColor: "#474056" })}
                style={[styles.chatButton1, styles.chatButton2]}>
              </TouchableOpacity>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Lets you choose the color chatinterface."
                onPress={() => this.setState({ backgroundColor: "#8A95A5" })}
                style={[styles.chatButton1, styles.chatButton3]}>
              </TouchableOpacity>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Lets you choose the color chatinterface."
                onPress={() => this.setState({ backgroundColor: "#B9C6AE" })}
                style={[styles.chatButton1, styles.chatButton4]}></TouchableOpacity>
            </View>
          </View>


          <TouchableOpacity
            accessible={true}
            accessibilityLabel='Start Chatting'
            accessibilityHint='Let you start chatting'
            style={styles.chatbutton}
            onPress={() => this.onPressChat(this.state.name, this.state.backgroundColor)}
          >
            <Text style={styles.chatbuttontext}>Start Chatting</Text>
          </TouchableOpacity>





        </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

  boxInput: {
    width: '88%',
    height: '44%',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'white',
    marginBottom: 30,
  },
  appTitle: {
    top: 30,
    height: '50%',
    fontSize: 45,
    fontWeight: 600,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  inputname: {
    fontSize: 16,
    width: '88%',
    fontWeight: '300',
    opacity: 50,
    color: '#757083',
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 10,
    position: 'relative',
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 3,
    padding: 10,
  },
  chatButton1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },
  chatButton2: {
    backgroundColor: '#474056',
  },
  chatButton3: {
    backgroundColor: '#8A95A5',
  },
  chatButton4: {
    backgroundColor: '#B9C6AE',

  },
  chatbutton: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#757083',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    width: 200,
  },
  chatbuttontext: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },

  backgroundColorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  backgroundColorText: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 16,
    fontWeight: '500',
    color: '#757083',
  }, backgroundColorContainer: {
    flexDirection: 'column',
  },

  chatButtonColor: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});