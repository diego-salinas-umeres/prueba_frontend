import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.scss'
})
export class CreateCategoryModalComponent {

    @Output() closed = new EventEmitter<void>();
  
    createProductForm!: FormGroup
  
    constructor(
      private fb: FormBuilder
    ) { }
  
    ngOnInit(): void {
      this.createProductForm = this.fb.group({
        name: [null, Validators.required],
        code: [null]
      })
    }
  
    close() {
      this.closed.emit();
    }
  
    onSubmit() {
  
    }

}
