import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Message } from '../models/message.model';

export const MessagesActions = createActionGroup({
  source: 'Messages',
  events: {
    'Load Messages': emptyProps(),
    'Load Messages Success': props<{ messages: Message[] }>(),
    'Load Messages Failure': props<{ error: any }>(),

    'Add Message': props<{ message: Message }>(),
    'Add Message Success': props<{ message: Message }>(),
    'Add Message Failure': props<{ error: any }>()
  }
});
