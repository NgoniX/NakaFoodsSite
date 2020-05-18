import { CartService } from 'src/app/providers/cart.service';
import { ProductsService } from './../../providers/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-product-desc',
  templateUrl: './product-desc.component.html',
  styleUrls: ['./product-desc.component.css'],
})
export class ProductDescComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getProductDetail(id);
      console.log(id);
    });
  }

  getProductDetail(id: string) {
    // this.spinnerService.show();
    const x = this.productService.GetProduct(id);
    x.snapshotChanges().subscribe(
      (product) => {
        // this.spinnerService.hide();
        const y = product.payload.toJSON() as Product;

        y.$key = id;
        this.product = y;
      },
      (error) => {
        this.toastrService.error('Error while fetching Product Detail', error);
      }
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
