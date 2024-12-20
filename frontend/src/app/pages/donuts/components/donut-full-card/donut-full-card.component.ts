import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CartWishlistService } from '../../../../shared/services/cart-wishlist.service';
import { Donut } from '../../../../shared/types/donut.model';

@Component({
  selector: 'app-donut-full-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './donut-full-card.component.html',
  styleUrl: './donut-full-card.component.scss',
})
export class DonutFullCardComponent implements OnInit {
  @Input() donut!: Donut;

  constructor(private cartWishlistService: CartWishlistService) {}

  ngOnInit(): void {
    this.updateCardState();
  }

  updateCardState() {
    this.cartWishlistService.data$.subscribe((value) => {
      const donut = value.donuts.find((d) => d.id == this.donut.id);
      this.donut.isAddedToWishlist = donut!?.isAddedToWishlist;
      this.donut.isAddedToCart = donut!?.isAddedToCart;
    });
  }

  async updateWishlist(donut: Donut) {
    await this.cartWishlistService.updateWishlist(donut);
  }

  async updateCart(donut: Donut) {
    await this.cartWishlistService.updateCart(donut);
  }
}
