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
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  private firestore = inject(Firestore);
  private snackBar = inject(MatSnackBar);
  
  constructor() {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  
  submitForm(): void {
    if (this.messageForm.valid) {
      this.isSubmitting$.next(true);
      
      const messageWithDate = {
        ...this.messageForm.value,
        date: serverTimestamp()
      };
      
      try {
        const messagesRef = collection(this.firestore, 'messages');
        addDoc(messagesRef, messageWithDate)
          .then(() => {
            this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
            this.dialogRef.close();
          })
          .catch((error) => {
            console.error('Error adding message', error);
            this.snackBar.open('Error sending message', 'Close', { duration: 3000 });
          })
          .finally(() => {
            this.isSubmitting$.next(false);
          });
      } catch (error) {
        console.error('Error setting up message submission', error);
        this.snackBar.open('Error sending message', 'Close', { duration: 3000 });
        this.isSubmitting$.next(false);
      }
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
