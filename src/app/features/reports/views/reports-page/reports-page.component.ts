import { Component } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.scss'
})
export class ReportsPageComponent {

  isGeneratingReport = false;

  constructor(
    private productService: ProductService,
  ) { }

  generateReport(): void {
    this.isGeneratingReport = true;

    this.productService.generateLowStockReport().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        this.isGeneratingReport = false;
      },
      error: (error) => {
        console.error('Error al generar reporte:', error);
        this.isGeneratingReport = false;
      }
    });
  }


}
