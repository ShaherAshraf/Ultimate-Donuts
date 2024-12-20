import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CartWishlistService } from '../../../../shared/services/cart-wishlist.service';
import { Donut } from '../../../../shared/types/donut.model';
import { fadeInUp } from '../../../../shared/animations/animations';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [fadeInUp],
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() isCart?: boolean;
  @Input() isWishlist?: boolean;
  @Input() donuts: Donut[] = [];
  @Output() checkout = new EventEmitter();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Donut>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cartWishlistService: CartWishlistService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['donuts'] && changes['donuts'].currentValue) {
      this.dataSource.data = changes['donuts'].currentValue;
    }
  }

  ngAfterViewInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDisplayedColumns() {
    if (this.isWishlist)
      return ['image', 'name', 'price', 'purchase', 'remove'];
    return ['image', 'name', 'price', 'quantity', 'total', 'remove'];
  }

  calculateCartTotal() {
    return this.donuts.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  }

  async updateWishlist(donut: Donut) {
    await this.cartWishlistService.updateWishlist(donut);
  }

  async updateCart(donut: Donut) {
    await this.cartWishlistService.updateCart(donut);
  }

  async addAllToCart() {
    await this.cartWishlistService.addAllToCart();
  }

  async updateDonutQuantity(donut: Donut, flag: boolean) {
    await this.cartWishlistService.updateDonutQuantity(donut, flag);
  }

  proceedToCheckout() {
    this.checkout.emit();
  }
}
