import { createReducer, on } from '@ngrx/store';
import { MessagesActions } from './messages.actions';
import { Message } from '../models/message.model';

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: any;
  addingMessage: boolean;
}

export const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
  addingMessage: false
};

export const messagesReducer = createReducer(
  initialState,
  
  // Load Messages
  on(MessagesActions.loadMessages, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(MessagesActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    loading: false,
    messages
  })),
  
  on(MessagesActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Add Message
  on(MessagesActions.addMessage, (state) => ({
    ...state,
    addingMessage: true,
    error: null
  })),
  
  on(MessagesActions.addMessageSuccess, (state, { message }) => ({
    ...state,
    addingMessage: false,
    messages: [message, ...state.messages] // Add new message to the beginning
  })),
  
  on(MessagesActions.addMessageFailure, (state, { error }) => ({
    ...state,
    addingMessage: false,
    error
  }))
);


