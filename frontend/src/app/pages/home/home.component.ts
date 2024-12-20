import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { ValueAndProductComponent } from "./components/value-and-product/value-and-product.component";
import { HotDealsComponent } from "./components/hot-deals/hot-deals.component";
import { OfferComponent } from "./components/offer/offer.component";
import { SocialProofComponent } from "./components/social-proof/social-proof.component";
import { NewsletterComponent } from "./components/newsletter/newsletter.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContainerComponent, HeroComponent, FeaturesComponent, ValueAndProductComponent, HotDealsComponent, OfferComponent, SocialProofComponent, NewsletterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
