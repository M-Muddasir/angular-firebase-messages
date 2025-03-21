import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessagesComponent } from './components/messages/messages.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MatIconModule } from '@angular/material/icon';

import { messagesReducer } from './store/messages.reducer';
import { MessagesEffects } from './store/messages.effects';

const routes: Routes = [
  { path: '', component: MessagesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('messages', messagesReducer),
    EffectsModule.forFeature([MessagesEffects]),
    MessagesComponent,
    MessageDialogComponent,
    MatIconModule
  ],
  providers: []
})
export class MessagesModule { }
