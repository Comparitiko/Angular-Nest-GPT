import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {
  public text = input.required<string>()
}
