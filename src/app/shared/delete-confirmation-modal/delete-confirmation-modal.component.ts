import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.scss'
})
export class DeleteConfirmationModalComponent {

  @Input() productId!: number;
  @Input() productName!: string;
  @Output() deleteProductEvent = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();

  confirmDelete() {
    this.deleteProductEvent.emit(this.productId);
  }

  close() {
    this.closed.emit();
  }

}
