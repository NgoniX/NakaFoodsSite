import { AuthService } from './../../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { FavouritesService } from 'src/app/providers/favourites.service';
import { CartService } from 'src/app/providers/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public favouriteService: FavouritesService,
    public cartService: CartService
  ) {}

  isLoggedIn$: boolean;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
