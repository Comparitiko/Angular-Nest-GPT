import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateMessage } from '@app/interfaces/translate-message.interface';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import {
  TextMessageBoxEvent,
  TextMessageBoxSelectComponent,
} from '@components/message-boxes/text-message-box-select/text-message-box-select.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './translate-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePageComponent {
  public messages = signal<TranslateMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public languages = [
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ];

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    this.isLoading.set(true);

    this.newMessage(prompt, false);

    this.openAiService
      .translateText(prompt, selectedOption)
      .subscribe((res) => {
        this.isLoading.set(false);
        this.newMessage(res.text, res.isGpt);
      });
  }

  private newMessage(prompt: string, isGpt: boolean) {
    this.messages.update((messages) => {
      return [
        ...messages,
        {
          text: prompt,
          isGpt,
        },
      ];
    });
  }
}
