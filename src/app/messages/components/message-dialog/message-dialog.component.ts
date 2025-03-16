import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Message } from '../../models/message.model';
import { AppState } from '../../../store';
import { MessagesActions } from '../../store/messages.actions';
import { selectAddingMessage } from '../../store/messages.selectors';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnDestroy {
  messageForm: FormGroup;
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  private subscription = new Subscription();
  
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<MessageDialogComponent>);
  private store = inject(Store<AppState>);
  private snackBar = inject(MatSnackBar);
  
  constructor() {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    
    // Subscribe to the addingMessage state
    const addingMessageSub = this.store.select(selectAddingMessage).subscribe(adding => {
      this.isSubmitting$.next(adding);
    });
    
    this.subscription.add(addingMessageSub);
  }
  
  submitForm(): void {
    if (this.messageForm.valid) {
      // Create a message object from the form values
      const message: Message = {
        id: '', // Will be set by Firebase
        email: this.messageForm.value.email,
        message: this.messageForm.value.message,
        date: new Date() // Placeholder, will be replaced with serverTimestamp by the effect
      };
      
      // Dispatch the addMessage action
      this.store.dispatch(MessagesActions.addMessage({ message }));
      
      // Set up a subscription to close the dialog when adding is complete
      this.store.select(selectAddingMessage).pipe(
        take(2) // Take the current value and the next value
      ).subscribe(isAdding => {
        if (!isAdding) {
          this.dialogRef.close();
        }
      });
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
