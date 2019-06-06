import { Component, OnInit } from '@angular/core';
import { ForgotPassService } from '../services/forgot-pass.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private error:boolean = false;
  private username:string;
  private showUserPass:boolean = false;
  
  constructor(private pass:ForgotPassService) { }

  ngOnInit() {
  }

  showPassword(e){
    if (e.length === 0)
    {
      this.error = true;
    }
    console.log(typeof e);

    this.pass.getPass(e)
      .then( res => 
        {
          this.username = res[Object.keys(res)[0]][0].password;
          this.showUserPass = true;
          this.error = false;
        })
        .catch(error => {
          this.error = true;
          this.showUserPass = false;
        });

  }

}
