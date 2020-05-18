import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsRef: AngularFireList<any>; // Reference to Product data list, its an Observable
  productRef: AngularFireObject<any>;

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Fetch Single Product Object
  GetProduct(id: string) {
    this.productRef = this.db.object('products/' + id);
    return this.productRef;
  }

  // Fetch Products By Category
  GetProductsByCat(catID: string) {
    return this.db.list('/products', (ref) =>
      ref.orderByChild('category_id').equalTo(catID)
    );
  }

  // Fetch Products List
  GetProductsList() {
    this.productsRef = this.db.list('products');
    return this.productsRef;
  }
}
