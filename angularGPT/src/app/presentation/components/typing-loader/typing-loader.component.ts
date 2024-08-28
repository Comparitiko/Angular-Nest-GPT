import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  standalone: true,
  imports: [],
  styleUrl: './typing-loader.component.css',
  templateUrl: './typing-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingLoaderComponent {}
