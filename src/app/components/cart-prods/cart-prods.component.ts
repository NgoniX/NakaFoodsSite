import { CartService } from './../../providers/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-cart-prods',
  templateUrl: './cart-prods.component.html',
  styleUrls: ['./cart-prods.component.css'],
})
export class CartProdsComponent implements OnInit {
  cartProducts: Product[];
  showDataNotFound = true;

  quantity = 0;

  // Not Found Message
  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Products to Cart';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartProduct();
  }

  removeCartProduct(product: Product) {
    this.cartService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();
  }

  getCartProduct() {
    this.cartProducts = this.cartService.getLocalCartProducts();
  }

  // update cart value and quantity
  updateCart(product: Product, quantity) {
    this.cartService.updateCartProducts(product, quantity);
    // Recalling
    this.getCartProduct();
    // console.log(cartUpdate);
  }
}
