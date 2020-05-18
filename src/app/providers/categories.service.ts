import { Injectable } from '@angular/core';
import { Product } from '../shared/product'; // Product data type interface class
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categoryRef: AngularFireList<any>; // Reference to Category data list, its an Observable

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Fetch Category List
  GetCategoryList() {
    this.categoryRef = this.db.list('categories');
    return this.categoryRef;
  }
}
