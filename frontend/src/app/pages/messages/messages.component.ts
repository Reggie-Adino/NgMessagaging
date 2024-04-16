import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { MessageItemComponent } from '../../shared/component/message-item/message-item.component';
import { MessageService } from '../../core/services/message.service';
import { CommonModule } from '@angular/common';
import { Select, Store  } from '@ngxs/store';
import { GetAllMessages, MessageState } from '../../store/MessageState';
import { Observable } from 'rxjs';
import { IMessage } from '../../../models/common.module';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent,
    SidebarComponent,
    MessageItemComponent,
    CommonModule ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  [x: string]: any;
  @Select(MessageState.selectMessages) messages$!: Observable<IMessage[]>
  constructor(private messagesrv:MessageService, private store: Store) {

  }

  ngOnInit(): void {
    // this.getAllMessages()

    this.messages$.subscribe({
      next:(value) => {
        if (value) {
          this.store.dispatch( new GetAllMessages())          
        }
        console.log(value)
      }
    })
  }


}
