import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

@Directive({
  selector: '[appAdminOnly]',
  standalone: true
})
export class AdminOnlyDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const role = this.authService.getUserRole();

    if (role === 'ADMIN') {
      // Mostrar el contenido
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // No mostrar
      this.viewContainer.clear();
    }
  }

}
