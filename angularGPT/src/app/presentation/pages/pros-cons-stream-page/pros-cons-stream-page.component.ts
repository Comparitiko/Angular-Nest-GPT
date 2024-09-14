import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ProsConsMessage } from '@app/interfaces/pros-cons-message.interface';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';
import { TextMessageBoxComponent } from '@components/message-boxes/text-message-box/text-message-box.component';
import { TypingLoaderComponent } from '@components/typing-loader/typing-loader.component';
import { OpenAiService } from '@services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-cons-stream-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsConsStreamPageComponent {
  public messages = signal<ProsConsMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public chatBox = viewChild<ElementRef<HTMLDivElement>>('chatbox');

  private abortSignal = new AbortController();

  async handleMessage(promt: string) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.isLoading.set(true);
    this.newMessage(promt, false);
    this.newMessage('...', true);

    const stream = this.openAiService.prosConsStreamDiscusser(
      promt,
      this.abortSignal.signal,
    );

    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamResponse(text);
      const chatBoxElement = this.chatBox()!.nativeElement;
      chatBoxElement.scrollTop = chatBoxElement.scrollHeight;
    }
  }

  private handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();
    this.messages.set([...messages, { isGpt: true, text: message }]);
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
