import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  OrthographyInfo,
  OrthographyMessage,
} from '@app/interfaces/orthography-message.interface';
import { ChatMessageComponent } from '@app/presentation/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@app/presentation/components/chat-bubbles/my-message/my-message.component';
import { GptMessageOrthographyComponent } from '@components/chat-bubbles/gpt-message-orthography/gpt-message-orthography.component';
import { TextMessageBoxFileComponent } from '@components/message-boxes/text-message-box-file/text-message-box-file.component';
import { TextMessageBoxSelectComponent } from '@components/message-boxes/text-message-box-select/text-message-box-select.component';
import { TextMessageBoxComponent } from '@components/message-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    ChatMessageComponent,
    GptMessageOrthographyComponent,
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
  public messages = signal<OrthographyMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.newMessage(prompt, false);

    this.openAiService.checkOrthography(prompt).subscribe((res) => {
      this.isLoading.set(false);
      this.newMessage(res.message, true, res);
    });
  }

  private newMessage(prompt: string, isGpt: boolean, info?: OrthographyInfo) {
    this.messages.update((messages) => {
      if (info) {
        return [
          ...messages,
          {
            text: prompt,
            isGpt,
            info,
          },
        ];
      } else {
        return [
          ...messages,
          {
            text: prompt,
            isGpt,
          },
        ];
      }
    });
  }
}
