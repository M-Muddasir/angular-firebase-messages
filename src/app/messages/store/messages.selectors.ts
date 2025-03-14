import { createSelector } from '@ngrx/store';
import { getMessagesState, getMessages, getLoading, getError, getAddingMessage } from './messages.reducer';

export const selectMessagesState = getMessagesState;
export const selectMessages = getMessages;
export const selectLoading = getLoading;
export const selectError = getError;
export const selectAddingMessage = getAddingMessage;
