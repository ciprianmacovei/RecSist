import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Component({
	selector:'app-header',
	templateUrl:'./header.component.html',
	styleUrls:['./header.component.css']
})

export class HeaderComponent{

	public loginBolean:Boolean;

	constructor(private auth:AuthenticationService){
		this.loginBolean = sessionStorage.length != 0 ? true:false;
	}
}
