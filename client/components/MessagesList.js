import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import {store, gotMessagesFromServer, fetchMessages} from '../actions/store';


export default class MessagesList extends Component {

  constructor () {
    super();
    this.state = store.getState()
    this.unsubscribe = null
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    const thunk = fetchMessages()
    store.dispatch(thunk)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}
