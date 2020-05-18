import { FavouriteProduct } from './../shared/favourite-product';
import { AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from '../shared/product';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  // favouriteProducts
  favouriteProducts: AngularFireList<FavouriteProduct>;
  navbarFavProdCount = 0;

  constructor(private toastrService: ToastrService) {
    this.calculateLocalFavProdCounts();
  }

  // Adding New product to favourite if logged else to localStorage
  addFavouriteProduct(data: Product): void {
    let a: Product[];
    a = JSON.parse(localStorage.getItem('avf_item')) || [];

    // check if product already exists is favourites
    const productExists = this.getLocalFavouriteProducts().find(
      ({ name }) => name === data.name
    );

    if (!productExists) {
      a.push(data);
      this.toastrService.info('Adding Product', 'Adding Product as Favourite');
      setTimeout(() => {
        localStorage.setItem('avf_item', JSON.stringify(a));
        this.calculateLocalFavProdCounts();
      }, 1500);
    } else {
      this.toastrService.warning(
        'Already Added',
        'Product already added as favourite'
      );
    }
  }

  // Fetching unsigned users favourite proucts
  getLocalFavouriteProducts(): Product[] {
    // const uniq = {};
    const products: Product[] =
      JSON.parse(localStorage.getItem('avf_item')) || [];

    // remove duplicates from products array of objects
    // const filterProducts = products.filter(
    //   (obj) => !uniq[obj.name] && (uniq[obj.name] = true)
    // );

    return products;
  }

  // Removing Favourite Product from Database
  removeFavourite(key: string) {
    this.favouriteProducts.remove(key);
  }

  // Removing Favourite Product from localStorage
  removeLocalFavourite(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem('avf_item'));

    for (let i = 0; i < products.length; i++) {
      if (products[i].$key === product.$key) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem('avf_item', JSON.stringify(products));

    this.calculateLocalFavProdCounts();
  }

  // Returning Local Products Count
  calculateLocalFavProdCounts() {
    this.navbarFavProdCount = this.getLocalFavouriteProducts().length;
  }
}
