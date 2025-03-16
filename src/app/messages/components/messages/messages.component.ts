import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Message } from '../../models/message.model';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { AppState } from '../../../store';
import { MessagesActions } from '../../store/messages.actions';
import { selectMessages, selectLoading, selectError } from '../../store/messages.selectors';

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
  messages$: Observable<Message[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  displayedColumns: string[] = ['id', 'email', 'message', 'date'];
  private subscriptions = new Subscription();
  
  private dialog = inject(MatDialog);
  private store = inject(Store<AppState>);
  private snackBar = inject(MatSnackBar);
  
  constructor() {
    this.messages$ = this.store.select(selectMessages);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }
  
  ngOnInit(): void {
    this.loadMessages();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  loadMessages(): void {
    // Dispatch the loadMessages action to trigger the effect
    this.store.dispatch(MessagesActions.loadMessages());
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
