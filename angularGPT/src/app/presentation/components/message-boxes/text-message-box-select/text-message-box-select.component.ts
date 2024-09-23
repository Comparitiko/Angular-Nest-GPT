import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Option {
  id: string;
  text: string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {
  public placeholder = input<string>('placeholder');
  public options = input.required<Option[]>();
  public onMessage = output<TextMessageBoxEvent>();

  public fb = inject(FormBuilder);

  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt, selectedOption } = this.form.value;

    if (!selectedOption) {
      return;
    }

    this.onMessage.emit({
      prompt: prompt!,
      selectedOption: selectedOption!,
    });
    this.form.reset();
  }
}
