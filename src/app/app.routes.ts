import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/views/auth-page/auth-page.component';
import { inventoryRoutes } from './features/inventory/inventory.routes';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'inventory', pathMatch: 'full'},
            { path: 'inventory', children: inventoryRoutes}
        ]
        
    },
    {
        path: 'auth', component: AuthPageComponent
    }
];
