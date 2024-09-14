import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ProsConsMessage } from '@app/interfaces/pros-cons-message.interface';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '@components/message-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-cons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConsPageComponent {
  public messages = signal<ProsConsMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(promt: string) {
    this.isLoading.set(true);
    this.newMessage(promt, false);

    this.openAiService.prosConsDiscusser(promt).subscribe((res) => {
      this.isLoading.set(false);
      this.newMessage(res.content, true);
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
