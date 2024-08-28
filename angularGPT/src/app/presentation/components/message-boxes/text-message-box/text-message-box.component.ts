import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  public placeholder = input<string>('placeholder');
  public disableCorrections = input<boolean>(false);
  public onMessage = output<string>();

  public fb = inject(FormBuilder);

  public form = this.fb.group({
    prompt: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt } = this.form.value;

    this.onMessage.emit(prompt ?? '');
    this.form.reset();
  }
}
