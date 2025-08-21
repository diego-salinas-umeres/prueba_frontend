import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { ProductCreateRequest } from '../../core/models/product.model';

@Component({
  selector: 'app-create-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.scss'
})
export class CreateProductModalComponent {

  @Output() createProductEvent = new EventEmitter<ProductCreateRequest>();
  @Output() closed = new EventEmitter<void>();
  @Input() categories: Category[] = [];

  createProductForm!: FormGroup;
  

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      quantity: [null],
      price: [null],
      description: [null]
    })
  }

  close() {
    console.log(this.categories)
    this.closed.emit();
  }

  onSubmit() {
    const formValues = this.createProductForm.value;

    const newProduct: ProductCreateRequest = {
      name: formValues.name,
      categoryId: formValues.category,
      price: formValues.price,
      quantity: formValues.quantity,
      description: formValues.description
    }

    this.createProductEvent.emit(newProduct);
    this.close();
  }

}
