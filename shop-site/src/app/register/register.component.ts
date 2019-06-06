import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Validators,FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidation } from '../../validators/passwordValidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

	public registerUsers:any = {};
  public myform:FormGroup;

  constructor(private authentificationService:AuthenticationService,private toastr:ToastrService,private nav:Router) {
    // this.authentificationService.logout();
   }



  ngOnInit() {


    this.myform = new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*'),

      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword:new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ])
    },{validators:PasswordValidation.MatchPassword})

  }

register() {
  // if (this.myform.valid){
  // this.authentificationService.register(this.registerUsers.Email,this.registerUsers.Password)
  //   .then(result => {
  //     console.log(result);
  //   });
  //   setInterval(() => {this.nav.navigate(['login'])}, 1000)
  //   this.toastr.success('User has beed registred', 'Registration Complete');
  // }
  // else this.toastr.error('Registration','Procedure Error');
  console.log(this.myform);
}



}
