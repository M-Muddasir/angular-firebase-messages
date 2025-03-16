import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesState } from './messages.reducer';

// Create a feature selector for the messages state
export const selectMessagesState = createFeatureSelector<MessagesState>('messages');

// Create selectors for each part of the state
export const selectMessages = createSelector(
  selectMessagesState,
  (state) => state.messages
);

export const selectLoading = createSelector(
  selectMessagesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectMessagesState,
  (state) => state.error
);

export const selectAddingMessage = createSelector(
  selectMessagesState,
  (state) => state.addingMessage
);
