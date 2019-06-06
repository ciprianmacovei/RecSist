import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Params } from '@angular/router';
import { ComunicationService } from '../services/comunication.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';



@Component({
  selector: 'app-login-credential-pannel',
  templateUrl: './login-credential-pannel.component.html',
  styleUrls: ['./login-credential-pannel.component.css']
})

export class LoginCredentialPannelComponent implements OnInit {

	public email:string;
	public password:string='';
  public userId:number;

  constructor(private comm:ComunicationService, private auth:AuthenticationService,private toast:ToastrService) {
    sessionStorage.getItem('currentUser') ? this.userId = JSON.parse(sessionStorage.getItem('currentUser')).reviewerID : this.userId = null
    sessionStorage.getItem('currentUser') ? this.email = JSON.parse(sessionStorage.getItem('currentUser')).user : this.email = null
    
    this.auth.showPassword(this.userId)
             .then(res => {
               this.password = res.data[0].password;
               })
  }

  ngOnInit() {
  	this.comm.getObject().subscribe((res) => {console.log(res);})
  }

  showPass(e){
   if ($('.passwordUser').attr('type') == "password") 
    $('.passwordUser').attr('type','text');
    else 
    $('.passwordUser').attr('type','password');

  }


  changePass(){
    this.auth.changePassword(this.userId,$('.passwordUser').val()).then( res => {
      console.log(res);
      if (res == true){
        this.toast.success('Change Password','Change password succesful');
      }
      else this.toast.error('Change Password','Change password was not possible');
    })
  }

}
