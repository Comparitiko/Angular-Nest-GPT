import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [],
  templateUrl: './assistant-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantPageComponent {}
