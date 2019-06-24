import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UrlTree ,DefaultUrlSerializer, UrlSerializer } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BootstrapModule } from './bootstrap.module';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';

//services
import { SearchBarService } from './services/search-bar.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { ItemsService } from './services/items.service';
import { ComunicationService } from './services/comunication.service';
import { PaginationService } from './services/pagination.service';
import { ChatbotService } from './services/chatbot.service';
import { RecommenderService } from './services/recommender.service';
import { TopItemsService } from './services/top-items.service';
import { ForgotPassService } from './services/forgot-pass.service';

//routes
import { appRoutes} from '../routes';
import { RouterModule } from '@angular/router';

//components
import { CommentBox } from './shop-category/shop-list/shop-item/comment-box/comment-box.component';
import { GamingComponent } from './shop-category/chategory-items/gaming/gaming.component';
import { ElectClimComponent } from './shop-category/chategory-items/elect-clim/elect-clim.component';
import { PcSoftComponent } from './shop-category/chategory-items/pc-soft/pc-soft.component';
import { AutoMotoComponent } from './shop-category/chategory-items/auto-moto/auto-moto.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopCategoryComponent } from './shop-category/shop-category.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemDetailComponent } from './shop-category/shop-list/shop-item/item-detail/item-detail.component';
import { LoginCredentialPannelComponent } from './login-credential-pannel/login-credential-pannel.component';
import { ItemBasketComponent } from './shop-category/shop-list/item-basket/item-basket.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ChategoryItemsComponent } from './shop-category/chategory-items/chategory-items.component';
import { LapTabTelComponent } from './shop-category/chategory-items/lap-tab-tel/lap-tab-tel.component';
import { SportComponent } from './shop-category/chategory-items/sport/sport.component';
import { TvMultimediaComponent } from './shop-category/chategory-items/tv-multimedia/tv-multimedia.component';
import { ShopPagerComponent } from './shop-category/shop-list/shop-pager/shop-pager.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { DelieveryComponent } from './delievery/delievery.component';
import { UserPannelComponent } from './user-pannel/user-pannel.component';
import { PermanentHeaderComponent } from './permanent-header/permanent-header.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ColorDirective} from './Directives/color.directive';
import {CarouselComponent} from './carousel/carousel.component';

@NgModule({
  declarations: [
    CarouselComponent,
    ColorDirective,
    AppComponent,
    HeaderComponent,
    ShopCategoryComponent,
    LoginComponent,
    RegisterComponent,
    ItemDetailComponent,
    LoginCredentialPannelComponent,
    ItemBasketComponent,
    SearchBarComponent,
    ChategoryItemsComponent,
    AutoMotoComponent,
    PcSoftComponent,
    ElectClimComponent,
    GamingComponent,
    LapTabTelComponent,
    SportComponent,
    TvMultimediaComponent,
    ShopPagerComponent,
    ContactComponent,
    PricingComponent,
    DelieveryComponent,
    CommentBox,
    UserPannelComponent,
    PermanentHeaderComponent,
    ForgotPasswordComponent
  ],
  imports:[
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    CommonModule,
    BootstrapModule
  ],
  providers: [
  RecommenderService,
  AuthGuard,
  AuthenticationService,
  ItemsService,
  ComunicationService,
  SearchBarService,
  PaginationService,
  BsModalService,
  ChatbotService,
  TopItemsService,
  ForgotPassService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
