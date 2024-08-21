import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '@app/presentation/components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@app/presentation/components/chat-bubbles/my-message/my-message.component';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [ChatMessageComponent, MyMessageComponent],
  templateUrl: './orthography-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPageComponent {}
