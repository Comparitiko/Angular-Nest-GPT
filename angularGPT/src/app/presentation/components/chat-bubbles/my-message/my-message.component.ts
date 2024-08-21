import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  standalone: true,
  imports: [],
  templateUrl: './my-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMessageComponent {
  public text = input.required<string>();
}
