import {Component, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {Subscription} from "rxjs";
@Component({
	selector:'app-header',
	templateUrl:'./header.component.html',
	styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnDestroy{

  public subscription:Subscription;
	public loginBolean:Boolean;

	constructor(private auth:AuthenticationService){
		this.loginBolean = sessionStorage.length != 0 ? true:false;
		this.subscription = this.auth.logoutService.subscribe( (res:boolean) => {
		  this.loginBolean = !res;
    })
	}

	ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
