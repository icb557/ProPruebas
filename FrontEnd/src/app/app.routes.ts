import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [{
    title: 'Login',
    path: "",
    component: LoginComponent
}, {
    title: 'Menu',
    path: "menu",
    component: MenuComponent
}];
