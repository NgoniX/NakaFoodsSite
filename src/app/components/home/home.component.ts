import { CartService } from './../../providers/cart.service';
import { FavouritesService } from './../../providers/favourites.service';
import { ProductsService } from './../../providers/products.service';
import { Product } from './../../shared/product';
import { CategoriesService } from './../../providers/categories.service';
import { Category } from './../../shared/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public Category: Category[];
  p = 1; // Settup up pagination variable
  Product: Product[];
  hideWhenNoProduct = false; // Hide products data table when no product.
  noData = false; // Showing No Product Message, when no product in database.
  preLoader = true;
  term: string;
  catID: string;
  s: any;

  constructor(
    private categoriesApi: CategoriesService,
    private productsApi: ProductsService,
    private favouriteService: FavouritesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // loop through categories then show in categories panel
    const c = this.categoriesApi.GetCategoryList();
    c.snapshotChanges().subscribe((data) => {
      this.Category = [];
      data.forEach((item) => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Category.push(a as Category);
      });
    });

    // get Products
    this.dataState(); // Initialize product's list, when component is ready
    this.sendCatParam(this.catID);
  }

  // Using valueChanges() method to fetch simple list of products data.
  // It updates the state of hideWhenNoProduct, noData & preLoader variables
  // when any changes occurs in product data list in real-time.

  dataState() {
    this.productsApi
      .GetProductsList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoProduct = false;
          this.noData = true;
        } else {
          this.hideWhenNoProduct = true;
          this.noData = false;
        }
      });
  }

  // get cat ID parameter from function, get products by category if not null
  sendCatParam(catID) {
    this.s = catID
      ? this.productsApi.GetProductsByCat(catID)
      : this.productsApi.GetProductsList();

    this.s.snapshotChanges().subscribe((data) => {
      this.Product = [];
      data.forEach((item) => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Product.push(a as Product);
      });
    });
  }

  addFavourite(product: Product) {
    this.favouriteService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
