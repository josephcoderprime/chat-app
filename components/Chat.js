import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';


// display data from  Firestore database in the app
const firebaseConfig = {
  apiKey: "AIzaSyAbHPopzhA3X1YY9SlG5iuB0PO9pLfdhuo",
  authDomain: "chat-app-a1825.firebaseapp.com",
  projectId: "chat-app-a1825",
  storageBucket: "chat-app-a1825.appspot.com",
  messagingSenderId: "470626575121",
  appId: "1:470626575121:web:0544d8316199cb8deda2b0",
  measurementId: "G-1VTLR7GEFC"
};

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
    }
    //config allow the app to connect to Firestore
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // create a reference to your Firestore collection
    //This stores and retrieves the chat messages your users send.
    this.referenceChatMessages = firebase.firestore().collection('messages');
    //this.referenceChatMessages = null;
  }

  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: `${name}` });
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
        // Authenticates user via Firebase
        this.authUnsubscribe = firebase.auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              user: {
                _id: user.uid,
                name: name,
                avatar: 'https://placeimg.com/140/140/any',
              },
              messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
      }
      else {
        console.log('offline');
        this.setState({ isConnected: false });
        this.getMessages();
      }
    });

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // function that loads the messages from asyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //function add message
  addMessage() {
    const message = this.state.messages[0];
    console.log(message);
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
    });
  }

  //retrieve the current data in  collection and store it in your state messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || null,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      }); console.log(data.text);
    });
    this.setState({
      messages,
    });
  }

  // saves new message to client-side storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // adds new message to messages array  
  onSend(messages = []) {
    console.log("kj");
    console.log(messages);
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      },
    );
  }

  // deletes messages from client-side storage
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  // disables message input bar if offline
  renderInputToolbar = props => {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }


  render() {
    const { name } = this.props.route.params;
    let backgroundColor = this.props.route.params.backgroundColor;
    return (
      <View style={[styles.outerview, { backgroundColor: backgroundColor }]}>
        <GiftedChat
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />

        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }
      </View>
    );

  }
}
const styles = StyleSheet.create({
  outerview: {
    flex: 1,
  },

})