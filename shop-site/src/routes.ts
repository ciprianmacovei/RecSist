import { Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ShopCategoryComponent } from './app/shop-category/shop-category.component';
import { RegisterComponent } from './app/register/register.component';
import { ItemDetailComponent } from './app/shop-category/shop-list/shop-item/item-detail/item-detail.component';
import { LoginCredentialPannelComponent } from './app/login-credential-pannel/login-credential-pannel.component';
import { ItemBasketComponent } from './app/shop-category/shop-list/item-basket/item-basket.component';
import { AutoMotoComponent } from './app/shop-category/chategory-items/auto-moto/auto-moto.component';
import { PcSoftComponent } from './app/shop-category/chategory-items/pc-soft/pc-soft.component';
import { ElectClimComponent } from './app/shop-category/chategory-items/elect-clim/elect-clim.component';
import { GamingComponent } from './app/shop-category/chategory-items/gaming/gaming.component';
import { LapTabTelComponent } from './app/shop-category/chategory-items/lap-tab-tel/lap-tab-tel.component';
import { SportComponent } from './app/shop-category/chategory-items/sport/sport.component';
import { TvMultimediaComponent } from './app/shop-category/chategory-items/tv-multimedia/tv-multimedia.component';
import { ContactComponent } from './app/contact/contact.component';
import { PricingComponent } from './app/pricing/pricing.component';
import { DelieveryComponent } from './app/delievery/delievery.component';
import { ForgotPasswordComponent } from './app/forgot-password/forgot-password.component';
import {CarouselComponent} from './app/carousel/carousel.component';

export const appRoutes: Routes = [
	{
		path: 'home', component: ShopCategoryComponent, children: [
      { path:'', component:CarouselComponent, pathMatch:'full'},
			{ path: 'video', component: PcSoftComponent },
			{ path: 'audio', component: ElectClimComponent },
			{ path: 'network', component: LapTabTelComponent },
			{ path: 'tv', component: TvMultimediaComponent }
		]
	},
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'delievery', component: DelieveryComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'pricing', component: PricingComponent },
	{ path: 'itemDetail/:id', component: ItemDetailComponent, canActivate: [AuthGuard] },
	{ path: 'loginCredencials', component: LoginCredentialPannelComponent, canActivate: [AuthGuard] },
	{ path: 'itemBasket', component: ItemBasketComponent, canActivate: [AuthGuard] },
	{ path: 'forgetpassword', component: ForgotPasswordComponent }
];



