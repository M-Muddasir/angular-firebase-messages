import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import * as fromMessages from '../messages/store/messages.reducer';

export interface AppState {
  messages: fromMessages.MessagesState;
}

export const reducers: ActionReducerMap<AppState> = {
  messages: fromMessages.messagesReducer
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
