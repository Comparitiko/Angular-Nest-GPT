import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Message } from '@app/interfaces/message.interfaces';
import { ChatMessageComponent } from '@app/presentation/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@app/presentation/components/chat-bubbles/my-message/my-message.component';
import {
  TextMessageBoxFileComponent,
  TextMessageEvent,
} from '@components/message-boxes/text-message-box-file/text-message-box-file.component';
import {
  TextMessageBoxEvent,
  TextMessageBoxSelectComponent,
} from '@components/message-boxes/text-message-box-select/text-message-box-select.component';
import { TextMessageBoxComponent } from '@components/message-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthography-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {
  public messages = signal<Message[]>([{ text: 'Hola mundo', isGpt: true }]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessageFile(event: TextMessageEvent) {
    console.log(event);
  }

  handleMessageSelect(event: TextMessageBoxEvent) {
    console.log(event);
  }
}
