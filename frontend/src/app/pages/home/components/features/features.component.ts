import { ChangeDetectorRef, Component } from '@angular/core';
import { CardComponent } from '../../../../components/card/card.component';
import { ContainerComponent } from '../../../../components/container/container.component';
import { NgForOf } from '@angular/common';
import { fadeInUp } from '../../../../shared/animations/animations';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [NgForOf, CardComponent, ContainerComponent, InViewDirective],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
  animations: [fadeInUp],
})
export class FeaturesComponent {
  inView = false;
  hasAnimated = false;

  cards = [
    {
      name: 'Fastest Delivery',
      description: 'Get your donuts delivered hot and fresh.',
      image: 'assets/images/fastest-delivery.svg',
    },
    {
      name: 'Best Quality',
      description: 'Experience the melt-in-your-mouth goodness of our donuts.',
      image: 'assets/images/best-quality.svg',
    },
    {
      name: 'Delicious Taste',
      description:
        'Satisfy your sweet cravings with our irresistibly delicious donuts.',
      image: 'assets/images/delicious-taste.svg',
    },
    {
      name: 'Best Ingredients',
      description:
        'Our donuts are made with the finest and freshest ingredients.',
      image: 'assets/images/best-ingredients.svg',
    },
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  onElementVisible(): void {
    if (!this.hasAnimated) {
      this.inView = true;
      this.hasAnimated = true;
      this.cdRef.detectChanges();
    }
  }
}
