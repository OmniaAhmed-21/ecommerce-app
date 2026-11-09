import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guardes/auth-guard';
import { logedGuard } from './core/guardes/loged-guard';
export const routes: Routes = [
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'' , component:AuthLayoutComponent ,  canActivate:[logedGuard],
        children:[
        {path:'login', loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent) , title:'login'},
        {path:'register', loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent) , title:'register'},
        {path:'forget', loadComponent:()=>import('./pages/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent) , title:'forgetPsword'}]
    },
    {path:'' , component:BlankLayoutComponent , canActivate:[authGuard],
        children:[
        {path:'allorders', loadComponent:()=>import('./pages/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent) , title:'allOrders'},
        {path:'home', loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent) , title:'home'},
        {path:'cart', loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent) , title:'cart'},
        {path:'products', loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent) , title:'products'},
        {path:'brands', loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent), title:'brands'},
        {path:'categories', loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent) , title:'categories'},
        {path:'details/:id', loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent), title:'details'},
        {path:'whishlist', loadComponent:()=>import('./pages/whishlist/whishlist.component').then((c)=>c.WhishlistComponent), title:'whishlist'},
        {path:'checkout/:id', loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent), title:'checkout'}
        ]
    },
    {path:'**', component:NotfoundComponent, title:'notfound'}
];
