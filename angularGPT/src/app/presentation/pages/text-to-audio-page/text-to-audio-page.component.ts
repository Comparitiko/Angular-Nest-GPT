import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VOICES } from '@app/enums/voices.enum';
import { TextToAudioMessage } from '@app/interfaces/text-to-auido-message.interface';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import {
  TextMessageBoxEvent,
  TextMessageBoxSelectComponent,
} from '@components/message-boxes/text-message-box-select/text-message-box-select.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './text-to-audio-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextToAudioPageComponent {
  public messages = signal<TextToAudioMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public voices = [
    {
      id: VOICES.ALLOY,
      text: VOICES.ALLOY,
    },
    {
      id: VOICES.ECHO,
      text: VOICES.ECHO,
    },
    {
      id: VOICES.FABLE,
      text: VOICES.FABLE,
    },
    {
      id: VOICES.NOVA,
      text: VOICES.NOVA,
    },
    {
      id: VOICES.ONYX,
      text: VOICES.ONYX,
    },
    {
      id: VOICES.SHIMMER,
      text: VOICES.SHIMMER,
    },
  ];

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    this.newMessage(`${selectedOption} - ${prompt}`, false);

    this.isLoading.set(true);

    this.openAiService
      .textToAudio(prompt, selectedOption)
      .subscribe(({ message, audioUrl }) => {
        this.isLoading.set(false);
        this.newMessage(message, true, audioUrl);
      });
  }

  private newMessage(prompt: string, isGpt: boolean, audioUrl?: string) {
    this.messages.update((messages) => {
      return [
        ...messages,
        {
          text: prompt,
          isGpt,
          audioUrl,
        },
      ];
    });
  }
}
