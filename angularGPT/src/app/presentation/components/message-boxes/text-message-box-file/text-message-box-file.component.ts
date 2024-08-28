import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt: string | null | undefined;
}

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  public placeholder = input<string>('placeholder');
  public onMessage = output<TextMessageEvent>();

  public fb = inject(FormBuilder);

  // File need to be type File and required
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required],
  });

  public file: File | undefined;

  handleSelectedFile(event: any) {
    const file = event.target.files.item(0);

    if (!file) return;

    this.form.controls.file.setValue(file);
  }

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt, file } = this.form.value;

    if (!file) return;

    this.onMessage.emit({
      prompt,
      file,
    });
    this.form.reset();
  }
}
