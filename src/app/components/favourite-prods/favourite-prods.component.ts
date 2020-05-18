import { FavouritesService } from './../../providers/favourites.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product';

@Component({
  selector: 'app-favourite-prods',
  templateUrl: './favourite-prods.component.html',
  styleUrls: ['./favourite-prods.component.css'],
})
export class FavouriteProdsComponent implements OnInit {
  favouriteProducts: Product[];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = 'No Favourite Products Found';
  messageDescription = 'Please, choose your favourite products';

  constructor(private favouriteService: FavouritesService) {}

  ngOnInit() {
    this.getFavouriteProduct();
  }
  removeFavourite(product: Product) {
    this.favouriteService.removeLocalFavourite(product);

    this.getFavouriteProduct();
  }

  getFavouriteProduct() {
    this.favouriteProducts = this.favouriteService.getLocalFavouriteProducts();
  }
}
