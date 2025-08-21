import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.scss'
})
export class InventoryPageComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    const role = this.authService.getUserRole();
    if (role === 'ADMIN') {
      console.log('Mostrar vista de administrador');
    } else {
      console.log('Vista de empleado');
    }

  }

}
