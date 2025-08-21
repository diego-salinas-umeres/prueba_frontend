import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product-service/product.service';
import { Product } from '../../../../core/models/product.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.scss'
})
export class InventoryPageComponent implements OnInit {
  filtersForm!: FormGroup;
  products: Product[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 25;
  totalPages = 0;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.filtersForm = this.fb.group({
      name: [undefined],
      category: [undefined]
    })

    this.loadProducts();

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

}
