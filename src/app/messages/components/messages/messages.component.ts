import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Firestore, collection, getDocs, query, orderBy, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Message } from '../../models/message.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    DatePipe
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages$ = new BehaviorSubject<Message[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  displayedColumns: string[] = ['id', 'email', 'message', 'date'];
  private subscriptions = new Subscription();
  
  private dialog = inject(MatDialog);
  private firestore = inject(Firestore);
  private snackBar = inject(MatSnackBar);
  
  constructor() {}
  
  ngOnInit(): void {
    this.loadMessages();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  loadMessages(): void {
    try {
      this.loading$.next(true);
      const messagesRef = collection(this.firestore, 'messages');
      const queryRef = query(messagesRef, orderBy('date', 'desc'));
      
      // Use collectionData to get an Observable instead of directly calling getDocs
      collectionData(queryRef, { idField: 'id' }).subscribe({
        next: (data: any[]) => {
          const messages = data.map(item => {
            return {
              id: item.id,
              email: item.email,
              message: item.message,
              date: item.date?.toDate ? item.date.toDate() : item.date
            } as Message;
          });
          this.messages$.next(messages);
          this.loading$.next(false);
        },
        error: (error) => {
          console.error('Error loading messages', error);
          this.snackBar.open('Error loading messages', 'Close', { duration: 3000 });
          this.loading$.next(false);
        }
      });
    } catch (error) {
      console.error('Error setting up messages subscription', error);
      this.snackBar.open('Error loading messages', 'Close', { duration: 3000 });
      this.loading$.next(false);
    }
  }
  
  openAddMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      disableClose: true
    });
    
    const subscription = dialogRef.afterClosed().subscribe(() => {
      // Reload messages after dialog close
      this.loadMessages();
    });
    
    this.subscriptions.add(subscription);
  }
}
