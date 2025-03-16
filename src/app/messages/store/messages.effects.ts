import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Firestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { MessagesActions } from './messages.actions';
import { Message } from '../models/message.model';

@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions);
  private firestore = inject(Firestore);
  private snackBar = inject(MatSnackBar);
  
  constructor() {}

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.loadMessages),
      switchMap(() => {
        const messagesRef = collection(this.firestore, 'messages');
        const queryRef = query(messagesRef, orderBy('date', 'desc'));
        
        return from(getDocs(queryRef)).pipe(
          map(snapshot => {
            const messages = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                email: data['email'],
                message: data['message'],
                date: data['date']?.toDate()
              } as Message;
            });
            return MessagesActions.loadMessagesSuccess({ messages });
          }),
          catchError(error => {
            console.error('Error loading messages', error);
            this.snackBar.open('Error loading messages', 'Close', { duration: 3000 });
            return of(MessagesActions.loadMessagesFailure({ error }));
          })
        );
      })
    )
  );

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessage),
      switchMap(({ message }) => {
        const messageWithDate = {
          ...message,
          date: serverTimestamp()
        };
        
        const messagesRef = collection(this.firestore, 'messages');
        
        return from(addDoc(messagesRef, messageWithDate)).pipe(
          map(docRef => {
            return MessagesActions.addMessageSuccess({
              message: {
                ...message,
                id: docRef.id,
                date: new Date()
              }
            });
          }),
          tap(() => {
            this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
          }),
          catchError(error => {
            console.error('Error adding message', error);
            this.snackBar.open('Error sending message', 'Close', { duration: 3000 });
            return of(MessagesActions.addMessageFailure({ error }));
          })
        );
      })
    )
  );
}
