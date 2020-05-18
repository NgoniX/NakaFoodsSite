import { ContactComponent } from './components/contact/contact.component';
import { ProductDescComponent } from './components/product-desc/product-desc.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouriteProdsComponent } from './components/favourite-prods/favourite-prods.component';
import { CartProdsComponent } from './components/cart-prods/cart-prods.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'favourites', component: FavouriteProdsComponent },
  { path: 'cart-items', component: CartProdsComponent },
  { path: 'prod-desc/:id', component: ProductDescComponent },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
