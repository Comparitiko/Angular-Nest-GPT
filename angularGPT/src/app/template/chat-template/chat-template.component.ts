import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '@app/interfaces/message.interfaces';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '@components/message-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chat-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(promt: string) {
    console.log({ promt });
  }

  // handleMessageFile(event: TextMessageEvent) {
  //   console.log(event);
  // }

  // handleMessageSelect(event: TextMessageBoxEvent) {
  //   console.log(event);
  // }
}
