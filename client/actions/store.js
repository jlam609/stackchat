import {GOT_MESSAGES_FROM_SERVER, DELETE_MESSAGES, WRITE_MESSAGE, GOT_NEW_MESSAGE_FROM_SERVER} from './actions'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

const gotMessagesFromServer = (messagesArr) => {
    return{
        type:GOT_MESSAGES_FROM_SERVER,
        messages:messagesArr
    }
}
const writeMessage = (input) => {
    return{
        type:WRITE_MESSAGE,
        content: input
    }
}
const gotNewMessageFromServer = (content) => {
    return{
        type:GOT_NEW_MESSAGE_FROM_SERVER,
        content:content
    }
}
const fetchMessages = () => {
    return (dispatch) => {  
        axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => dispatch(gotMessagesFromServer(messages)))
        .catch(e => console.error(e))  
    }
}
const initialState = {
    messages:[],
    content:''
}

const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_MESSAGES_FROM_SERVER:
            return ({
                ...state,
                messages:action.messages
            })
        case WRITE_MESSAGE:
            return ({
                ...state,
                content:action.content
            })
        case GOT_NEW_MESSAGE_FROM_SERVER:
            return({
                messages:[...state.messages, action.content],
                content:''
            })

        case  DELETE_MESSAGES:{

        }
        default:
            return state
    }
}


const store = createStore(messageReducer, applyMiddleware(loggerMiddleware, thunkMiddleware))

export {
    store,
    gotMessagesFromServer,
    gotNewMessageFromServer,
    writeMessage,
    fetchMessages
}