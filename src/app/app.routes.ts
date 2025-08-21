import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/views/auth-page/auth-page.component';
import { inventoryRoutes } from './features/inventory/inventory.routes';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { reportsRoutes } from './features/reports/reports.routes';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'inventory', pathMatch: 'full'},
            { path: 'inventory', children: inventoryRoutes},
            { path: 'reports', children: reportsRoutes}
        ]
    },
    {
        path: 'auth', component: AuthPageComponent
    }
];
