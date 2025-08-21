import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product-service/product.service';
import { ProductCreateRequest, ProductPaginated } from '../../../../core/models/product.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProductModalComponent } from '../../../../shared/create-product-modal/create-product-modal.component';
import { Category, CategoryCreateRequest } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category-service/category.service';
import { AdminOnlyDirective } from '../../../../core/directives/admin-only.directive';
import { CreateCategoryModalComponent } from '../../../../shared/create-category-modal/create-category-modal.component';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CreateProductModalComponent, AdminOnlyDirective, CreateCategoryModalComponent],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.scss'
})
export class InventoryPageComponent implements OnInit {
  filtersForm!: FormGroup;
  products: ProductPaginated[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 25;
  totalPages = 0;
  isCreateProductModalOpen: boolean = false;
  categories: Category[] = [];
  isCreateCategoryModalOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.filtersForm = this.fb.group({
      name: [undefined],
      category: [undefined]
    })

    this.loadProducts();
    this.loadCategories();

    const role = this.authService.getUserRole();
    if (role === 'ADMIN') {
      console.log('Mostrar vista de administrador');
    } else {
      console.log('Vista de empleado');
    }
  }

  loadProducts(page: number = 0): void {
    const filters = this.filtersForm.value;

    this.productService.getPaginatedProducts(
      page,
      this.pageSize,
      filters.name,
      filters.category
    ).subscribe(response => {
      this.products = response.products;
      this.totalElements = response.totalItems;
      this.currentPage = response.currentPage;
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
    });
  }

  loadCategories():void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.log('Something went wrong...')
    })
  }

  applyFilters(): void {
    this.loadProducts(0);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadProducts(page);
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  openCreateProductModal() {
    this.isCreateProductModalOpen = true;
  }

   openCreateCategoryModal() {
    this.isCreateCategoryModalOpen = true;
  }

  closeCreateProductModal() {
    this.isCreateProductModalOpen = false;
  }

createProduct(newProduct: ProductCreateRequest) {
  this.productService.createProduct(newProduct).subscribe({
    next: (res) => {
      console.log('Producto creado', res);
      this.loadProducts();
    },
    error: (err) => {
      console.error('Error al crear producto', err);
    }
  });
}

createCategory(newCategory: CategoryCreateRequest){
  this.categoryService.createCategory(newCategory).subscribe({
    next: (res) =>{
      this.categories = [...this.categories, res]
      console.log('Categoría creada...', res)
    },
    error: (err) => {
      console.error('Something went wrong...')
    }
  })
}

}
