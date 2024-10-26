import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [{
    title: 'Login',
    path: "",
    component: LoginComponent
}, {
    title: 'Menu',
    path: "menu",
    component: MenuComponent,
    canActivate: [loginGuard]
}, {
    path: '**',
    redirectTo: 'menu',
    pathMatch: 'full'
}];
