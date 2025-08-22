import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Category } from '../../core/models/category.model';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product, ProductUpdateRequest } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.scss'
})
export class EditProductModalComponent {


  @Output() updateProductEvent = new EventEmitter<ProductUpdateRequest>();
  @Output() closed = new EventEmitter<void>();
  @Input() productToUpdate: Product | null = null;
  @Input() categories: Category[] = [];


  editProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    console.log('product to update', this.productToUpdate)


    this.editProductForm = this.fb.group({
      name: [this.productToUpdate?.name, [Validators.required, Validators.minLength(3)]],
      category: [this.productToUpdate?.categoryId, Validators.required],
      quantity: [this.productToUpdate?.quantity, [
        Validators.required,
        Validators.min(0),
        Validators.pattern("^[0-9]*$")
      ]],
      price: [this.productToUpdate?.price, [
        Validators.required,
        Validators.min(0),
        Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")
      ]],
      description: [this.productToUpdate?.description, Validators.maxLength(250)]
    })
  }

  close() {
    console.log(this.categories)
    this.closed.emit();
  }

  onSubmit() {
    const formValues = this.editProductForm.value;

    const editedProduct: ProductUpdateRequest = {
      name: formValues.name,
      categoryId: formValues.category,
      price: formValues.price,
      quantity: formValues.quantity,
      description: formValues.description
    }

    this.updateProductEvent.emit(editedProduct);
    this.close();
  }


}
