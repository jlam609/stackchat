import React, { Component } from 'react';
import {store, writeMessage, gotNewMessageFromServer} from '../actions/store';
import axios from 'axios';
import socket from '../socket'

export default class NewMessageEntry extends Component {
  constructor(){
    super()
    this.state = store.getState()
  }
  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  postChange = (e) => {
    e.preventDefault()
    axios.post('/api/messages', {
      content: this.state.content,
      channelId:this.props.channelId
    })
    .then((res) => {
      store.dispatch(gotNewMessageFromServer(res.data))
      socket.emit('new-message', res.data);
    })
    .catch(e => console.error(e))
  }
  render () {
    return (
      <form id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            value = {this.state.content}
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange = {(e) => {
              e.preventDefault()
              store.dispatch(writeMessage(e.target.value))
            }}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit" onClick= {(e) => this.postChange(e)} >Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
