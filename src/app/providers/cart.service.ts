import { Injectable } from '@angular/core';
import { Product } from '../shared/product';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  navbarCartCount = 0;

  constructor(private toastrService: ToastrService) {
    this.calculateLocalCartProdCounts();
  }

  // Adding new Product to cart db if logged in else localStorage
  addToCart(data: Product): void {
    let a: Product[];

    a = JSON.parse(localStorage.getItem('avct_item')) || [];

    // check if product already exists is cart
    const productExistInCart = this.getLocalCartProducts().find(
      ({ name }) => name === data.name
    );

    if (!productExistInCart) {
      a.push({ ...data, quantity: 1 });
      this.toastrService.info(
        'Adding Product to Cart',
        'Product Adding to the cart'
      );
      setTimeout(() => {
        localStorage.setItem('avct_item', JSON.stringify(a));
        this.calculateLocalCartProdCounts();
      }, 500);
      // console.log(JSON.stringify(a));
    } else {
      this.toastrService.warning(
        'Already Exists',
        'Product already added to cart'
      );
      // console.log(JSON.stringify(a));
    }
  }

  // Removing cart from local
  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem('avct_item'));

    for (let i = 0; i < products.length; i++) {
      if (products[i].$key === product.$key) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem('avct_item', JSON.stringify(products));

    this.calculateLocalCartProdCounts();
  }

  // Update cart local by quantity
  updateCartProducts(product: Product, quantity) {
    const products = JSON.parse(localStorage.getItem('avct_item')) || [];

    const newProducts = products.map((p) =>
      p.$key === product.$key ? { ...p, quantity } : p
    );

    // for (const p of products) {
    //   if (p.$key === product.$key) {
    //     products.push({
    //       ...product,
    //       quantity,
    //     });
    //     break;
    //   }
    // }

    // ReAdding the products after update
    localStorage.setItem('avct_item', JSON.stringify(newProducts));

    this.calculateLocalCartProdCounts();
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem('avct_item')) || [];

    return products;
  }

  // returning LocalCarts Product Count
  calculateLocalCartProdCounts() {
    this.navbarCartCount = this.getLocalCartProducts().length;
  }
}
