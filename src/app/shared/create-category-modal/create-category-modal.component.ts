import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryCreateRequest } from '../../core/models/category.model';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.scss'
})
export class CreateCategoryModalComponent {

  @Output() createCategoryEvent = new EventEmitter<CategoryCreateRequest>();
  @Output() closed = new EventEmitter<void>();

  createCategoryForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createCategoryForm = this.fb.group({
      name: [null, Validators.required],
    })
  }

  close() {
    this.closed.emit();
  }

  onSubmit() {
    const formValues = this.createCategoryForm.value;

    const newCategory: CategoryCreateRequest = {
      name: formValues.name,
    }

    this.createCategoryEvent.emit(newCategory);
    this.close();
  }

}
