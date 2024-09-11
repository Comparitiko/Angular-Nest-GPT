import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  standalone: true,
  imports: [],
  templateUrl: './gpt-message-orthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent {
  user_Score = input.required<number>();
  text = input.required<string>();
  errors = input<string[]>([]);
}
